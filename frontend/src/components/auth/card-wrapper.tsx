import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backHref?: string;
  backLabel?: string;
};

export const CardWrapper = ({ children, headerLabel, backHref, backLabel }: CardWrapperProps) => {
  return (
    <Card className="w-100 shadow-md pb-4">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              height={120}
              width={120}
            />
          </Link>
          <p className="text-muted-foreground text-sm">
            {headerLabel}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {backHref && backLabel && (
        <CardFooter>
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link href={backHref}>
              {backLabel}
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
