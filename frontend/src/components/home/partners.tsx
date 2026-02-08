import Image from "next/image";

import "./slider.css";

export const Partners = () => {
  const logoSrcs = [
    "/logoipsum-372.png",
    "/logoipsum-378.png",
    "/logoipsum-382.png",
    "/logoipsum-414.png",
    "/logoipsum-395.png",
    "/logoipsum-408.png",
    "/logoipsum-420.png",
    "/logoipsum-410.png",
    "/logoipsum-418.png",
    "/logoipsum-417.png",
    "/logoipsum-419.png",
  ];

  return (
    <div className="max-w-480 mx-auto my-10">
      <h3 className="text-center font-semibold text-2xl">Our Partners</h3>
      <p className="text-muted-foreground text-center">Join us on this journey.</p>
      <div className="flex items-center justify-center mt-4">
        <div className="w-full h-36 overflow-hidden relative">
          <div className="w-[200%] flex items-center h-36 justify-around absolute left-0 gap-20 animate-marquee">
            {logoSrcs.map((src, index) => (
              <div key={index} className="flex justify-center items-center shrink-0">
                <Image src={src} alt={`Partner ${index + 1}`} height={500} width={500} className="h-16 w-auto object-contain" />
              </div>
            ))}
            {logoSrcs.map((src, index) => (
              <div key={`duplicate-${index}`} className="flex justify-center items-center shrink-0">
                <Image src={src} alt={`Partner ${index + 1}`} height={500} width={500} className="h-16 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
