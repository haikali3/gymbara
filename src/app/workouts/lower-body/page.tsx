"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, ChevronLeft } from "lucide-react";

// Define a detailed interface for the exercise
interface ExerciseDetail {
  name: string;
  warmUpSets: string | number;
  workingSets: number;
  reps: string;
  load: string;
  RPE: string;
  rest: string;
  substitutionOptions: string[];
  notes: string;
}

function ExerciseCard({ exercise }: { exercise: ExerciseDetail }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md w-full max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        {exercise.name}
      </h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Warm-Up Sets:</strong> {exercise.warmUpSets}
        </p>
        <p>
          <strong>Working Sets:</strong> {exercise.workingSets}
        </p>
        <p>
          <strong>Reps:</strong> {exercise.reps}
        </p>
        <p>
          <strong>Load:</strong> {exercise.load}
        </p>
        <p>
          <strong>RPE:</strong> {exercise.RPE}
        </p>
        <p>
          <strong>Rest:</strong> {exercise.rest}
        </p>

        <div>
          <strong>Substitution Options:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {exercise.substitutionOptions.map((option, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-800 border border-gray-200"
              >
                {option}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-600">
          <strong>Notes:</strong> {exercise.notes}
        </p>
      </div>
    </div>
  );
}

// Usage example in your page component
export default function LowerBodyWorkoutPage() {
  const exercises: ExerciseDetail[] = [
    {
      name: "DB Bulgarian Split Squat",
      warmUpSets: 2,
      workingSets: 3,
      reps: "10 - 12",
      load: "10kg",
      RPE: "8 - 9",
      rest: "~2 MINS",
      substitutionOptions: ["Goblet Squat", "Leg Press Toe Press"],
      notes: "Start with your weaker leg. Squat deep."
    },
    // Add other exercises similarly
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center gap-4 font-sans">
      <header className="flex items-center justify-center w-full relative gap-1 mb-4">
        <Dumbbell className="h-6 w-6 text-gray-800" />
        <h2 className="text-3xl font-semibold text-gray-800">Lower Body Workout</h2>
      </header>

      <main className="grid gap-4 w-full max-w-5xl grid-cols-1 sm:grid-cols-2">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </main>

      <footer className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Gymbara Fitness App. All rights reserved.
      </footer>
    </div>
  );
}
