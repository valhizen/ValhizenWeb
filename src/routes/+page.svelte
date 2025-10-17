<script lang="ts">
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let container: HTMLDivElement;
  let isLoading = true;
  let loadError = false;

  function setupThreeJS(width: number, height: number) {
    // Create renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    
    // Set up environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.set(0, 30, 80);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 20, 0);
    controls.update();

    // Optimized lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(50, 100, 50);
    dirLight.castShadow = false;
    scene.add(dirLight);

    // Set up Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    dracoLoader.preload();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    
    // Start render loop BEFORE loading the model
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Load model with progress tracking
    loader.load(
      "/model-final.glb",
      (gltf) => {
        const model = gltf.scene;
        
        // Optimize materials
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.frustumCulled = true;
            if (child.material) {
              child.material.needsUpdate = true;
            }
          }
        });

        // Add model to scene
        scene.add(model);

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);

        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = maxDim / (2 * Math.tan(fov / 2));
        camera.position.set(0, size.y * 0.4, cameraZ * 1.5);
        controls.target.set(0, size.y * 0.3, 0);
        controls.update();

        // Force immediate render
        renderer.render(scene, camera);

        isLoading = false;
      },
      (progress) => {
        const percentComplete = (progress.loaded / progress.total) * 100;
        console.log(`Loading: ${percentComplete.toFixed(2)}%`);
      },
      (err) => {
        console.error("GLB load error:", err);
        loadError = true;
        isLoading = false;
      }
    );

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      
      renderer.dispose();
      dracoLoader.dispose();
      pmremGenerator.dispose();
      controls.dispose();
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });
    };
  }

  if (browser) {
    onMount(() => {
      let initialized = false;
      let cleanup: (() => void) | null = null;

      const observer = new ResizeObserver(() => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        console.log(`Container size: ${width}x${height}`);

        if (width > 50 && height > 50) {
          if (!initialized) {
            console.log("Initializing Three.js");
            cleanup = setupThreeJS(width, height);
            initialized = true;
          }
        }
      });

      observer.observe(container);

      return () => {
        observer.disconnect();
        if (cleanup) cleanup();
      };
    });
  }
</script>

<div class="page">
  <div class="hero-grid">
    <div class="intro-section">
      <h1 class="page-title">Hello I am Valhizen</h1>
      <p class="lead">
        I am a University Student and Game Developer, this is an alias for 
        me and my journey.
      </p>
      <p class="blog-link">
        Read about <a href="/blogs/at-the-foot-of-the-mountain">my journey at the foot of the mountain</a>
      </p>
      <p>
        If you somehow stumbled here, play around with the mountain. I generated 
        this mountain with Perlin noise, sculpted the mesh in 
        Blender, and brought it to web with Three.js.
      </p>
    </div>

    <div class="model-section">
      <div bind:this={container} class="three-container">
        {#if isLoading}
          <div class="loading-overlay">
            <div class="spinner"></div>
            <p>Loading 3D Model...</p>
          </div>
        {/if}
        {#if loadError}
          <div class="error-overlay">
            <p>Failed to load 3D model</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <p>
    Also the github for the website is: 
    <a href="https://github.com/valhizen/ValhizenWeb">Valhizen Web</a>
  </p>
  <p>
    And the github for Perlin Noise is:
    <a href="https://github.com/valhizen/PerlinNoise">Perlin Noise</a>
  </p>
</div>

<style>
  .page { 
    max-width: 1100px; 
    margin: 0 auto; 
    padding: 2.5rem 1.5rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 2.5rem;
    align-items: center;
  }

  .intro-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .page-title { 
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  .lead { 
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--color-text-secondary, #9ca3af);
  }

  .blog-link {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #9ca3af);
  }

  .blog-link a {
    color: var(--color-primary, #60a5fa);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }

  .blog-link a:hover {
    border-bottom-color: var(--color-primary, #60a5fa);
  }

  .model-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .three-container {
    position: relative;
    width: 100%;
    min-width: 300px;
    max-width: 550px;
    height: 350px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    background: #bfe3dd;
    flex-shrink: 0;
  }

  .loading-overlay,
  .error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(191, 227, 221, 0.9);
    z-index: 10;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-overlay p,
  .error-overlay p {
    margin: 0;
    color: #333;
    font-size: 0.9rem;
  }
  
  @media (max-width: 968px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .intro-section {
      max-width: 500px;
      margin: 0 auto;
    }

    .three-container {
      max-width: 100%;
      height: 320px;
    }
  }

  @media (max-width: 640px) {
    .page { 
      padding: 1.5rem 1rem; 
    }
    
    .page-title { 
      font-size: 1.75rem; 
    }

    .lead {
      font-size: 1rem;
    }
    
    .three-container {
      height: 280px;
    }
  }
</style>