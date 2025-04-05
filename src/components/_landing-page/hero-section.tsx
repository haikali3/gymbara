import PageWrapper from "@/components/_layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import React from "react";

export default function HeroSection() {
  return (
    <PageWrapper>
      <section className="pt-12 pb-12 px-4 md:px-8 bg-gray-50 min-h-[90vh] flex items-center">
        <div className="container mx-auto">
          {/* Main Hero Content */}
          <div className="text-center">
            <div className="mx-auto flex h-7 w-fit items-center rounded-full border border-neutral-200 bg-white px-4 text-xs text-neutral-800">
              <Typography variant="small">
                LIMITED TIME OFFER: 30% OFF PREMIUM PLAN
              </Typography>
            </div>

            <Typography variant="h1">
              The smarter way to <br className="hidden md:block" />
              track your fitness
            </Typography>

            <Typography
              variant="lead"
              className="max-w-2xl mx-auto text-gray-600 mb-8"
            >
              10,000+ fitness enthusiasts have transformed their bodies with
              Gymbara.
              <br />
              Join them today with our risk-free trial.
            </Typography>

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto">
              {/* <Button> */}
              <Button className="bg-black text-white hover:bg-black/90 px-6 py-6 rounded-md text-base w-full shadow-none">
                Start free 14-day trial
              </Button>
            </div>

            <Typography
              variant="small"
              className="mt-6 text-gray-600 flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              No credit card required
            </Typography>

            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex -space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 border border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border border-white"></div>
              </div>
              <Typography variant="small" className="text-gray-600">
                Trusted by 10,000+ users
              </Typography>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
              <div className="p-6 rounded-xl">
                <Typography variant="h3" className="mb-2">
                  Visualize progress
                </Typography>
                <Typography variant="muted">
                  Track your fitness journey with detailed analytics and charts
                </Typography>
              </div>
              <div className="p-6 rounded-xl">
                <Typography variant="h3" className="mb-2">
                  Smart Analytics
                </Typography>
                <Typography variant="muted">
                  Get personalized insights based on your performance data
                </Typography>
              </div>
              <div className="p-6 rounded-xl">
                <Typography variant="h3" className="mb-2">
                  Organize workouts
                </Typography>
                <Typography variant="muted">
                  Create custom workout plans and track your progress over time
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
