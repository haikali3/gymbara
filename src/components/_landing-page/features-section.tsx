import { Dumbbell, LineChart, Smartphone, Calendar, Zap } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { FeatureBox } from "../_feature-box/feature-box";
import { Badge } from "../ui/badge";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-6">ALL-IN-ONE SOLUTION</Badge>

          <Typography variant="h2" className="mb-4">
            Powerful features for your fitness journey
          </Typography>

          <Typography
            variant="lead"
            className="text-gray-600 md:max-w-2xl mx-auto"
          >
            Gymbara is more than just a fitness tracker. We've built a suite of
            powerful features that gives you fitness superpowers.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureBox
            icon={Dumbbell}
            title="Workout Library"
            description="Plan your fitness routine with our intuitive workout plan"
          />

          <FeatureBox
            icon={Calendar}
            title="Workout History"
            description={
              <>
                Easily view your past workouts and track improvements
                <br /> over time
              </>
            }
          />

          <FeatureBox
            icon={LineChart}
            title="Progress Analytics"
            description="Visualize your fitness journey with detailed insights."
          />

          <FeatureBox
            icon={Zap}
            title="Custom Workout Logging"
            description={
              <>
                Track your workouts with custom reps and weights suited
                <br /> to your goals
              </>
            }
          />

          <FeatureBox
            icon={Smartphone}
            title="Mobile Sync"
            description="Seamlessly sync your data across all your devices."
          />

          {/* <FeatureBox
            icon={Badge}
            title="Achievement System"
            description="Stay motivated with badges and rewards for reaching milestones."
          /> */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
