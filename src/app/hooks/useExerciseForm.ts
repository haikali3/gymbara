// hooks/useExerciseForm.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workoutSchema, WorkoutFormValues } from "@/schema/workoutSchema";
import { ExerciseDetails } from "@/types/type";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import { useSubmitExercises } from "./useSubmitExercise";

export function useExerciseForm(exercises: ExerciseDetails[]) {
  const defaultValues: WorkoutFormValues = {
    exercises: exercises.map((ex) => ({
      exercise_id: ex.id,
      custom_reps: 10,
      custom_load: 10,
    })),
  };

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues,
  });

  const submitMutation = useSubmitExercises();

  // wrap RHF handleSubmit around your mutation
  const onSubmit = form.handleSubmit((values) => {
    submitMutation.mutate({
      sectionId: 1,
      exercises: values.exercises,
    });
  });

  const handleResetWorkout = (e?: React.MouseEvent) => {
    e?.preventDefault();
    form.reset(defaultValues);
    useWorkoutStore.persist.clearStorage();
    useWorkoutStore.setState({ section_id: 1, exercises: {} });
    // you can keep this toast:
    // toast({ title: "Workout Reset", description: "...", variant: "default" });
  };

  return {
    form,
    onSubmit,
    handleResetWorkout,
    isSubmitting: submitMutation.isPending,
    defaultValues,
  };
}
