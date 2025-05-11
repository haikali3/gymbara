/**
 * Payment Service
 * 
 * This service handles all payment and subscription-related API calls including:
 * - Creating Stripe checkout sessions
 * - Managing user subscriptions
 * - Verifying payment sessions
 * - Handling subscription cancellations and renewals
 * 
 * All endpoints require authentication (credentials: 'include')
 */

import { OrderDetails, Subscription } from "@/types/payment-type";
import { CancelSubResponse, StandardResponse } from "@/types/standard-response";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Helper function to handle API responses
 * @param response - The fetch Response object
 * @returns Promise<T> - The parsed response data
 * @throws Error if response parsing fails or request fails
 */
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

/**
 * Creates a new Stripe checkout session for the user
 * @param email - User's email address
 * @returns Promise<{ url: string }> - Checkout session URL
 * @throws Error if session creation fails
 */
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

/**
 * Fetches the current user's subscription details
 * @returns Promise<Subscription> - User's subscription information
 * @returns Default subscription object if user has no subscription
 */
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

/**
 * Verifies a payment session
 * @param sessionId - The Stripe session ID to verify
 * @returns Promise<OrderDetails> - Order details for the session
 * @throws Error if verification fails
 */
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

/**
 * Cancels the user's current subscription
 * @param subscriptionId - The ID of the subscription to cancel
 * @returns Promise<CancelSubResponse> - Response containing cancellation details
 * @throws Error if cancellation fails
 */
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

/**
 * Renews the user's current subscription
 * @returns Promise<StandardResponse<{ message: string; next_renewal: string }>> - Response containing renewal details
 * @throws Error if renewal fails
 */
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