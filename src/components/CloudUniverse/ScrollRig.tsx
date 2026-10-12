import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface ScrollRigProps {
  reducedMotion?: boolean;
}

const CAMERA_HOME = new THREE.Vector3(0, 0.55, 7.2);

/**
 * Idle cinematic rig — fixed camera with damped mouse parallax only.
 * No scroll dolly: the single-scene composition is framed once and the
 * camera never enters the star shell, so the frame can't fill with blobs.
 */
export function ScrollRig({ reducedMotion = false }: ScrollRigProps) {
  useFrame(({ camera, pointer }, delta) => {
    if (reducedMotion) {
      camera.position.copy(CAMERA_HOME);
      camera.lookAt(0, 0, 0);
      return;
    }
    const targetX = pointer.x * 0.55;
    const targetY = CAMERA_HOME.y + pointer.y * 0.32;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, CAMERA_HOME.z, 2.5, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
