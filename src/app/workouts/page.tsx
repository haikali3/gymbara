"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Dumbbell } from "lucide-react";
import Header from "@/components/_layout/header";
import Footer from "@/components/_layout/footer";

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
      // "Spider Curl",
      // "Cable Lateral Raise",
      // "Hanging Leg Raise",
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
      // "A1: DB Incline Curl",
      // "A2: DB French Press",
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

  //TODO: fetch the card from backend from WorkoutSections Table

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col gap-2">
      <Header title={"workout"} />
      <main className="grid gap-2 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
      <Footer />
    </div>
  );
}
