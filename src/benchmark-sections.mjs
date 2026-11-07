export const library = 'https://github.com/Uxer-Janine/claim-source-benchmark-pilot';
const game = 'https://uxer-janine.github.io/claim-source-benchmark-pilot/lab/game/';
const docs = `${library}/blob/main/docs`;

export function benchmarkSections(externalLink) {
  return `
  <article class="contribution-card feature-card" id="benchmark" aria-labelledby="benchmark-title">
    <p class="eyebrow">Self-initiated work</p>
    <h3 id="benchmark-title">Independent Project</h3>
    <div class="independent-intro">
      <h4>Wikipedia Claim–Source Verification Library</h4>
      <p>A Wikipedia citation can support one detail and leave another unanswered. During the Outreachy exercise, I found that explaining my judgment mattered as much as reaching it. I started this separate five-case pilot so someone else could follow the evidence and review my reasoning.</p>
    </div>
    <div class="independent-parts">
      <div class="feature-copy">
        <h5>Research Library</h5>
        <p>Each record brings a claim, its cited source, passage locations, and my assessment together. It gives future reviewers a clear starting point for checking a decision.</p>
        <ul class="card-links">
          <li>${externalLink(library, 'Explore the research library')}</li>
          <li>${externalLink(`${library}#readme`, 'Read the project README')}</li>
          <li>${externalLink(`${docs}/RESEARCH_NOTES.md`, 'Research Notes')}</li>
          <li>${externalLink(`${docs}/BLIND_REVIEW_KIT.md`, 'Blind Review Kit')}</li>
        </ul>
        <figure class="visual feature-figure">
          <img src="assets/a04-compound-claim.svg" width="640" height="537" loading="lazy" alt="A04 breaks into three checks: attribution is partially supported, the revenue estimate is supported, and the clinic count is not supported. The overall assessment awaits independent review.">
          <figcaption>One citation, three details to check.</figcaption>
        </figure>
      </div>
      <div class="feature-copy" id="evidence-desk" aria-labelledby="evidence-desk-title">
        <h5 id="evidence-desk-title">Evidence Desk</h5>
        <p>I designed a companion activity where learners examine evidence, sort claim details, and explain their judgment before comparing it with my recorded assessment.</p>
        <p>A04 is playable, and the other four cases are previews. Learner testing remains future work.</p>
        <ul class="card-links">
          <li>${externalLink(game, 'Try Evidence Desk')}</li>
          <li>${externalLink(`${library}/tree/main/lab/game`, 'View the game source')}</li>
        </ul>
        <figure class="visual feature-figure">
          <img src="assets/evidence-desk-a04.jpg" width="1168" height="598" loading="lazy" alt="Live A04 Evidence Desk board with opened source files and cards sorted under Supported, Narrower support, and Needs more evidence.">
          <figcaption>The live surrogacy investigation.</figcaption>
        </figure>
      </div>
    </div>
    <div class="independent-audiences">
      <h4>Who could benefit?</h4>
      <p>Potential uses, with adoption and impact still unmeasured.</p>
      <dl>
        <div><dt>Students and educators</dt><dd>Practice and teach evidence evaluation.</dd></div>
        <div><dt>Wikipedia contributors</dt><dd>Check whether citations support article statements.</dd></div>
        <div><dt>Researchers</dt><dd>Examine judgments and review disagreements.</dd></div>
        <div><dt>AI developers</dt><dd>Explore future evaluation using independently reviewed cases.</dd></div>
      </dl>
    </div>
    <p class="independent-takeaway"><strong>What I learned.</strong> A single verdict can hide important details. Recording the evidence and reasoning makes those differences easier to examine.</p>
    <p class="independent-status"><strong>Current status.</strong> An exploratory five-case pilot. All five original assessments are provisional and await independent review. All 14 example predictions remain unscored. Model performance and learner outcomes have not been measured.</p>
  </article>`;
}
