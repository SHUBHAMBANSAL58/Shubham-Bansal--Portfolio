import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef<boolean>(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      // Fallback gracefully if WebGL is unsupported
      return;
    }

    // Geometry & Constellation Nodes
    const particleCount = 65;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      velocities.push({
        x: (Math.random() - 0.5) * 0.12,
        y: (Math.random() - 0.5) * 0.12,
        z: (Math.random() - 0.5) * 0.08
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material - adaptive to active theme
    const pMaterial = new THREE.PointsMaterial({
      color: isDarkRef.current ? 0x818cf8 : 0x4f46e5,
      size: 2.2,
      transparent: true,
      opacity: isDarkRef.current ? 0.85 : 0.75
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Dynamic Interconnecting Line Segments - NormalBlending in light mode to avoid washed-out white
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDarkRef.current ? 0x6366f1 : 0x4338ca,
      transparent: true,
      opacity: isDarkRef.current ? 0.22 : 0.20,
      blending: isDarkRef.current ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 15;
      targetY = y * 10;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop & Material Theme Sync
    let animationFrameId: number;
    let lastDarkState: boolean = isDarkRef.current;

    const applyThemeToMaterials = (dark: boolean) => {
      pMaterial.color.setHex(dark ? 0x818cf8 : 0x4f46e5);
      pMaterial.opacity = dark ? 0.85 : 0.75;
      lineMaterial.color.setHex(dark ? 0x6366f1 : 0x4338ca);
      lineMaterial.opacity = dark ? 0.22 : 0.20;
      lineMaterial.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      lineMaterial.needsUpdate = true;
    };

    applyThemeToMaterials(lastDarkState);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };

    if (renderer) {
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    }

    const animate = () => {
      // Dynamic theme sync ONLY when theme state changes
      const darkActive = isDarkRef.current;
      if (darkActive !== lastDarkState) {
        lastDarkState = darkActive;
        applyThemeToMaterials(darkActive);
      }

      if (prefersReducedMotion) {
        renderer?.render(scene, camera);
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      particles.rotation.y += 0.0015;
      particles.rotation.x = mouseY * 0.02;
      particles.rotation.z = mouseX * 0.01;

      lineMesh.rotation.y = particles.rotation.y;
      lineMesh.rotation.x = particles.rotation.x;
      lineMesh.rotation.z = particles.rotation.z;

      // Update particle positions
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] += velocities[i].x;
        posArr[i * 3 + 1] += velocities[i].y;
        posArr[i * 3 + 2] += velocities[i].z;

        // Bounce boundaries
        if (Math.abs(posArr[i * 3]) > 60) velocities[i].x *= -1;
        if (Math.abs(posArr[i * 3 + 1]) > 40) velocities[i].y *= -1;
        if (Math.abs(posArr[i * 3 + 2]) > 30) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Calculate connections between nearby nodes
      let lineIndex = 0;
      const lineArr = lineGeometry.getAttribute('position').array as Float32Array;

      for (let i = 0; i < particleCount && lineIndex < maxConnections; i++) {
        for (let j = i + 1; j < particleCount && lineIndex < maxConnections; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 320) {
            lineArr[lineIndex * 6] = posArr[i * 3];
            lineArr[lineIndex * 6 + 1] = posArr[i * 3 + 1];
            lineArr[lineIndex * 6 + 2] = posArr[i * 3 + 2];
            lineArr[lineIndex * 6 + 3] = posArr[j * 3];
            lineArr[lineIndex * 6 + 4] = posArr[j * 3 + 1];
            lineArr[lineIndex * 6 + 5] = posArr[j * 3 + 2];
            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.getAttribute('position').needsUpdate = true;

      renderer?.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
