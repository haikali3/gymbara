/**
 * Workout Service
 * 
 * This service handles all workout-related API calls including:
 * - Fetching workout sections and details
 * - Managing workout exercises
 * - Submitting user exercise details
 * 
 * All endpoints require authentication (credentials: 'include')
 */

import { ExerciseDetails, WorkoutSections } from "@/types/type";
import { StandardResponse } from "@/types/standard-response";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches detailed information about a specific workout section
 * @param workoutSectionId - The ID of the workout section to fetch
 * @returns Promise<ExerciseDetails[]> - Array of exercise details for the workout section
 * @throws Error with status 401 if unauthorized
 * @throws Error with status code if request fails
 */
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

/**
 * Fetches workout sections with their associated exercises
 * @param workoutSectionIds - Array of workout section IDs to fetch
 * @returns Promise<StandardResponse<WorkoutSections[]>> - Standard response containing workout sections with exercises
 * @throws Error if request fails
 */
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

/**
 * Submits user's exercise details for a specific workout section
 * @param workoutSectionId - The ID of the workout section
 * @param exercises - Array of exercise details including custom reps and load
 * @returns Promise with the submission response
 * @throws Error with status 401 if unauthorized
 * @throws Error if submission fails
 */
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

export interface ExerciseGuide {
  id: number;
  name: string;
  notes: string;
  substitutions: string[];
}

export interface ExerciseGuideResponse {
  status: string;
  statusCode: number;
  message: string;
  data: ExerciseGuide;
}

export async function fetchExerciseGuide(exerciseId: number): Promise<ExerciseGuideResponse> {
  const response = await fetch(
    `${BASE_URL}/workout-sections/exercises/${exerciseId}/guide`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status === 401) {
    const error = new Error("Unauthorized: Please log in") as Error & { status?: number };
    error.status = 401;
    throw error;
  }
  
  if (!response.ok) {
    const error = new Error(`Failed to fetch exercise guide: ${response.statusText}`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  
  return response.json();
} 