<script>
  import { onMount } from 'svelte';
  
  let iframeLoaded = false;
  
  onMount(() => {
    // Add any initialization code here if needed
  });
</script>

<svelte:head>
  <title>If the Moon Were Only One Pixel</title>
  <meta name="description" content="Interactive 3D solar system visualization" />
</svelte:head>

<div class="container">
  <a href="/" class="back-link">←</a>
  
  <div class="iframe-wrapper">
    {#if !iframeLoaded}
      <div class="loading">
        <div class="spinner"></div>
      </div>
    {/if}
    <iframe 
      src="/solarsystem/index.html" 
      title="Interactive 3D Solar System"
      on:load={() => iframeLoaded = true}
    ></iframe>
  </div>
  
  <a href="https://github.com/valhizen/IfMoonWereOnlyOnePixel" target="_blank" rel="noopener noreferrer" class="github-link">GitHub</a>
</div>

<style>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    overflow: hidden;
  }
  
  .back-link {
    position: fixed;
    top: 1rem;
    left: 1rem;
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    opacity: 0.5;
    transition: opacity 0.2s;
    z-index: 100;
  }
  
  .back-link:hover {
    opacity: 1;
  }
  
  .iframe-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .iframe-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  
  .spinner {
    border: 3px solid rgba(255,255,255,0.1);
    border-top: 3px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .github-link {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    color: #fff;
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.2s;
    z-index: 100;
    font-size: 0.9rem;
  }
  
  .github-link:hover {
    opacity: 1;
  }
</style>
