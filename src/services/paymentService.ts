import { OrderDetails, Subscription } from "@/types/payment-type";
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
  const res = await fetch(`${BASE_URL}/payment/get-subscription`, {
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
    };
  }

  return res.json();
}

export async function fetchVerifySession(sessionId: string): Promise<OrderDetails> {
  const res = await fetch(
    `${BASE_URL}/payment/verify-session?session_id=${sessionId}`,
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
    payload = {};
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