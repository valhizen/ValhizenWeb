<script lang="ts">
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let container: HTMLDivElement;

  if (browser) {
    onMount(() => {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xbfe3dd);
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
      camera.position.set(0, 30, 80);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(0, 20, 0);
      controls.update();

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
      hemiLight.position.set(0, 200, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2);
      dirLight.position.set(50, 100, 50);
      scene.add(dirLight);

      const loader = new GLTFLoader();
      loader.load(
        "/Untitled1.glb",
        (gltf) => {
          const model = gltf.scene;
          scene.add(model);

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

          renderer.setAnimationLoop(() => {
            controls.update();
            renderer.render(scene, camera);
          });
        },
        undefined,
        (err) => console.error("GLB load error:", err)
      );

      const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
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
    </div>

    <div class="model-section">
      <div bind:this={container} class="three-container"></div>
    </div>
  </div>
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
    width: 100%;
    max-width: 550px;
    height: 350px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
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