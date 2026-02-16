"use client";

import { FadeIn } from "./FadeIn";
import { PhoneMockup } from "./PhoneMockup";

export function Showcase() {
  return (
    <section className="relative py-16 md:py-24">
      {/* Multiple subtle glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-chapter-connections/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/3 h-[300px] w-[300px] rounded-full bg-chapter-challenges/[0.03] blur-[100px]" />

      <FadeIn>
        <div className="flex justify-center">
          <PhoneMockup />
        </div>
      </FadeIn>
    </section>
  );
}
