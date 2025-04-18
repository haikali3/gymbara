import * as z from "zod";

export const workoutSchema = z.object({
  exercises: z.array(
    z.object({
      exercise_id: z.number(),
      custom_reps: z.number().min(1, { message: "Reps more 0" }),
      custom_load: z.coerce.number().min(1, { message: "Weight more 0" }),
    })
  ),
});

export type WorkoutFormValues = z.infer<typeof workoutSchema>;