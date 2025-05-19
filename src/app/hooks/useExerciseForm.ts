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

  const mapFormToExerciseDetails = (formEx: { exercise_id: number; custom_reps: number; custom_load: number }) => {
    const originalEx = exercises.find(ex => ex.id === formEx.exercise_id);
    if (!originalEx) throw new Error(`Exercise with id ${formEx.exercise_id} not found`);
    
    return {
      ...originalEx,
      exercise_id: formEx.exercise_id,
      custom_reps: formEx.custom_reps,
      custom_load: formEx.custom_load
    };
  };

  const onSubmit = form.handleSubmit((values) => {
    submitMutation.mutate({
      sectionId: 1,
      exercises: values.exercises.map(mapFormToExerciseDetails)
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
