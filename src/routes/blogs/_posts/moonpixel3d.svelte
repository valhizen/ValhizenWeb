<script lang="ts">
  export const metadata = {
    title: 'MoonPixel3D - 3D Solar System in OpenGL',
    description: 'Built a 3D solar system visualization where 1 pixel = Moon diameter',
    date: '2025-10-30',
    tags: ['Devlog', 'OpenGL', 'C++'],
  };
</script>

<p>
I wrote about abandoning projects two weeks ago. This time I didn't abandon it.
</p>

<p>
I built <strong>MoonPixel3D</strong>. It's a 3D visualization of the solar system where 1 pixel = Moon's diameter (3,474.8 km). 
I saw Josh Worth's "If the Moon Were Only 1 Pixel" and thought what if I can move around in 3D and 
actually navigate through space. So I made it.
</p>

<img src="/demo2.png" alt="MoonPixel3D Screenshot" style="width: 100%; border-radius: 8px; margin: 1rem 0;" />

<p>
At this scale Earth is 43,051 pixels from the Sun. Neptune is 1,293,488 pixels away. 
Even at light speed it takes 8 minutes to reach Earth and over 4 hours to reach Neptune. 
Space is really big and empty.
</p>

<p>
Built with C++20 and OpenGL 3.3+. Made procedural starfield in GLSL shaders so I don't have to load textures. 
You can travel at different speeds including light speed (86.26 pixels/s). Runs at 60+ FPS. 
Used ImGui for the UI and planet information.
</p>

<p>
Version 1.0 is done. It works. It has bugs and things I would change but it's finished.
</p>

<p>
GitHub: <a href="https://github.com/valhizen/ifthemoonwereonlyonepixel" target="_blank" rel="noopener noreferrer">github.com/valhizen/ifthemoonwereonlyonepixel</a>
</p>

<video controls style="width: 100%; border-radius: 8px; margin: 1rem 0;">
  <source src="/untitled.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<h2>Some technical things</h2>

<p>
Light speed calculation: 299,792.458 km/s ÷ 3,474.8 km/pixel = 86.26 pixels/second. 
This makes traveling feel real because even at light speed everything is slow.
</p>

<p>
Stars are generated in fragment shader using hash functions. No texture loading. Just math.
</p>

<hr>

<p>
First project I actually finished. Maybe I can finish more things now.
</p>
