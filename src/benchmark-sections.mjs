export const library = 'https://github.com/Uxer-Janine/claim-source-benchmark-pilot';
const knowledgeBase = 'https://uxer-janine.github.io/claim-source-benchmark-pilot/';
const game = knowledgeBase + 'lab/game/';

export function benchmarkSections(externalLink) {
  return `
  <article class="contribution-card feature-card" id="benchmark" aria-labelledby="benchmark-title">
    <p class="eyebrow">Self-initiated work</p>
    <h3 id="benchmark-title">Claim–Source Verification Knowledge Base</h3>
    <div class="independent-intro">
      <p>I created a practical resource to help people check whether cited sources support a claim. It brings together verification guidelines, real examples, and an interactive exercise so learners can practice making and explaining evidence-based judgments.</p>
    </div>
    <div class="feature-copy independent-desk" id="evidence-desk" aria-labelledby="evidence-desk-title">
      <h4 id="evidence-desk-title">Evidence Desk — Interactive Verification Exercise</h4>
      <p>Read a claim, examine the evidence, and decide whether the source supports it.</p>
      <ul class="card-links"><li>${externalLink(game, 'Try Evidence Desk')}</li></ul>
      <figure class="visual feature-figure">
        <img src="assets/evidence-desk-a04.jpg" width="1168" height="598" loading="lazy" alt="Evidence Desk board showing source clues sorted by how well they support the claim.">
        <figcaption>The playable surrogacy investigation.</figcaption>
      </figure>
      <p>A04 is playable, and the other four cases are previews. Learner testing remains future work.</p>
    </div>
    <div class="independent-parts">
      <div class="feature-copy">
        <h5>Verification Knowledge Base</h5>
        <p>A simple guide to checking claims, documenting evidence, and understanding different judgments.</p>
        <ul class="card-links"><li>${externalLink(knowledgeBase, 'Open the Knowledge Base')}</li></ul>
      </div>
      <div class="feature-copy">
        <h5>GitHub Repository</h5>
        <p>Explore the original cases, documentation, and code behind the exercise.</p>
        <ul class="card-links"><li>${externalLink(library, 'View the GitHub Repository')}</li></ul>
      </div>
    </div>
    <p class="independent-status"><strong>Research status.</strong> All five original assessments are provisional and await independent review. All 14 example predictions remain unscored.</p>
  </article>`;
}
