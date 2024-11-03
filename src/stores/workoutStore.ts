// store/workoutStore.ts
import { create } from 'zustand';
import { WorkoutSectionList } from '../utils/types'; // Adjust the path as necessary

interface WorkoutStore {
  exercises: WorkoutSection[];
  loading: boolean;
  error: string | null;
  fetchWorkoutSectionsList: () => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  exercises: [],
  loading: false,
  error: null,
  fetchWorkoutSectionsList: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/workout-sections/list`); // Adjust the endpoint accordingly

      if (!response.ok) {
        throw new Error('Failed to fetch workout sections');
      }

      const data: WorkoutSection[] = await response.json();
      set({ exercises: data, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    }
  },
}));
