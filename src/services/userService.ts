/**
 * User Service
 * 
 * This service handles all user-related API calls including:
 * - Fetching user profile information
 * 
 * All endpoints require authentication (credentials: 'include')
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches the current user's profile information
 * @returns Promise with user details
 * @throws Error with status 401 if unauthorized
 * @throws Error if request fails
 */
export async function fetchUserDetails() {
  try {
    const response = await fetch(`${BASE_URL}/api/user-info`, {
      method: 'GET',
      credentials: 'include',
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