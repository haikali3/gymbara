import PageWrapper from "@/components/_layout/page-wrapper";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Hero() {
  return (
    <PageWrapper>
      <section className="pt-28 pb-12 px-4 md:px-8 bg-gray-50 min-h-[90vh] flex items-center">
        <div className="container mx-auto">
          {/* Main Hero Content */}
          <div className="text-center">
            <div className="neomorphic-sm inline-block text-gray-800 text-sm px-4 py-1 rounded-full mb-4">
              <span className="font-medium">
                LIMITED TIME OFFER: 30% OFF PREMIUM PLAN
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-gray-800 max-w-5xl mx-auto">
              The smarter way to <br className="hidden md:block" />
              track your fitness
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 mb-8">
              10,000+ fitness enthusiasts have transformed their bodies with
              Gymbara.
              <br />
              Join them today with our risk-free trial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto">
              <Button className="bg-black text-white hover:bg-black/90 px-6 py-6 rounded-md text-base w-full shadow-none">
                Start free 14-day trial
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              No credit card required
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex -space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 border border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border border-white"></div>
              </div>
              <p className="text-gray-600 text-sm">Trusted by 10,000+ users</p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="neomorphic p-6 rounded-xl text-left">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  Visualize progress
                </h3>
                <p className="text-gray-600">
                  Track your fitness journey with detailed analytics and charts
                </p>
              </div>
              <div className="neomorphic p-6 rounded-xl text-left">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  Smart Analytics
                </h3>
                <p className="text-gray-600">
                  Get personalized insights based on your performance data
                </p>
              </div>
              <div className="neomorphic p-6 rounded-xl text-left">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  Organize workouts
                </h3>
                <p className="text-gray-600">
                  Create custom workout plans and track your progress over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
