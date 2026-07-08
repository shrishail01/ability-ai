import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;
    camera.position.y = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Post-processing — subtle bloom/glow
    const composer = new EffectComposer(renderer);
    composer.setSize(width, height);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.3, // strength — subtle, editorial
      0.5, // radius — tight around bright elements
      0.1  // threshold — glow on moderately bright pixels
    );
    composer.addPass(bloomPass);

    // OutputPass handles color-space conversion in newer Three.js
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // Colors matching editorial theme
    const colors = {
      gold: new THREE.Color("#B8860B"),
      goldLight: new THREE.Color("#D4A843"),
      navy: new THREE.Color("#0F1B2D"),
      cream: new THREE.Color("#FAF6F1"),
    };

    // Disposables array for cleanup
    const disposables: (() => void)[] = [];

    // ---- ANIMATED GRADIENT MESH (back-most layer) ----
    const meshWidth = 20;
    const meshHeight = 16;
    const meshSegX = 64;
    const meshSegY = 52;

    const meshGeo = new THREE.PlaneGeometry(meshWidth, meshHeight, meshSegX, meshSegY);
    const meshPos = meshGeo.attributes.position as THREE.BufferAttribute;
    const originalPositions = new Float32Array(meshPos.array);

    // Vertex colors for gradient
    const vertexCount = meshPos.count;
    const vertColors = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i++) {
      const x = meshPos.getX(i);
      const y = meshPos.getY(i);
      // Radial gradient from center: gold-ish center, fading to navy/transparent
      const dist = Math.sqrt(x * x + y * y) / 10;
      const r = 0.1 + 0.08 * Math.max(0, 1 - dist);
      const g = 0.06 + 0.05 * Math.max(0, 1 - dist);
      const b = 0.04 + 0.02 * Math.max(0, 1 - dist);
      vertColors[i * 3] = r;
      vertColors[i * 3 + 1] = g;
      vertColors[i * 3 + 2] = b;
    }
    meshGeo.setAttribute("color", new THREE.BufferAttribute(vertColors, 3));

    const meshMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      wireframe: false,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const gradientMesh = new THREE.Mesh(meshGeo, meshMat);
    gradientMesh.position.set(0, 0, -8);
    scene.add(gradientMesh);

    // ---- PARTICLE FIELD ----
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleOpacities = new Float32Array(particleCount);
    const particleSpeeds: { x: number; y: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a wide volume
      particlePos[i * 3] = (Math.random() - 0.5) * 22;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4; // z-range behind shapes
      particleSizes[i] = Math.random() * 3 + 1;
      particleOpacities[i] = Math.random() * 0.5 + 0.1;
      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));
    particleGeo.setAttribute("opacity", new THREE.BufferAttribute(particleOpacities, 1));

    // Custom sprite texture - small glowing circle
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(212,168,67,0.8)");
    gradient.addColorStop(0.7, "rgba(184,134,11,0.3)");
    gradient.addColorStop(1, "rgba(184,134,11,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Store original particle positions for reset
    const origParticlePos = new Float32Array(particlePos);

    // ---- GEOMETRIC SHAPES ----
    const shapes: {
      mesh: THREE.Mesh;
      baseY: number;
      baseX: number;
      rotSpeed: number;
      floatSpeed: number;
      floatAmplitude: number;
    }[] = [];

    // 1. Large Torus Knot (center hero)
    const torusGeo = new THREE.TorusKnotGeometry(1.6, 0.5, 128, 16);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: colors.gold,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.35,
      wireframe: false,
      clearcoat: 0.2,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-0.5, 0.5, -2);
    scene.add(torus);
    shapes.push({ mesh: torus, baseX: -0.5, baseY: 0.5, rotSpeed: 0.15, floatSpeed: 0.5, floatAmplitude: 0.4 });

    // 2. Icosahedron (top right)
    const icoGeo = new THREE.IcosahedronGeometry(1, 0);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: colors.goldLight,
      metalness: 0.2,
      roughness: 0.4,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3.5, 2, -1);
    scene.add(ico);
    shapes.push({ mesh: ico, baseX: 3.5, baseY: 2, rotSpeed: 0.1, floatSpeed: 0.7, floatAmplitude: 0.5 });

    // 3. Octahedron (top left)
    const octGeo = new THREE.OctahedronGeometry(0.9);
    const octMat = new THREE.MeshPhysicalMaterial({
      color: colors.navy,
      metalness: 0.1,
      roughness: 0.6,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(-3, 2.5, -1.5);
    scene.add(oct);
    shapes.push({ mesh: oct, baseX: -3, baseY: 2.5, rotSpeed: 0.12, floatSpeed: 0.6, floatAmplitude: 0.35 });

    // 4. Small Torus (bottom right)
    const ringGeo = new THREE.TorusGeometry(1.2, 0.25, 32, 32);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: colors.gold,
      metalness: 0.3,
      roughness: 0.3,
      transparent: true,
      opacity: 0.15,
      wireframe: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(3, -1.5, -3);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);
    shapes.push({ mesh: ring, baseX: 3, baseY: -1.5, rotSpeed: 0.2, floatSpeed: 0.4, floatAmplitude: 0.3 });

    // 5. Small Icosahedron (bottom left)
    const icoSmallGeo = new THREE.IcosahedronGeometry(0.6);
    const icoSmallMat = new THREE.MeshPhysicalMaterial({
      color: colors.goldLight,
      metalness: 0.15,
      roughness: 0.5,
      transparent: true,
      opacity: 0.25,
      wireframe: false,
    });
    const icoSmall = new THREE.Mesh(icoSmallGeo, icoSmallMat);
    icoSmall.position.set(-3.5, -1, -2.5);
    scene.add(icoSmall);
    shapes.push({ mesh: icoSmall, baseX: -3.5, baseY: -1, rotSpeed: 0.18, floatSpeed: 0.55, floatAmplitude: 0.4 });

    // 6. Dodecahedron (far back center)
    const dodGeo = new THREE.DodecahedronGeometry(0.8);
    const dodMat = new THREE.MeshPhysicalMaterial({
      color: colors.cream,
      metalness: 0.05,
      roughness: 0.7,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const dod = new THREE.Mesh(dodGeo, dodMat);
    dod.position.set(0, -0.5, -6);
    scene.add(dod);
    shapes.push({ mesh: dod, baseX: 0, baseY: -0.5, rotSpeed: 0.08, floatSpeed: 0.8, floatAmplitude: 0.2 });

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    disposables.push(() => window.removeEventListener("mousemove", handleMouseMove));

    // Animation
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // --- Animate gradient mesh (undulating waves) ---
      const pos = meshGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < vertexCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const dist = Math.sqrt(ox * ox + oy * oy);
        // Multiple sine waves for organic movement
        const wave1 = Math.sin(elapsed * 0.3 + ox * 0.8 + oy * 0.5) * 0.12;
        const wave2 = Math.sin(elapsed * 0.5 + ox * 0.4 - oy * 0.7) * 0.08;
        const wave3 = Math.sin(elapsed * 0.15 + dist * 1.5) * 0.15;
        pos.setZ(i, (wave1 + wave2 + wave3) * 0.5);
      }
      pos.needsUpdate = true;

      // --- Animate particles ---
      const pPos = particleSystem.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        // Slow drift
        const idx = i * 3;
        pPos.array[idx] += particleSpeeds[i].x;
        pPos.array[idx + 1] += particleSpeeds[i].y;
        pPos.array[idx + 2] += Math.sin(elapsed * 0.1 + i) * 0.002;

        // Wrap around edges
        if (pPos.array[idx] > 11) pPos.array[idx] = -11;
        if (pPos.array[idx] < -11) pPos.array[idx] = 11;
        if (pPos.array[idx + 1] > 8) pPos.array[idx + 1] = -8;
        if (pPos.array[idx + 1] < -8) pPos.array[idx + 1] = 8;
      }
      pPos.needsUpdate = true;

      // --- Animate shapes ---
      shapes.forEach((shape, i) => {
        shape.mesh.rotation.x += shape.rotSpeed * 0.008;
        shape.mesh.rotation.y += shape.rotSpeed * 0.01;
        shape.mesh.position.y =
          shape.baseY +
          Math.sin(elapsed * shape.floatSpeed + i * 1.5) * shape.floatAmplitude;

        // Mouse parallax on X
        const parallaxOffsetX = mouseX * (0.3 + i * 0.05);
        shape.mesh.position.x = shape.baseX + parallaxOffsetX;
      });

      // Camera slight movement
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.2 + 1 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, -2);

      composer.render();
    }

    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    disposables.push(() => window.removeEventListener("resize", handleResize));

    return () => {
      disposables.forEach((fn) => fn());
      composer.dispose();
      renderer.dispose();
      texture.dispose();
      meshGeo.dispose();
      meshMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shapes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
