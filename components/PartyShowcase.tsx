"use client";

import { parties } from "@/lib/constants";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PartyCard from "./PartyCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Image from "next/image";

interface PartyShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {}

const PartyShowcase = ({ className, ...props }: PartyShowcaseProps) => {
  return (
    <div>
      <div className="lg:mx-auto w-full max-w-5xl px-6 py-16 lg:py-32">
        <h2 className="mx-auto mb-8 text-center component-title md:mb-12 lg:mb-16">
          Partidos
        </h2>

        <div
          className="flex flex-row items-center justify-center bg-contain bg-center py-10"
          style={{
            backgroundImage:
              "url('https://assets.website-files.com/6458c625291a94a195e6cf3a/648825fca218588cb636c341_Group%2048114.png')",
          }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className=""
          >
            <CarouselContent className="mx-6 lg:max-w-5xl max-w-xs">
              {parties.map((party, index) => (
                <CarouselItem key={index} className="basis-full lg:basis-1/3">
                  <Card className="flex flex-col justify-between text-card bg-card-foreground h-48 text-left">
                    <CardHeader>
                      <CardTitle>{party.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full">
                      <PartyCard party={party} />
                    </CardContent>
                  </Card>{" "}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:grid" />
            <CarouselNext className="hidden lg:grid" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PartyShowcase;
