import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import Phone from "./phone";

export default function HeroSection() {
  return (
    <section
      className="pt-12 pb-12 px-4 md:px-8 bg-gray-50 min-h-[60vh] flex items-center"
      style={{
        backgroundImage: `
        radial-gradient(77% 116% at 37% 67%, #A1C4FD, rgba(161, 196, 253, 0) 50%),
        radial-gradient(85% 127% at 100% 100%, #FBC2EB, rgba(251, 194, 235, 0) 50%),
        radial-gradient(90% 136% at 52% 100%, #A29BFE, rgba(162, 155, 254, 0) 50%),
        radial-gradient(102% 143% at 92% 7%, #81ECEC, rgba(129, 236, 236, 0) 50%)
      `,
        backgroundColor: "#fdfdfd",
      }}
    >
      <div className="container mx-auto">
        {/* Main Hero Content */}
        <div className="text-center">
          <div className="mx-auto flex h-7 w-fit items-center rounded-full border border-neutral-200 bg-white px-4 text-xs text-neutral-800 mb-2">
            <Typography variant="small">
              LIMITED TIME OFFER: 30% OFF PREMIUM PLAN
            </Typography>
          </div>

          <Typography variant="h1">
            The smarter way to <br className="hidden md:block" />
            track your fitness
          </Typography>

          <Typography
            variant="small"
            className="max-w-2xl mx-auto text-gray-600 mb-8 mt-3 text-pretty text-lg"
          >
            Be one of the first to experience the future of fitness tracking.
            <br />
            Start your today and take the first step towards your fitness goals!
          </Typography>

          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto">
            {/* <Button> */}
            <Button className="bg-black text-white hover:bg-black/90 px-6 py-6 rounded-md text-base w-full shadow-none">
              <Typography className="text-white" variant="h4">
                Get Fit Now
              </Typography>
              <ArrowUpRight />
            </Button>
          </div>

          <Typography
            variant="small"
            className="mt-6 text-gray-600 flex items-center justify-center gap-2"
          >
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block animate-pulse"></span>
            Cancel anytime, no hidden fees
          </Typography>

          {/* Later add this here lol */}
          <Typography variant="small">
            Built by fitness enthusiasts. Designed for you.
          </Typography>
          {/* <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex -space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 border border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 border border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border border-white"></div>
            </div>
            <Typography variant="small" className="text-gray-600">
              Trusted by 10,000+ users
            </Typography>
          </div> */}
          <Phone />
        </div>
      </div>
    </section>
  );
}
