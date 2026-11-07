export const library = 'https://github.com/Uxer-Janine/claim-source-benchmark-pilot';
const game = 'https://uxer-janine.github.io/claim-source-benchmark-pilot/lab/game/';
const docs = `${library}/blob/main/docs`;

export function benchmarkSections(externalLink) {
  return `
  <article class="contribution-card feature-card" id="benchmark" aria-labelledby="benchmark-title">
    <p class="eyebrow">Self-initiated work</p>
    <h3 id="benchmark-title">Independent Project</h3>
    <div class="independent-parts">
      <div class="feature-copy">
        <h4>Wikipedia Claim–Source Verification Library</h4>
        <p>One sentence can contain several details that need checking separately. I started a five-case pilot to record the claim, its source, and my reasoning so another person could follow the evidence and review my assessment.</p>
        <p>All five original assessments are provisional and await independent review. All 14 example predictions remain unscored. The pilot does not establish model performance.</p>
        <ul class="card-links">
          <li>${externalLink(library, 'Browse the repository')}</li>
          <li>${externalLink(`${docs}/RESEARCH_NOTES.md`, 'Read the Research Notes')}</li>
          <li>${externalLink(`${docs}/BLIND_REVIEW_KIT.md`, 'Open the Blind Review Kit')}</li>
        </ul>
        <figure class="visual feature-figure">
          <img src="assets/a04-compound-claim.svg" width="640" height="537" loading="lazy" alt="A04 breaks into three checks: attribution is partially supported, the revenue estimate is supported, and the clinic count is not supported. The overall assessment awaits independent review.">
          <figcaption>One citation can support some details of a claim and leave others unresolved.</figcaption>
        </figure>
      </div>
      <div class="feature-copy" id="evidence-desk" aria-labelledby="evidence-desk-title">
        <h4 id="evidence-desk-title">Evidence Desk</h4>
        <p>I wanted beginners to learn by trying it themselves. In Evidence Desk, you investigate a Wikipedia claim and check its source. A source might support a financial estimate while leaving other details unanswered. You sort the evidence and explain your reasoning before comparing it with my recorded assessment.</p>
        <p>A04 is playable, and the other four cases are previews. Learner testing remains future work.</p>
        <ul class="card-links">
          <li>${externalLink(game, 'Play Evidence Desk')}</li>
          <li>${externalLink(`${library}/tree/main/lab/game`, 'View the game source')}</li>
        </ul>
        <figure class="visual feature-figure">
          <img src="assets/evidence-desk-a04.jpg" width="1168" height="598" loading="lazy" alt="Live A04 Evidence Desk board with opened source files and cards sorted under Supported, Narrower support, and Needs more evidence.">
          <figcaption>The live A04 investigation with evidence cards sorted by what the source supports.</figcaption>
        </figure>
      </div>
    </div>
  </article>`;
}
