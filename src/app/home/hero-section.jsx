import { Button } from "@/components/ui/button";
import React from "react";

function HeroSection() {
  return (
    <section className="relative min-h-93 bg-black">
      <img
        src="./assets/hero-image-1440.jpeg"
        alt="Easylodge.in Hero Image"
        className="absolute size-full z-1 max-w-360 max-auto object-cover inset-0"
      />
      <div className="z-2 relative container">
        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
          Travel has never
          <span className="block leading-none">felt this cosy</span>
        </h1>
        <p className="text-xl font-medium leading-snug text-white md:text-2xl">
          Book an entire place all to yourself
        </p>
        <Button className="mt-6 h-12 px-4 text-base font-semibold cursor-pointer">
          Discover Holiday Rentals
        </Button>
      </div>
    </section>
  );
}

export default HeroSection;
