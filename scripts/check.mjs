import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const html=await readFile(path.join(root,'dist/index.html'),'utf8');
const data=JSON.parse(await readFile(path.join(root,'content/portfolio.json'),'utf8'));
const impact=JSON.parse(await readFile(path.join(root,'content/community-impact.json'),'utf8'));
const totalViews=impact.notes.reduce((sum,note)=>sum+note.views,0);
const highestViews=Math.max(...impact.notes.map(note=>note.views));
assert(html.includes(`<dt>Recorded views</dt><dd>${totalViews}</dd>`),'Wrong community total');
assert(html.includes(`</dt><dd>${highestViews}</dd>`),'Wrong highest note count');
assert(html.includes(`Recorded as of ${impact.recordedDate}.`),'Missing statistics date');
for(const note of impact.notes){
  assert(html.includes(`class="community-view-count">${note.views} recorded views`),'Missing card count');
  assert(html.includes(`class="impact-bar-value">${note.views}<`),'Missing chart count');
  assert(html.includes(`${note.views} recorded views on ${impact.recordedDate}`),'Missing screenshot count or date');
}
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate IDs');
for(const m of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(m[1]),`Broken internal link #${m[1]}`);
for(const m of html.matchAll(/aria-(?:labelledby|controls)="([^"]+)"/g)) for(const id of m[1].split(' '))assert(ids.includes(id),`Unresolved ARIA reference ${id}`);
for(const m of html.matchAll(/(?:src|href)="((?:assets|content)\/[^"#]+|styles\.css|app\.js)"/g))assert((await stat(path.join(root,'dist',m[1]))).isFile(),`Missing asset ${m[1]}`);
for(const m of html.matchAll(/<img\b[^>]*>/g)) {assert(/alt="[^"]+"/.test(m[0]),`Image without descriptive alternative: ${m[0]}`);assert(/width=/.test(m[0])&&/height=/.test(m[0]),'Image needs dimensions');}
for(const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert(m[0].includes('rel="noopener noreferrer"'),'Unsafe external link');
assert.equal([...html.matchAll(/<h1\b/g)].length,1,'Use one page heading');
assert(html.includes('href="#main"'),'Missing skip link');
assert.equal([...html.matchAll(/class="contribution-card(?: feature-card)?"/g)].length,6,'Expected six contribution cards');
assert(!/<details\b|<summary\b/.test(html),'Contribution information must be visible without dropdowns');
assert(!/Contribution Timeline|Resources &amp; Supporting Links|Source access and review notes|Read more|Overview:|My Work:|Outcome:/.test(html),'Removed report-style content remains');
assert(html.includes('a collection of Wikipedia claims, their sources, and human assessments'),'Missing human-review project scope');
assert(html.includes('proposed designs'),'UX proposal must not imply implementation');
assert(html.includes('Merged · PR #7204') && html.includes('reviewed and merged PR #7204'),'Missing merged PR status');
assert(!/open, ready for review and unmerged|action_required/.test(html),'Outdated current PR status');
assert(html.includes('AI Assistance & Attribution'),'Missing attribution');
const externalUrls=[...html.matchAll(/href="(https:[^"]+)"/g)].map(m=>m[1]);
assert.equal(externalUrls.length,new Set(externalUrls).size,'Duplicated external URL');
const contributionOrder=['verification','design','research','engineering','community','benchmark'];
assert.deepEqual(ids.filter(id=>contributionOrder.includes(id)),contributionOrder,'Contribution priorities changed');
const hero=html.split('class="hero wrap"')[1].split('</section>')[0];
assert.match(hero,/href="#contributions">Explore my contributions/);
assert(!hero.includes('href="https:'),'Hero should lead to official contributions');
for(const text of ['All five original assessments are provisional','All 14 example predictions remain unscored','A04 is playable, and the other four cases are previews']){
  assert(html.includes(text),`Missing research context: ${text}`);
}
for(const id of ['microtask','human-report','aggregate-task','research-report','ux-task','case-study','figma','walkthrough-report','style-task','pr','engineering-report','comments-task','comments-report','community-intro','community-links','community-meetings','community-local'])assert(html.includes(data.sources.find(s=>s.id===id).url),'Missing primary contribution evidence '+id);
assert(!/April 2026|Fedora|Docling|previous Outreachy|previous portfolio|OCR/i.test(html),'Unrelated previous work remains');
assert(!/https?:\/\/[^"\s<>]*(?:pwd=|jwt=|token=)/i.test(html),'Potential private URL credential');
for(const s of data.sources)assert(new URL(s.url).protocol==='https:',`Invalid source URL ${s.id}`);
const sourceIds=new Set(data.sources.map(s=>s.id));
for(const c of data.contributions){assert(c.status&&c.limitation&&c.ai,`Missing accuracy fields ${c.id}`);for(const id of c.sources)assert(sourceIds.has(id),`Missing source ${id}`);}
for(const s of data.screens)assert((await stat(path.join(root,'dist',s.src))).isFile(),`Missing screen ${s.src}`);
async function files(dir){let result=[];for(const e of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);result.push(...e.isDirectory()?await files(f):[f]);}return result;}
let total=0;for(const f of await files(path.join(root,'dist')))total+=(await stat(f)).size;
assert(total<10_000_000,'Static payload is unexpectedly large');
console.log(`PASS: ${ids.length} unique anchors; internal navigation, ARIA references, assets, image alternatives, external-link safety, source references and disclosure checks. Static output ${(total/1024/1024).toFixed(2)} MiB.`);
