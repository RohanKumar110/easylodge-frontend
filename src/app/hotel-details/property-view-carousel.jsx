import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

function PropertyViewCarousel({ images }) {
  return (
    <section>
      <Carousel
        className="overflow-hidden rounded-lg"
        opts={{
          breakpoints: {
            "(min-width: 1024px)": { slidesToScroll: 2 },
          },
        }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 pl-0.5">
              <img
                src={image}
                alt={`Image index: ${index}`}
                className="h-96 w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-1 shadow-lg" />
        <CarouselNext className="right-1 shadow-lg" />
      </Carousel>
    </section>
  );
}

export default PropertyViewCarousel;
