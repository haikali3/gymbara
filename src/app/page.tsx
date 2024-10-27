"use client"
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell } from "lucide-react";

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
      <Button variant="ghost" size="sm" onClick={decrement}>-</Button>
      <span className="text-center w-10 text-black font-bold text-lg">{count}</span>
      <Button variant="ghost" size="sm" onClick={increment}>+</Button>
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
    <div className="bg-white border border-black p-4 w-full max-w-md mx-auto flex flex-col gap-2 sm:gap-4 z-10 relative">
      <h2 className="text-lg font-bold text-black text-left">
        {exercise.name.toUpperCase()}
      </h2>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-center sm:flex-row gap-2 w-full">
          <label className="text-sm font-bold text-black">REPS</label>
          <Stepper />
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-2 w-full">
          <label className="text-sm font-bold text-black">SETS</label>
          <Input
            type="number"
            value={sets}
            onChange={handleSetsChange}
            className="w-16 p-1 text-center border-black border bg-white font-bold"
            min="1"
          />
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-2 w-full">
          <label className="text-sm font-bold text-black">WEIGHT (KG)</label>
          <Input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            className="w-16 p-1 text-center border-black border bg-white font-bold"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const exercises: Exercise[] = [
    { name: "Incline Machine Press", defaultSets: 3 },
    { name: "Single-Leg Leg Press (Heavy)", defaultSets: 4 },
    { name: "Pendlay Row", defaultSets: 3 },
    { name: "Glute-Ham Raise", defaultSets: 2 },
    { name: "Spider Curl", defaultSets: 3 },
  ];

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center gap-4 font-sans relative overflow-hidden">

      {/* Large Background Text */}
      <div className="absolute inset-0 flex justify-center items-center text-gray-200 font-extrabold text-[15rem] opacity-10 pointer-events-none select-none">
        GYMBARA
      </div>

      {/* Header */}
      <header className="flex items-center justify-center w-full z-10 relative">
        <Dumbbell className="h-8 w-8 text-black" />
        <h1 className="text-4xl font-extrabold text-black ml-2">GYMBARA</h1>
      </header>

      {/* Main Content */}
      <main className="grid gap-4 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 z-10 relative">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center text-black text-xs font-bold border-t-2 border-black mt-8 w-full py-2 z-10 relative">
        © {new Date().getFullYear()} GYMBARA FITNESS APP. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
