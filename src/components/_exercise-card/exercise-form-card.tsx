"use client";

import React from "react";
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
import { ExerciseDetails } from "@/types/type";
import { useExerciseForm } from "@/app/hooks/useExerciseForm";
import { Typography } from "../ui/typography";
import { ExerciseGuideTooltip } from "./exercise-guide-tooltip";

type ExerciseFormCardProps = {
  exercises: ExerciseDetails[];
};

export default function ExerciseForm({ exercises }: ExerciseFormCardProps) {
  const { form, onSubmit, handleResetWorkout } = useExerciseForm(exercises);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {exercises.map((exercise, index: number) => (
          <div
            key={exercise.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-md mx-auto flex flex-col gap-2"
          >
            <div className="flex items-center justify-center gap-2 pt-1">
              <ExerciseGuideTooltip exerciseId={exercise.id} />
              <Typography variant="p">
                {exercise.name || "Missing Exercise Name"}
              </Typography>
            </div>
            <div className="flex items-center justify-between w-full p-2">
              {/* Sets (display only) */}
              <div className="flex flex-col items-center gap-1">
                <Typography variant="p" className="text-gray-600">
                  Sets
                </Typography>
                <Input
                  value={exercise.working_sets}
                  className="w-20 p-1 border-gray-300 rounded text-center"
                  disabled
                />
              </div>
              {/* Reps input with Stepper */}
              <div className="flex flex-col items-center gap-1">
                <Typography variant="p" className="text-gray-600">
                  Reps
                </Typography>
                <FormField
                  control={form.control}
                  name={`exercises.${index}.custom_reps`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <Stepper
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />
              </div>
              {/* Weight input */}
              <div className="flex flex-col items-center gap-1">
                <Typography variant="p" className="text-gray-600">
                  Weight
                </Typography>
                <FormField
                  control={form.control}
                  name={`exercises.${index}.custom_load`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={field.onChange}
                          className="w-20 p-1 border-gray-300 rounded text-center"
                          min="0"
                          step="any"
                        />
                      </FormControl>
                      <FormMessage className="text-center" />
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
                Clear Exercises
              </Button>
              <Button type="submit">Submit Exercises</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
