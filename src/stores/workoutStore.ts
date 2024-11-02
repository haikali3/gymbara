import { create } from 'zustand';
import { fetchWorkoutSections, fetchWorkoutList, fetchWorkoutDetails } from '../utils/api';

interface WorkoutSection {
  id: number;
  name: string;
}

interface WorkoutDetail {
  name: string;
  warmup_sets: number;
  working_sets: number;
  reps: string;
  load: number;
  rpe: string;
  rest_time: string;
}

interface WorkoutStore {
  workoutSections: WorkoutSection[];
  workoutList: WorkoutDetail[];
  workoutDetails: WorkoutDetail[];
  loading: boolean;
  error: string | null;

  fetchSections: () => Promise<void>;
  fetchList: (workoutSectionId: number) => Promise<void>;
  fetchDetails: (workoutSectionId: number) => Promise<void>;
}

const useTimerStore = create<WorkoutStore>((set) => ({
  workoutSections: [],
  workoutList: [],
  workoutDetails: [],
  loading: false,
  error: null,

  fetchSections: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkoutSections();
      set({ workoutSections: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchList: async (workoutSectionId: number) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkoutList(workoutSectionId);
      set({ workoutList: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchDetails: async (workoutSectionId: number) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkoutDetails(workoutSectionId);
      set({ workoutDetails: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useTimerStore;
