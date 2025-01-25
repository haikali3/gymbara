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
  if (!response.ok) throw new Error('Failed to fetch workout details');
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
