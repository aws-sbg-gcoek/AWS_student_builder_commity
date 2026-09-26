import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 4, 15);
    purpleLight.position.set(4, 4, 4);
    scene.add(purpleLight);

    const greenLight = new THREE.PointLight(0x4ef35e, 3, 15);
    greenLight.position.set(-4, -2, 3);
    scene.add(greenLight);

    const group = new THREE.Group();
    scene.add(group);

    // Inner Glowing Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.8,
      wireframe: true,
      roughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Center Core Light
    const centerGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const centerMat = new THREE.MeshBasicMaterial({ color: 0x4ef35e, transparent: true, opacity: 0.85 });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    group.add(centerMesh);

    // Orbital Rings
    const createRing = (radius: number, color: number, rotX: number, rotY: number) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createRing(2.0, 0x8b5cf6, Math.PI / 3, 0);
    const ring2 = createRing(2.5, 0x4ef35e, -Math.PI / 4, Math.PI / 6);
    const ring3 = createRing(3.0, 0xc084fc, Math.PI / 2.2, -Math.PI / 4);
    group.add(ring1);
    group.add(ring2);
    group.add(ring3);

    // Orbiting particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.2 + Math.random() * 1.5;
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xc084fc, size: 0.08, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Drag to rotate
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      group.rotation.y += dx * 0.005;
      group.rotation.x += dy * 0.005;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };

    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        group.rotation.y += 0.007;
        group.rotation.x = Math.sin(elapsed * 0.5) * 0.15;
      }

      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.05;
      coreMesh.scale.set(pulse, pulse, pulse);
      centerMesh.scale.set(pulse * 0.9, pulse * 0.9, pulse * 0.9);

      ring1.rotation.z = elapsed * 0.2;
      ring2.rotation.z = -elapsed * 0.25;
      ring3.rotation.z = elapsed * 0.15;
      particles.rotation.y = -elapsed * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      centerGeo.dispose();
      centerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[320px] sm:h-[380px] cursor-grab active:cursor-grabbing relative"
    />
  );
}
