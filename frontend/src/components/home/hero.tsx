import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

import { Car, Motorbike, Truck, Van } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeroProps {
  session: Session | null;
};

export const Hero = ({ session }: HeroProps) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="flex gap-x-6 flex-col md:flex-row justify-between pt-10 pl-6">
        <div className="w-full md:w-1/2 mx-auto flex flex-col items-center justify-center relative">
          <div className="flex items-center justify-center gap-x-6">
            <div className="bg-primary-background px-4 py-1 rounded-full">
              <Car className="text-white" />
            </div>
            <div className="bg-primary-background px-4 py-1 rounded-full">
              <Van className="text-white" />
            </div>
            <div className="bg-primary-background px-4 py-1 rounded-full">
              <Truck className="text-white" />
            </div>
            <div className="bg-primary-background px-4 py-1 rounded-full">
              <Motorbike className="text-white" />
            </div>
          </div>
          <Image
            src="/car.png"
            alt="car"
            className="z-10"
            height={1000}
            width={1000}
          />
          <div className="absolute bg-violet-100 h-125 w-125 rounded-full -left-16 -bottom-10 -z-10" />
          <div className="absolute bg-violet-100 h-80 w-80 rounded-full left-96 -bottom-24 -z-10" />
          <div className="absolute bg-violet-100 h-52 w-52 rounded-full left-0 -bottom-52 -z-10" />
        </div>
        <div className="w-full mt-6 md:mt-0 md:w-1/2 mx-auto flex items-center pr-6">
          <div className="w-full max-w-165">
            <div className="hidden md:flex items-center gap-x-2">
              <div className="h-px w-6 bg-black" />
              <h3 className="font-light">We make your life easier</h3>
            </div>
            <h1 className="md:mt-4 text-center md:text-left text-5xl md:text-7xl font-bold">Upgrade Your <br /><span className="text-center md:text-left text-primary-background">Rent-a-car</span> Business</h1>
            <div className="flex md:justify-end">
              <div className="mt-8 flex items-center">
                <div className="h-6 w-6 bg-primary-background rounded-full mr-2" />
                <h2 className="text-xl font-semibold text-muted-foreground">
                  Easy, Reliable, Convenient
                </h2>
              </div>
            </div>
            <div className="flex md:justify-end mt-8">
              <p className="text-lg font-semibold">
                Manage bookings, track vehicles, and grow revenue.
              </p>
            </div>
            <div className="flex md:justify-end">
              <p className="text-lg font-semibold">
                Simplify your car rental operations.
              </p>
            </div>
            <div className="flex md:justify-end">
              <p className="text-lg font-semibold">
                Run smarter.
              </p>
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-x-6">
              <Button asChild className="rounded-full px-10 py-6 text-lg font-bold cursor-pointer w-full md:w-auto">
                <Link href={session ? "/dashboard" : "/login"}>
                  Start Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="mt-4 md:mt-0 border-black rounded-full px-10 py-6 text-lg font-bold cursor-pointer w-full md:w-auto">
                <Link href="/">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-360 flex flex-col md:flex-row justify-between mt-10 md:mt-26 px-6">
        <div className="max-w-96">
          <h3 className="text-4xl font-bold">3+ Years</h3>
          <p className="mt-4 text-muted-foreground font-thin">
            Proven experience helping car rental businesses streamline daily operations
          </p>
        </div>
        <div className="max-w-96 mt-6 md:mt-0">
          <h3 className="text-4xl font-bold">12+ Companies</h3>
          <p className="mt-4 text-muted-foreground font-thin">
            Trusted by growing rental companies to manage fleets, bookings, and customers
          </p>
        </div>
        <div className="max-w-96 mt-6 md:mt-0">
          <h3 className="text-4xl font-bold">500+ Cars</h3>
          <p className="mt-4 text-muted-foreground font-thin">
            Vehicles successfully managed through our platform across multiple locations
          </p>
        </div>
      </div>
    </div>
  );
};
