import { OrderDetails, Subscription } from "@/types/payment-type";
import { ExerciseDetails, WorkoutSections } from "@/types/type";
import { CancelSubResponse, StandardResponse } from "@/types/standard-response";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  let data: StandardResponse<T>;
  try {
    data = await response.json();
  } catch {
    throw new Error("Failed to parse response");
  }

  if (!response.ok || data.status === "fail") {
    const error = new Error(data.message || "Request failed") as Error & { statusCode?: number };
    error.statusCode = data.statusCode || response.status;
    throw error;
  }

  return data.data;
}

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

  const json = await response.json() as { status: number; message: string; data: ExerciseDetails[] };
  return json.data;
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

// TODO: all api call follow this standard
export async function fetchWorkoutSectionsWithExercises(
  workoutSectionIds: number[]
): Promise<StandardResponse<WorkoutSections[]>> {
  // build query string…
  const queryParams = workoutSectionIds.map(id => `workout_section_ids=${id}`).join('&');
  const response = await fetch(
    `${BASE_URL}/workout-sections/exercises?${queryParams}`,
    { method: 'GET', credentials: 'include' }
  );

  // parse the body early so we can always pull out message/statusCode
  let payload: { status?: string; statusCode?: number; message?: string; data?: any };
  try {
    payload = await response.json();
  } catch {
    // fallback if JSON parse fails
    payload = {};
  }

  if (!response.ok) {
    // use backend's message if available
    const msg = payload.message ?? 'Unknown error';
    const err = new Error(msg) as Error & { status?: number };
    err.status = payload.statusCode ?? response.status;
    throw err;
  }

  // at this point response.ok, payload.data should be your StandardResponse shape
  return payload as StandardResponse<WorkoutSections[]>;
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
  const res = await fetch(`${BASE_URL}/payment/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  return handleApiResponse<{ url: string }>(res);
}

export async function fetchUserSubscription(): Promise<Subscription> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/get-subscription`, {
    credentials: "include",
  });

  if (!res.ok) {
    return { 
      subscription_id: 'N/A',
      customer_id: 'N/A', 
      price_id: 'N/A',
      is_active: false,
      expiration_date: 'Missing Expiration Date',
      cancel_at_period_end: false
    }; // fallback if not subscribed
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

export async function cancelSubscription(
  subscriptionId: string
): Promise<CancelSubResponse> {
  const response = await fetch(
    `${BASE_URL}/payment/cancel-subscription`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ subscription_id: subscriptionId }),
    }
  );

  let payload: Partial<CancelSubResponse> = {};
  try {
    payload = await response.json();
  } catch {
    // if JSON parse fails, payload stays {}
  }

  const statusCode = payload.statusCode ?? response.status;
  const message = payload.message ?? "Failed to cancel subscription";

  if (!response.ok) {
    const err = new Error(message) as Error & {
      statusCode?: number;
      apiStatus?: string;
    };
    err.statusCode = statusCode;
    err.apiStatus = payload.status ?? "error";
    throw err;
  }

  // return the full payload so your mutation can use it
  return payload as CancelSubResponse;
}

export async function renewSubscription(): Promise<StandardResponse<{ message: string; next_renewal: string }>> {
  const response = await fetch(
    `${BASE_URL}/payment/renew-subscription`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const data = await response.json();
  if (!response.ok || data.status === "fail") {
    const error = new Error(data.message || "Failed to renew subscription") as Error & { statusCode?: number };
    error.statusCode = data.statusCode || response.status;
    throw error;
  }

  return data;
}