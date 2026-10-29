import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const html=await readFile(path.join(root,'dist/index.html'),'utf8');
const data=JSON.parse(await readFile(path.join(root,'content/portfolio.json'),'utf8'));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'Duplicate IDs');
for(const m of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(m[1]),`Broken internal link #${m[1]}`);
for(const m of html.matchAll(/aria-(?:labelledby|controls)="([^"]+)"/g)) for(const id of m[1].split(' '))assert(ids.includes(id),`Unresolved ARIA reference ${id}`);
for(const m of html.matchAll(/(?:src|href)="((?:assets|content)\/[^"#]+|styles\.css|app\.js)"/g))assert((await stat(path.join(root,'dist',m[1]))).isFile(),`Missing asset ${m[1]}`);
for(const m of html.matchAll(/<img\b[^>]*>/g)) {assert(/alt="[^"]+"/.test(m[0]),`Image without descriptive alternative: ${m[0]}`);assert(/width=/.test(m[0])&&/height=/.test(m[0]),'Image needs dimensions');}
for(const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert(m[0].includes('rel="noopener noreferrer"'),'Unsafe external link');
assert.equal([...html.matchAll(/<h1\b/g)].length,1,'Use one page heading');
assert(html.includes('href="#main"'),'Missing skip link');
assert.equal([...html.matchAll(/class="contribution-card"/g)].length,5,'Expected five contribution cards');
assert(!/<details\b|<summary\b/.test(html),'Contribution information must be visible without dropdowns');
assert(!/Contribution Timeline|Resources &amp; Supporting Links|Source access and review notes|Read more|Overview:|My Work:|Outcome:/.test(html),'Removed report-style content remains');
assert(html.includes('aims to build a collection of human-reviewed'),'Missing human-review project scope');
assert(html.includes('proposed designs'),'UX proposal must not imply implementation');
assert(html.includes('open, ready for review and unmerged'),'Missing verified PR status');
assert(html.includes('AI Assistance & Attribution'),'Missing attribution');
const externalUrls=[...html.matchAll(/href="(https:[^"]+)"/g)].map(m=>m[1]);
assert.equal(externalUrls.length,new Set(externalUrls).size,'Duplicated external URL');
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
