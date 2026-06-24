"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { type Points as ThreePoints, AdditiveBlending } from "three";

interface Props {
  hovered: boolean;
  reducedMotion: boolean;
  count?: number;
}

/**
 * Particle aura orbiting the card on a vertical axis. Drifts faster on hover.
 * Plus drei <Sparkles/> for periodic sparkle pulses.
 */
export function CouponParticles({ hovered, reducedMotion, count = 120 }: Props) {
  const ref = useRef<ThreePoints>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.5;
      arr[i * 3 + 0] = r * Math.cos(theta);
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = r * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * (hovered ? 0.45 : 0.18);
  });

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffd27a"
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {!reducedMotion && (
        <Sparkles
          count={20}
          scale={[3.6, 2.2, 0.5]}
          size={3}
          speed={0.6}
          color="#ffd27a"
          opacity={0.9}
        />
      )}
    </group>
  );
}
