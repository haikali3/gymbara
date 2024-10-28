"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutPlan {
  title: string;
  description: string;
  exercises: string[];
  route: string;
}

// Define workout plans
const workoutPlans: WorkoutPlan[] = [
  {
    title: "Full Body Workout",
    description: "Full Body - Day 1",
    exercises: [
      "Incline Machine Press",
      "Single-Leg Leg Press (Heavy)",
      "Single-Leg Leg Press (Back off)",
      "Pendlay Row",
      "Glute-Ham Raise",
      "Spider Curl",
      "Cable Lateral Raise",
      "Hanging Leg Raise",
    ],
    route: "/workouts/full-body",
  },
  {
    title: "Upper Body Workout",
    description: "Upper Body - Day 2",
    exercises: [
      "2-Grip Pullup",
      "Weighted Dip (Heavy)",
      "Weighted Dip (Back off)",
      "Incline Chest-Supported DB Row",
      "Standing DB Arnold Press",
      "A1: DB Incline Curl",
      "A2: DB French Press",
    ],
    route: "/workouts/upper-body",
  },
  {
    title: "Lower Body Workout",
    description: "Lower Body - Day 3",
    exercises: [
      "DB Bulgarian Split Squat",
      "DB Romanian Deadlift",
      "Goblet Squat",
      "A1: Leg Press Toe Press",
      "A2: Machine Crunch",
    ],
    route: "/workouts/lower-body",
  },
];

export default function Workout() {
  const router = useRouter();

  const navigateToWorkout = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col items-center gap-4 font-sans">
      <header className="flex items-center justify-center w-full relative gap-1">
        <Dumbbell className="h-6 w-6 text-gray-800" />
        <h2 className="pl-1 text-3xl font-semibold text-gray-800 text-center">
          workouts
        </h2>
      </header>

      <main className="grid gap-2 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex items-center justify-between pb-1">
          <Button onClick={() => router.back()} size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        {workoutPlans.map((plan, index) => (
          <div
            key={index}
            onClick={() => navigateToWorkout(plan.route)}
            className="bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg p-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
            <p className="text-sm text-gray-600">{plan.description}</p>
            <ul className="mt-2 text-sm text-gray-700 list-disc pl-4">
              {plan.exercises.map((exercise, i) => (
                <li key={i}>{exercise}</li>
              ))}
            </ul>
          </div>
        ))}
      </main>

      <footer className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Gymbara Fitness App. All rights reserved.
      </footer>
    </div>
  );
}
