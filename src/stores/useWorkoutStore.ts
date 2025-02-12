import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware"; // Import persist middleware

type ExerciseData = {
  exercise_id: number;
  custom_reps?: number;
  custom_load?: number;
};

type WorkoutState = {
  section_id: number;
  user_email?: string;
  exercises: { [key: number]: ExerciseData[]};
  updateExercise: (exercise_id: number, updates: Partial<ExerciseData>) => void;
};

const storage: PersistStorage<WorkoutState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useWorkoutStore = create(
  persist<WorkoutState>(
    (set) => ({
      section_id: 1,
      user_email: "manfdvcl9@gmail.com",
      exercises: {},
      updateExercise: (exercise_id, updates) =>
        set((state) => ({
          exercises: {
            ...state.exercises,
            [exercise_id]: {
              ...(state.exercises[exercise_id] || { exercise_id }),
              ...updates,
            },
          },
        })),
    }),
    {
      name: "workout-storage",
      storage,
    }
  )
);