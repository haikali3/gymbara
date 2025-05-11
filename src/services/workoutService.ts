import { ExerciseDetails, WorkoutSections } from "@/types/type";
import { StandardResponse } from "@/types/standard-response";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchWorkoutDetails(workoutSectionId: number) {
  const response = await fetch(
    `${BASE_URL}/workout-sections/details?workout_section_id=${workoutSectionId}`,
    {
      credentials: 'include',
    }
  );
  if (response.status === 401) {
    const error = new Error("Unauthorized: Please log in") as Error & { status?: number };
    error.status = 401;
    throw error;
  }

  if (!response.ok) {
    const error = new Error("Failed to fetch workout details") as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const json = await response.json() as { status: number; message: string; data: ExerciseDetails[] };
  return json.data;
}

export async function fetchWorkoutSectionsWithExercises(
  workoutSectionIds: number[]
): Promise<StandardResponse<WorkoutSections[]>> {
  const queryParams = workoutSectionIds.map(id => `workout_section_ids=${id}`).join('&');
  const response = await fetch(
    `${BASE_URL}/workout-sections/exercises?${queryParams}`,
    { method: 'GET', credentials: 'include' }
  );

  let payload: { status?: string; statusCode?: number; message?: string; data?: any };
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    const msg = payload.message ?? 'Unknown error';
    const err = new Error(msg) as Error & { status?: number };
    err.status = payload.statusCode ?? response.status;
    throw err;
  }

  return payload as StandardResponse<WorkoutSections[]>;
}

export async function submitUserExerciseDetails(
  workoutSectionId: number, 
  exercises: { exercise_id: number; custom_reps?: number; custom_load?: number }[]
) {
  try {
    const requestBody = {
      section_id: workoutSectionId,
      exercises: exercises.map(({ exercise_id, custom_reps, custom_load }) => ({
        exercise_id,
        custom_reps: custom_reps ?? 0,
        custom_load: custom_load ?? 0,
      })),
    };

    const response = await fetch(`${BASE_URL}/workout-sections/user-exercise-details`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in');
    }
    if (!response.ok) {
      throw new Error(`Failed to submit user exercise details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting user exercise details:', error);
    throw error;
  }
} 