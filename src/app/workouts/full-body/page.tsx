"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell } from "lucide-react";
import TimePickerDialog from "@/components/time-picker-dialog";

// Define an interface for the exercise
interface Exercise {
  name: string;
  defaultSets: number;
}

// Stepper component for reps
function Stepper({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={decrement}>-</Button>
      <span className="text-center w-8">{count}</span>
      <Button variant="outline" size="sm" onClick={increment}>+</Button>
    </div>
  );
}

// ExerciseCard component
function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(exercise.defaultSets);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSets(Number(e.target.value));
  };

  return (
    <div className="bg-white border border-gray-200 pt-2 rounded-lg shadow-sm w-full max-w-md mx-auto flex flex-col gap-2 sm:gap-6">
      <h2 className="text-base font-normal text-gray-800 text-center">
        {exercise.name}
      </h2>
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex flex-col items-center sm:flex-row gap-2">
          <label className="text-sm text-gray-600">Reps</label>
          <Stepper />
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-2">
          <label className="text-sm text-gray-600">Sets</label>
          <Input
            type="number"
            value={sets}
            onChange={handleSetsChange}
            className="w-20 p-1 border-gray-300 rounded text-center"
            min="1"
          />
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-2">
          <label className="text-sm text-gray-600">Weight (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            className="w-20 p-1 border-gray-300 rounded text-center"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}

export default function FullBodyWorkoutPage() {

  const exercises: Exercise[] = [
    { name: "Incline Machine Press", defaultSets: 3 },
    { name: "Single-Leg Leg Press (Heavy)", defaultSets: 4 },
    { name: "Pendlay Row", defaultSets: 3 },
    { name: "Glute-Ham Raise", defaultSets: 2 },
    { name: "Spider Curl", defaultSets: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col items-center gap-4 font-sans">
      <header className="flex items-center justify-center w-full relative gap-1">
        <Dumbbell className="h-5 w-5 text-gray-800" />
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Full Body Workout
        </h2>
      </header>

      <main className="grid gap-1 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
        <div>

          {/* Timer Button with Dialog */}
          <TimePickerDialog />
        </div>
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </main>

      <footer className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Gymbara Fitness App. All rights reserved.
      </footer>
    </div >
  );
}
