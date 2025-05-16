// src/lib/api.ts
import { StandardResponse } from "@/types/standard-response";

export async function handleApiResponse<T>(
  response: Response
): Promise<StandardResponse<T>> {
  let payload: StandardResponse<T>;
  try {
    payload = await response.json();
  } catch {
    throw new Error("Failed to parse JSON response");
  }

  // HTTP error or API-level "fail" flag
  if (!response.ok || payload.status === "fail") {
    const err = new Error(payload.message || "Request failed") as Error & {
      statusCode?: number;
    };
    err.statusCode = payload.statusCode ?? response.status;
    throw err;
  }

  return payload;
}
