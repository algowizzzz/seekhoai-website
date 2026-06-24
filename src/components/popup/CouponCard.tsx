"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { Group, MathUtils, AdditiveBlending } from "three";
import { popup } from "@/content/content";

interface Props {
  hovered: boolean;
  onHover: (h: boolean) => void;
  reducedMotion: boolean;
}

/**
 * The 3D coupon card. Geometry: a rounded box (width 4, height 2.4, depth 0.16, radius 0.15).
 * Materials use MeshPhysicalMaterial with iridescence + emissive halo.
 * Interactions:
 *   - idle bob (sine on y)
 *   - pointer follow (damped lerp toward cursor)
 *   - click-and-drag for free rotation, springs back on release
 *   - hover lift + halo intensify
 */
export function CouponCard({ hovered, onHover, reducedMotion }: Props) {
  const group = useRef<Group>(null);
  const halo = useRef<Group>(null);

  const { pointer } = useThree();
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const baseTilt = useRef({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });

  // Pointer-down/up handlers are attached at canvas level via R3F
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onUp = () => setDragging(false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !halo.current) return;

    const time = state.clock.elapsedTime;

    // 1. Idle bob (y) + slow auto-rotation
    const bob = reducedMotion ? 0 : Math.sin(time * 1.2) * 0.05;
    const autoRot = reducedMotion ? 0 : Math.sin(time * 0.6) * MathUtils.degToRad(2);

    // 2. Pointer follow (only when not dragging)
    if (!dragging) {
      const strength = reducedMotion ? 0.25 : 1;
      targetTilt.current.x = -pointer.y * MathUtils.degToRad(15) * strength;
      targetTilt.current.y = pointer.x * MathUtils.degToRad(20) * strength;
      // Damped lerp — heavy feel
      baseTilt.current.x = MathUtils.lerp(baseTilt.current.x, targetTilt.current.x, 0.06);
      baseTilt.current.y = MathUtils.lerp(baseTilt.current.y, targetTilt.current.y, 0.06);
      // Spring back drag offset toward 0
      dragOffset.current.x = MathUtils.lerp(dragOffset.current.x, 0, 0.08);
      dragOffset.current.y = MathUtils.lerp(dragOffset.current.y, 0, 0.08);
    }

    group.current.rotation.x = baseTilt.current.x + dragOffset.current.x;
    group.current.rotation.y = baseTilt.current.y + dragOffset.current.y + autoRot;
    group.current.position.y = bob;

    // 3. Hover scale lift
    const targetScale = hovered ? 1.04 : 1;
    const cur = group.current.scale.x;
    const next = MathUtils.lerp(cur, targetScale, 0.1);
    group.current.scale.setScalar(next);

    // 4. Halo intensify on hover
    halo.current.scale.setScalar(next * 1.08);
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragOffset.current.y = dx * 0.01;
    dragOffset.current.x = dy * 0.01;
  };

  const haloIntensity = hovered ? 0.35 : 0.15;

  return (
    <group>
      {/* Gold halo behind the card */}
      <group ref={halo} position={[0, 0, -0.12]}>
        <mesh>
          <planeGeometry args={[4.6, 3.0]} />
          <meshBasicMaterial
            color="#f4b455"
            transparent
            opacity={hovered ? 0.32 : 0.20}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group
        ref={group}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <RoundedBox args={[4, 2.4, 0.16]} radius={0.15} smoothness={5}>
          <meshPhysicalMaterial
            color="#07302e"
            emissive="#f4b455"
            emissiveIntensity={haloIntensity}
            roughness={0.15}
            metalness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.2}
            transmission={0.35}
            thickness={0.5}
            iridescence={0.5}
            iridescenceIOR={1.3}
          />
        </RoundedBox>

        {/* Front face text */}
        <Text
          position={[0, 0.78, 0.09]}
          fontSize={0.16}
          color="#7ab8b1"
          letterSpacing={0.18}
          anchorX="center"
          anchorY="middle"
        >
          {popup.cardEyebrow}
        </Text>

        <Text
          position={[0, 0.12, 0.09]}
          fontSize={0.78}
          color="#f4b455"
          letterSpacing={-0.03}
          anchorX="center"
          anchorY="middle"
          font={undefined}
          fontWeight={700}
        >
          {popup.cardHero}
        </Text>

        <Text
          position={[0, -0.55, 0.09]}
          fontSize={0.14}
          color="#7ab8b1"
          letterSpacing={0.12}
          anchorX="center"
          anchorY="middle"
        >
          {popup.cardCodeLabel}
        </Text>

        {/* Code badge — outlined */}
        <group position={[0, -0.85, 0.09]}>
          <mesh>
            <planeGeometry args={[1.2, 0.34]} />
            <meshBasicMaterial color="#07302e" transparent opacity={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <ringGeometry args={[0.59, 0.6, 32]} />
            <meshBasicMaterial color="#f4b455" />
          </mesh>
          <Text
            position={[0, 0, 0.002]}
            fontSize={0.2}
            color="#f6f3ec"
            letterSpacing={0.32}
            anchorX="center"
            anchorY="middle"
          >
            {popup.code}
          </Text>
        </group>
      </group>
    </group>
  );
}
