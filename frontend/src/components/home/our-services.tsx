import { Car, CreditCard, Headset } from "lucide-react";
import Image from "next/image";

export const OurServices = () => {
  return (
    <div className="relative min-h-150 mt-10 md:mt-4">
      <Image
        src="/car_interior.jpg"
        alt="car interior"
        fill
        className="object-cover"
      />
      <div className="flex">
        <div className="bg-black/25 backdrop-blur-md min-h-150 w-full md:w-1/2 px-6 flex flex-col justify-center py-6 md:py-4 xl:py-0">
          <h2 className="text-white text-2xl font-bold">Our Services</h2>
          <div className="flex items-center gap-x-2">
            <div className="h-px w-6 bg-white" />
            <p className="text-white/80 text-lg">Looking to improve your business</p>
          </div>
          <p className="text-white mt-4">
            Our platform helps car rental businesses manage daily operations from one easy-to-use
            dashboard. It allows owners to organize vehicle fleets, track availability, and handle
            rental bookings efficiently. Businesses can view rental history, customer details, and
            payment records in real time, reducing manual work and errors. With flexible rental
            management, transparent pricing control, and automated record keeping, the app helps
            rental companies stay organized, save time, and grow confidently.
          </p>
          <div className="space-y-6 mt-6">
            <div className="flex items-center gap-x-4">
              <div className="bg-white/30 w-fit p-3 rounded-md">
                <Headset className="text-white size-14" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">
                  Support 24/7
                </h4>
                <p className="text-white/80 mt-1 max-w-96">
                  Our dedicated team is available around the clock to ensure smooth
                  and stress-free operations.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="bg-white/30 w-fit p-3 rounded-md">
                <Car className="text-white size-14" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">
                  Smart Fleet Management
                </h4>
                <p className="text-white/80 mt-1 max-w-96">
                  Manage vehicles, track availability, and monitor fleet status
                  in real time from one dashboard.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="bg-white/30 w-fit p-3 rounded-md">
                <CreditCard className="text-white size-14" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">
                  Rental & Payment Tracking
                </h4>
                <p className="text-white/80 mt-1 max-w-96">
                  Keep clear records of bookings, rental history, and payments to
                  reduce errors and save time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
