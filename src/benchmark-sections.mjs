export const library = 'https://github.com/Uxer-Janine/claim-source-benchmark-pilot';
const knowledgeBase = 'https://uxer-janine.github.io/claim-source-benchmark-pilot/';
const game = knowledgeBase + 'lab/game/';

export function benchmarkSections(externalLink) {
  return `
  <article class="contribution-card feature-card" id="benchmark" aria-labelledby="benchmark-title">
    <p class="eyebrow">Self-initiated work</p>
    <h3 id="benchmark-title">Claim–Source Verification Projects</h3>
    <div class="independent-intro">
      <p>I built an interactive exercise and a practical reference to help learners check cited evidence and explain their judgments.</p>
    </div>
    <div class="feature-copy independent-desk" id="evidence-desk" aria-labelledby="evidence-desk-title">
      <h4 id="evidence-desk-title">Evidence Desk — Claim Verification Lab</h4>
      <p>Read a claim, examine the evidence, and decide whether the source supports it.</p>
      <ul class="card-links"><li>${externalLink(game, 'Try Evidence Desk')}</li></ul>
      <figure class="visual feature-figure">
        <img src="assets/evidence-desk-a04.jpg" width="1168" height="598" loading="lazy" alt="Evidence Desk board showing source clues sorted by how well they support the claim.">
        <figcaption>The playable surrogacy investigation.</figcaption>
      </figure>
      <p>A04 is playable, and the other four cases are previews. Learner testing remains future work.</p>
    </div>
    <div class="independent-parts">
      <section class="feature-copy independent-project" aria-labelledby="repository-title">
        <span class="eyebrow">Technical implementation</span>
        <h4 id="repository-title">GitHub Repository</h4>
        <p>Explore the code behind the claim-verification exercise, the original case records, and the tools that check those records.</p>
        <ul class="card-links"><li>${externalLink(library, 'View the GitHub Repository')}</li></ul>
      </section>
      <section class="feature-copy independent-project" aria-labelledby="knowledge-base-title">
        <span class="eyebrow">Research and knowledge sharing</span>
        <h4 id="knowledge-base-title">Verification Knowledge Base</h4>
        <p>Use practical guidelines and case studies to trace judgments to source passages. Explore the contributor research synthesis and resources for documenting and reviewing assessments.</p>
        <ul class="card-links"><li>${externalLink(knowledgeBase, 'Open the Knowledge Base')}</li></ul>
      </section>
    </div>
    <p class="independent-status"><strong>Research status.</strong> All five original assessments are provisional and await independent review. All 14 example predictions remain unscored.</p>
  </article>`;
}
