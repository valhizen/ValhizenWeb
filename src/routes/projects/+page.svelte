<div class="page">
  <h1 class="page-title">Projects</h1>

  <p>
    This is where my climbing journey takes shape. Each project is a step up the mountain —
    from graphics engines to AI systems.
  </p>

  <h2>Featured Projects</h2>

  <!-- If the Moon Were Only One Pixel -->
  <div class="project-card">
    <h3><a href="https://github.com/valhizen/IfMoonWereOnlyOnePixel" target="_blank" rel="noopener noreferrer">If the Moon Were Only One Pixel</a></h3>
    <p>
      A 3D interactive solar system built in C++ and OpenGL where
      1 pixel equals the Moon’s diameter (3476 km), demonstrating
      the true scale and emptiness of space.
    </p>
    <ul>
      <li>True astronomical scale rendering</li>
      <li>FPS-style free camera with light-speed mode</li>
      <li>HUD interface using Dear ImGui</li>
      <li>60+ FPS smooth rendering</li>
    </ul>
    <p><strong>Stack:</strong> C++, OpenGL, GLAD, GLM, Dear ImGui</p>
  </div>

  <!-- Damocles AI -->
  <div class="project-card">
    <h3><a href="https://github.com/valhizen/DamoclesAI" target="_blank" rel="noopener noreferrer">Damocles AI</a></h3>
    <p>
      A GPT-style Transformer language model implemented entirely
      from scratch in C++ with no external ML frameworks.
    </p>
    <ul>
      <li>Custom tensor engine with OpenMP and optional CUDA acceleration</li>
      <li>Full backpropagation implementation</li>
      <li>AdamW optimizer with cosine decay</li>
      <li>Temperature, top-k, and top-p text generation</li>
    </ul>
    <p><strong>Stack:</strong> C++, OpenMP, CUDA/cuBLAS</p>
  </div>

  <!-- AR Treasure Hunt -->
  <div class="project-card">
    <h3><a href="https://github.com/valhizen/ar-treasure-hunt" target="_blank" rel="noopener noreferrer">AR Treasure Hunt 2026</a></h3>
    <p>
      Lead developer for a custom 2D game built in Godot for a
      treasure hunt qualifying event.
    </p>
    <ul>
      <li>Designed core game mechanics and puzzles</li>
      <li>Led cross-team development</li>
      <li>Built timed challenge system for participant filtering</li>
    </ul>
    <p><strong>Stack:</strong> Godot Engine, GDScript</p>
  </div>

  <div>
    You can check out more of my code on my GitHub from the navigation bar.
  </div>

  <h2>More to Come</h2>
  <p>
    More systems, simulations, and experiments are on the way.
    Each project builds toward mastering graphics, AI, and large-scale systems.
  </p>

  <p><a href="/blogs">Read about the journey →</a></p>
</div>

<style>
  .page { 
    max-width: 720px; 
    margin: 0 auto; 
  }

  .page-title { 
    text-align: center; 
    margin-top: 0; 
  }

  .project-card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    max-width: 600px;
  }

  .project-card h3 {
    margin-top: 0;
    color: var(--color-primary);
    font-size: 1.4rem;
  }

  .project-card ul {
    padding-left: 1.2rem;
  }

  .project-card a {
    text-decoration: none;
    color: var(--color-primary);
  }

  .project-card a:hover {
    text-decoration: underline;
  }
</style>