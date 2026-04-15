"use client";

import { AnimatedBeamDemo } from "@/components/hero-beams";
import Iridescence from "@/components/Iridescence";
import LogoLoop from "@/components/LogoLoop";
import { AuroraText } from "@/components/ui/aurora-text";

const imageLogos = [
  {
    src: "/logo.webp",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/logo-extended.webp",
    alt: "Company 2",
    href: "https://company2.com",
  },
];

export default function Page() {
  return (
    <section className="min-h-screen w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-5xl">
            Desbloquea tu <AuroraText>potencial</AuroraText> con Turempleo.
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">
            Descubre oportunidades de empleo, conecta con empleadores y eleva tu
            carrera profesional.
          </p>

          <div className="w-full overflow-hidden pt-4">
            <LogoLoop
              logos={imageLogos}
              speed={30}
              direction="left"
              logoHeight={50}
              gap={50}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
            />
          </div>
        </div>

        <div className="relative w-full aspect-square max-h-125 mx-auto">
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Iridescence
              color={[0.5, 0.6, 0.8]}
              mouseReact={false}
              amplitude={0.1}
              speed={0.8}
            />
          </div>

          <div className="relative z-10 flex items-center justify-center h-full p-6">
            <AnimatedBeamDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
