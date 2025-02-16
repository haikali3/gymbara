"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workoutSchema, WorkoutFormValues } from "@/app/schema/workoutSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import {
  fetchWorkoutDetails,
  submitUserExerciseDetails,
} from "@/utils/services/api";
import ExerciseCardSkeleton from "../_exercise-card/exercise-card-skeleton";
import ExerciseCardError from "../_exercise-card/exercise-card-error";

export default function WorkoutForm() {
  // Fetch the exercise details (assuming each exercise has an "id" and "name")
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["workoutSections", 1],
    queryFn: () => fetchWorkoutDetails(1),
  });

  // Compute default form values directly from the query data.
  // This example defaults to 10 reps and 0 weight (which will trigger a validation error until a valid weight is entered).
  const defaultValues: WorkoutFormValues = {
    exercises: data.map((ex: any) => ({
      exercise_id: ex.id,
      custom_reps: 10,
      custom_load: 0,
    })),
  };

  // Initialize the form with the computed default values.
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

  if (isLoading) return <ExerciseCardSkeleton />;
  if (isError) return <ExerciseCardError onRetry={refetch} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.watch("exercises").map((exercise, index) => (
          <div key={exercise.exercise_id} className="border p-4 rounded">
            <h3 className="mb-2 font-semibold">
              Exercise {exercise.exercise_id}
            </h3>

            <FormField
              control={form.control}
              name={`exercises.${index}.custom_load`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`exercises.${index}.custom_reps`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter reps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button type="submit">Submit Workout</Button>
      </form>
    </Form>
  );
}
