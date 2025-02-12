"use client";
import React, { useEffect, useState } from "react";
import Stepper from "../stepper";
import { Input } from "../ui/input";
import { ExerciseCardProps } from "@/app/types/type";
import { useWorkoutStore } from "@/stores/useWorkoutStore";

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const { updateExercise, exercises } = useWorkoutStore();

  const exerciseData = exercises.find((ex) => ex.exercise_id === exercise.id);

  // Get weight and reps directly from the store
  const weight = exerciseData?.custom_load ?? 0;
  const reps = exerciseData?.custom_reps ?? 0;

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateExercise(exercise.id, { custom_load: value });
  };

  const handleRepsChange = (value: number) => {
    updateExercise(exercise.id, { custom_reps: value });
  };

  useEffect(() => {
    console.log("Updating exercise:", exercise.id, {
      custom_load: weight,
      custom_reps: reps,
    });
    updateExercise(exercise.id, {
      custom_load: weight,
      custom_reps: reps,
    });
  }, []);

  console.log(reps);

  return (
    <div className="bg-white border border-gray-200 pt-2 rounded-lg shadow-sm w-full max-w-md mx-auto flex flex-col gap-2 sm:gap-6">
      <h2 className="text-base font-normal text-gray-800 text-center pt-1">
        {/* {exercise.id || "Missing Exercise ID"} */}
        {exercise.name || "Missing Exercise Name"}
      </h2>
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex flex-col items-center gap-1">
          <label className="text-sm text-gray-600">Sets</label>
          <Input
            value={exercise.working_sets}
            className="w-20 p-1 border-gray-300 rounded text-center"
            disabled
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-sm text-gray-600">Reps</label>
          <Stepper id={exercise.id} value={reps} onChange={handleRepsChange} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-sm text-gray-600">Weight</label>
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
};

export default ExerciseCard;
