"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workoutSchema, WorkoutFormValues } from "@/app/schema/workoutSchema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Stepper from "../stepper";
import { submitUserExerciseDetails } from "@/utils/services/api";
import { ExerciseDetails } from "@/app/types/type";
import { useWorkoutStore } from "@/stores/useWorkoutStore";

type ExerciseFormCardProps = {
  exercises: ExerciseDetails[];
};

export default function ExerciseForm({ exercises }: ExerciseFormCardProps) {
  // Compute default values using the passed-in exercises data.
  const defaultValues: WorkoutFormValues = {
    exercises: exercises.map((ex) => ({
      exercise_id: ex.id,
      custom_reps: 10,
      custom_load: 0, // 0 will trigger a validation error until a valid weight (> 0) is entered.
    })),
  };

  // Initialize the form with our schema and default values.
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues,
  });

  const onSubmit = async (values: WorkoutFormValues) => {
    try {
      const result = await submitUserExerciseDetails(1, values.exercises);
      console.log("Workout submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  const handleResetWorkout = () => {
    // Clear persisted state from storage and reset the in-memory state.
    useWorkoutStore.persist.clearStorage();
    useWorkoutStore.setState({
      section_id: 1,
      exercises: {},
    });
    // Optionally, reset the form to its default values:
    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {exercises.map((exercise, index: number) => (
          <div
            key={exercise.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-md mx-auto flex flex-col gap-2"
          >
            <h2 className="text-base font-normal text-gray-800 text-center pt-1">
              {exercise.name || "Missing Exercise Name"}
            </h2>
            <div className="flex items-center justify-between w-full p-2">
              {/* Sets (display only) */}
              <div className="flex flex-col items-center gap-1">
                <label className="text-sm text-gray-600">Sets</label>
                <Input
                  value={exercise.working_sets}
                  className="w-20 p-1 border-gray-300 rounded text-center"
                  disabled
                />
              </div>
              {/* Reps input with Stepper */}
              <div className="flex flex-col items-center gap-1">
                <label className="text-sm text-gray-600">Reps</label>
                <FormField
                  control={form.control}
                  name={`exercises.${index}.custom_reps`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Stepper
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Weight input */}
              <div className="flex flex-col items-center gap-1">
                <label className="text-sm text-gray-600">Weight</label>
                <FormField
                  control={form.control}
                  name={`exercises.${index}.custom_load`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
                          // onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20 p-1 border-gray-300 rounded text-center"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="sticky bottom-0 bg-gray-50 p-2">
          <div className="flex justify-center">
            <div className="flex gap-2 max-w-md">
              <Button variant="outline" onClick={handleResetWorkout}>
                Clear Workout
              </Button>
              <Button type="submit">Submit Workout</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
