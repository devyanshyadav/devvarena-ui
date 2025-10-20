import React from "react";
import Image from "next/image";
import Link from "next/link";
import HaloButtonv1 from "@/devvarena-ui/button/halo-button/v1/component";
import { MdArrowOutward } from "react-icons/md";
import { Terminal } from "lucide-react";
import DocFeatures from "@/components/layout-comp/doc-features";
import Header from "@/components/layout-comp/header";

const HomePage = () => {
  return (
    <div className="min-h-screen heroBg">
      <div className="p-2 px-4 flex  backdrop-blur-sm items-center h-16 border-b sticky top-0 z-50 border-background/50">
        <Header />
      </div>
      <div className="max-w-7xl flex h-full flex-col justify-center items-center text-center mx-auto p-2 md:p-10 py-5 ">
        {/* Hero Section */}
        <div className="space-y-5">
          <div className="flex gap-2 items-center justify-center border mx-auto rounded-full w-fit pl-1 pr-3 py-0.5 ring-2 ring-border/50">
            <Image
              src="/shadcn-img.png"
              className=" rounded-full w-6 h-6"
              alt="shadcn-img"
              width={20}
              height={20}
            />
            <p className="flex gap-2 md:text-base text-sm items-center">
              Built on shadcn/ui
            </p>
          </div>

          <h1 className="text-3xl md:text-7xl font-semibold font-secondary text-center">
            Beautiful & Reusable <br />
            <span className="text-primary">React Components</span>
          </h1>

          <p className="text-xs md:text-lg text-muted-foreground text-center">
            Customizable, TypeScript-ready components built on shadcn/ui.
          </p>

          <div className="flex gap-4 *:w-full *:md:w-auto justify-center flex-wrap">
            <Link href="/docs">
              <HaloButtonv1
                rounded="full"
                className="md:py-3 !w-full md:w-auto text-xs md:text-sm bg-gradient-to-l from-secondary to-background"
              >
                Browse Components <MdArrowOutward />
              </HaloButtonv1>
            </Link>
            <Link href="/docs/installation">
              <HaloButtonv1
                rounded="full"
                className="md:py-3 w-full md:w-auto text-xs md:text-sm bg-primary text-primary-foreground border border-border"
              >
                <Terminal className="w-4 h-4" />
                Get Started
              </HaloButtonv1>
            </Link>
          </div>
        </div>
      </div>
      <hr className="max-w-10 h-2 rounded-full bg-secondary mx-auto" />
      <div className="max-w-6xl flex h-full flex-col justify-center items-center text-center mx-auto p-2 md:p-10 py-5 ">
        <DocFeatures />
      </div>
    </div>
  );
};

export default HomePage;
