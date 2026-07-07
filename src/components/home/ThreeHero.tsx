import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    container.appendChild(renderer.domElement);

    // --- Shapes ---

    // Colors matching editorial theme
    const colors = {
      gold: new THREE.Color("#B8860B"),
      goldLight: new THREE.Color("#D4A843"),
      navy: new THREE.Color("#0F1B2D"),
      cream: new THREE.Color("#FAF6F1"),
    };

    const shapes: {
      mesh: THREE.Mesh;
      baseY: number;
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
    shapes.push({ mesh: torus, baseY: 0.5, rotSpeed: 0.15, floatSpeed: 0.5, floatAmplitude: 0.4 });

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
    shapes.push({ mesh: ico, baseY: 2, rotSpeed: 0.1, floatSpeed: 0.7, floatAmplitude: 0.5 });

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
    shapes.push({ mesh: oct, baseY: 2.5, rotSpeed: 0.12, floatSpeed: 0.6, floatAmplitude: 0.35 });

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
    shapes.push({ mesh: ring, baseY: -1.5, rotSpeed: 0.2, floatSpeed: 0.4, floatAmplitude: 0.3 });

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
    shapes.push({ mesh: icoSmall, baseY: -1, rotSpeed: 0.18, floatSpeed: 0.55, floatAmplitude: 0.4 });

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
    shapes.push({ mesh: dod, baseY: -0.5, rotSpeed: 0.08, floatSpeed: 0.8, floatAmplitude: 0.2 });

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

    // Animation
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate & float shapes
      shapes.forEach((shape, i) => {
        shape.mesh.rotation.x += shape.rotSpeed * 0.008;
        shape.mesh.rotation.y += shape.rotSpeed * 0.01;
        shape.mesh.position.y =
          shape.baseY +
          Math.sin(elapsed * shape.floatSpeed + i * 1.5) * shape.floatAmplitude;

        // Mouse parallax
        shape.mesh.position.x += (mouseX * (0.3 + i * 0.05) - (shape.mesh.position.x - (i < 3 ? [-0.5, 3.5, -3][i] : [3, -3.5, 0][i - 3]))) * 0.01;
      });

      // Camera slight movement
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.2 + 1 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, -2);

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
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
      style={{ opacity: 0.8 }}
    />
  );
}
