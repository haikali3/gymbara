// hooks/useSubmitExercises.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/hooks/use-toast";
import { submitUserExerciseDetails } from "@/services/workoutService";
import { ExerciseDetails } from "@/types/type";

type Payload = { 
  sectionId: number; 
  exercises: ExerciseDetails[] 
};

export function useSubmitExercises() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, exercises }: Payload) =>
      submitUserExerciseDetails(sectionId, exercises),
    onSuccess: async (resp) => {
      toast({
        title: `${resp.statusCode} – ${resp.status}`, 
        description: resp.message,
        variant: "default",
      });
      // e.g. re-fetch workout data
      await qc.invalidateQueries({ queryKey: ["workout"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
