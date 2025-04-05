import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Check, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 text-gray-800">
      <div className="container mx-auto max-w-4xl">
        <div className="p-8 md:p-12 rounded-3xl text-center border border-gray-200 bg-white shadow-sm">
          <Typography
            variant="small"
            className="inline-block bg-gray-100 text-gray-800 text-sm px-4 py-1 rounded-full mb-4 font-medium"
          >
            For a Limited Time Only
          </Typography>

          <Typography variant="h2" className="mb-6">
            Get 30% Off Premium Plan Today
          </Typography>

          <Typography
            variant="lead"
            className="mb-8 text-gray-600 md:max-w-2xl mx-auto"
          >
            Join thousands of users who have transformed their bodies with
            Gymbara's all-in-one fitness solution.
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto text-left">
            {[
              "Personalized workout plans",
              "Nutrition tracking & meal plans",
              "Progress analytics dashboard",
              "Expert coaching support",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start">
                <Check
                  className="text-gray-800 mr-2 flex-shrink-0 mt-[2px]"
                  size={18}
                />
                <Typography variant="small" className="text-gray-700">
                  {item}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-6 py-6 rounded-full text-base w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800">
              Start Your 14-Day Free Trial
              <ArrowRight className="ml-1" size={16} />
            </Button>

            <Button
              variant="outline"
              className="bg-transparent border border-gray-300 text-gray-700 px-6 py-6 rounded-full text-base w-full sm:w-auto hover:bg-gray-100"
            >
              View All Features
            </Button>
          </div>

          <div className="mt-8 text-sm flex flex-col items-center">
            <Typography variant="small" className="text-gray-700 mb-2">
              <strong>No credit card required.</strong> 14-day free trial on
              premium features.
            </Typography>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 border border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border border-white"></div>
              </div>
              <Typography variant="small" className="text-gray-600">
                Join 10,000+ active users
              </Typography>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Typography
            variant="small"
            className="text-gray-500 flex items-center text-sm"
          >
            <span className="mr-1">⭐️</span> 4.9 out of 5 stars from 2,000+
            reviews
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
