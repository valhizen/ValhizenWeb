<div class="page">
  <h1 class="page-title">Hello I am Valhizen</h1>
  <h3 class="lead"> I am a University Student and Game Developer, this is an alias for 
    me and my journey. You can read about my journey, projects, and reason for this "valhizen" alias <a href="/blogs/at-the-foot-of-the-mountain">here</a>
  </h3>
  <h4> You can checkout my github here : <a href="https://github.com/valhizen">https://github.com/valhizen</a></h4>
  <h4> I will update this page with cool stuff that I do</h4>

  <div class="cta-row">
    <a class="cta" href="/blogs">Start reading</a>
    <a class="cta secondary" href="/projects">Explore projects</a>
  </div>
</div>

<style>
  .page { max-width: 720px; margin: 0 auto; }
  .page-title { text-align: center; margin: 0 0 0.25rem 0; font-size: 2rem; }
  .lead { text-align: center; color: var(--color-text-secondary); margin: 0.25rem 0 1.25rem; }
  .cta-row { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }
  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    color: var(--color-text);
    text-decoration: none;
    background: transparent;
    font-weight: 500;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .cta:hover { background: var(--color-primary-bg); border-color: var(--color-border-light); }
  .cta:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
  .cta.secondary { background: transparent; }
  .cta.secondary:hover { background: var(--color-primary-bg); }
  @media (max-width: 768px) {
    .page { padding: 0 0.75rem; }
    .page-title { font-size: 1.6rem; }
    .cta-row { margin-top: 0.75rem; }
  }
  
</style>
