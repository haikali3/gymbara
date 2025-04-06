import {
  Dumbbell,
  Utensils,
  LineChart,
  Heart,
  Badge,
  Smartphone,
  Calendar,
  Clock,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";

const FeatureBox = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="p-3 rounded-xl bg-gray-100 text-gray-800">
          <Icon size={24} />
        </div>
      </div>
      <div>
        <Typography variant="h4" className="mb-2">
          {title}
        </Typography>
        <Typography variant="muted">{description}</Typography>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Typography
            variant="small"
            className="inline-block text-gray-800 text-sm px-4 py-1 rounded-full mb-4 font-medium bg-gray-100"
          >
            ALL-IN-ONE SOLUTION
          </Typography>

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
            description="Access hundreds of pre-built workouts or create your own custom routines."
          />

          <FeatureBox
            icon={LineChart}
            title="Progress Analytics"
            description="Visualize your fitness journey with detailed charts and insights."
          />

          <FeatureBox
            icon={Heart}
            title="Health Metrics"
            description="Monitor vital health statistics like heart rate, sleep quality, and more."
          />

          <FeatureBox
            icon={Badge}
            title="Achievement System"
            description="Stay motivated with badges and rewards for reaching milestones."
          />

          <FeatureBox
            icon={Smartphone}
            title="Mobile Sync"
            description="Seamlessly sync your data across all your devices."
          />

          <FeatureBox
            icon={Calendar}
            title="Workout Scheduler"
            description="Plan your fitness routine with our intuitive calendar."
          />

          {/* <FeatureBox
            icon={Utensils}
            title="Nutrition Tracking"
            description="Log meals and track macros with our comprehensive food database."
          /> */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
