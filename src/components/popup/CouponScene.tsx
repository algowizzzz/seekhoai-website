"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import { CouponCard } from "./CouponCard";
import { CouponParticles } from "./CouponParticles";

interface Props {
  reducedMotion: boolean;
}

export function CouponScene({ reducedMotion }: Props) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const enableBloom = !reducedMotion && !isMobile;
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5];

  return (
    <div
      className="relative h-56 w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#0c494b] via-[#07302e] to-[#0a3a3c] sm:h-64 md:h-72 lg:h-80"
      aria-hidden
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ height: "100%", width: "100%", touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[4, 4, 3]} intensity={1.4} color="#f4b455" />
          <directionalLight position={[-3, -3, 1]} intensity={0.5} color="#7ab8b1" />

          <CouponCard hovered={hovered} onHover={setHovered} reducedMotion={reducedMotion} />
          <CouponParticles
            hovered={hovered}
            reducedMotion={reducedMotion}
            count={isMobile ? 60 : 120}
          />

          {enableBloom && (
            <EffectComposer>
              <Bloom intensity={1.0} luminanceThreshold={0.55} luminanceSmoothing={0.3} radius={0.7} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
