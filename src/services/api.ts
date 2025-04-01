import { OrderDetails, Subscription } from "@/types/payment-type";
import { StandardResponse, WorkoutSections } from "@/types/type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchWorkoutSections() {
  const response = await fetch(`${BASE_URL}/workout-sections`, {
    credentials: 'include', // Include cookies with the request
  });
  if (!response.ok) throw new Error('Failed to fetch workout sections');
  return await response.json();
}

export async function fetchWorkoutList(workoutSectionId: number) {
  const response = await fetch(
    `${BASE_URL}/workout-sections/list?workout_section_id=${workoutSectionId}`,
    {
      credentials: 'include', // Include cookies with the request
    }
  );
  if (!response.ok) throw new Error('Failed to fetch workout list');
  return await response.json();
}

export async function fetchWorkoutDetails(workoutSectionId: number) {
  const response = await fetch(
    `${BASE_URL}/workout-sections/details?workout_section_id=${workoutSectionId}`,
    {
      credentials: 'include', // Include cookies with the request
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
  return await response.json();
}

export async function fetchUserDetails() {
  try {
    // browser sends cookies with req
    const response = await fetch(`${BASE_URL}/api/user-info`, {
      method: 'GET',
      credentials: 'include', // Include cookies with the request
    });
    if (response.status === 401) {
      throw new Error('Unauthorized: Please log in');
    }
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}

export async function fetchWorkoutSectionsWithExercises(
  workoutSectionIds: number[]
): Promise<StandardResponse<WorkoutSections[]>> {
  try {
    // Converts the workoutSectionIds array into a query string (?workout_section_ids=1&workout_section_ids=2).
    const queryParams = workoutSectionIds.map(id => `workout_section_ids=${id}`).join('&');

    const response = await fetch(`${BASE_URL}/workout-sections/exercises?${queryParams}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 401) {
      const error = new Error('Unauthorized: Please log in') as Error & { status?: number };
      error.status = 401;
      throw error;
    }
    if (!response.ok) {
      const error = new Error('Failed to fetch workouts sections with exercises') as Error & { status?: number };
      error.status = response.status;
      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching workouts sections with exercises', error);
    throw error;
  }
}

export async function submitUserExerciseDetails(workoutSectionId: number, exercises: { exercise_id: number; custom_reps?: number; custom_load?: number }[]) {
  try {
    const requestBody = {
      section_id: workoutSectionId,
      exercises: exercises.map(({ exercise_id, custom_reps, custom_load }) => ({
        exercise_id,
        custom_reps: custom_reps ?? 0, // Default if undefined
        custom_load: custom_load ?? 0, // Default if undefined
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

export async function createStripeCheckoutSession(email: string): Promise<{ url: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const message = await res.text(); // Read error body as string
    throw new Error(message || "Failed to initiate Stripe Checkout");
  }

  return res.json();
}

export async function fetchUserSubscription(): Promise<Subscription> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/get-subscription`, {
    credentials: "include",
  });

  if (!res.ok) {
    return { is_active: false, expiration_date: 'Missing Expiration Date' }; // fallback if not subscribed
  }

  return res.json();
}

export async function fetchVerifySession(sessionId: string): Promise<OrderDetails> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/verify-session?session_id=${sessionId}`,
    { credentials: "include" }
  );

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }

  return res.json();
}
