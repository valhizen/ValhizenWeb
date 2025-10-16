<script lang="ts">
  export const metadata = {
    title: 'Setting Up Vulkan With GLFW',
    description: 'Starting publicly with accountability as valhizen',
    date: '2025-10-12',
    tags: ['Process', 'Devlog'],
  };
</script>

<style>
  pre {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 16px;
    overflow-x: auto;
    margin: 16px 0;
  }
  
  code {
    font-family: 'Courier New', Consolas, monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  p code {
    background: #2a2a2a;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 13px;
  }
</style>

<p>
  While writing for my Game, and while making the Perlin Noise and the Mesh (which is in my homepage), I thought maybe
  I can make something from which I myself can render and create the mountain mesh and other 
  as needed and not have to use Blender or other game engine. On my search I found OpenGL and Vulkan to draw it. 
  Draw triangles because everything you see in screens are triangles. And I decided let's try vulkan because it
  allows greater control and I started setting it up.
</p>

<p>
  My OS is NixOS so this is catered towards it but this can be implemented in other OS too, and maybe checkout the
  official documentation at <a href="https://vulkan-tutorial.com/Development_environment" target="_blank" rel="noopener noreferrer">https://vulkan-tutorial.com/Development_environment</a>. This can help out. 
  And for my NixOS config, I have a shell.nix as :
</p>

<pre><code class="language-nix">{`{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    gnumake
    glfw3
    vulkan-tools
    vulkan-headers
    vulkan-validation-layers
    clang
    bear
    pkg-config
    vulkan-loader
    cmake
    glm
  ];
}`}</code></pre>

<p>
  You will need to setup Nvidia GPU and you can also use <code>nvidia-offload vkcube</code> to check if Vulkan works, 
  It should generate a cube for you. 
  And you can start coding and using it. 
  Maybe this CMakeLists.txt will also help out.
</p>

<pre><code class="language-cmake">{`cmake_minimum_required(VERSION 3.20)
project(VulkanGame)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
find_package(glfw3 REQUIRED)
find_package(Vulkan REQUIRED)

add_executable(main src/main.cpp)
target_include_directories(main PRIVATE
    \${Vulkan_INCLUDE_DIRS}
    \${GLFW_INCLUDE_DIRS}
)
target_link_libraries(main glfw Vulkan::Vulkan)`}</code></pre>


<p>
  Maybe this will help you out somehow. This is for Nvidia GPU beacuse that is what 
  is in my computer but should help out for others too
</p>

<p>
  Leave me a mail or a DM if you find this helpful and maybe can help improve it so other who stumble upon
  here can take something knowledgeable from it
</p>