import * as z from "zod";

export const workoutSchema = z.object({
  exercises: z.array(
    z.object({
      exercise_id: z.number(),
      custom_reps: z.number().min(1, { message: "Reps must be more than 0" }),
      custom_load: z.number().min(1, { message: "Weight must be greater than 0" }),
    })
  ),
});