import { create } from "zustand";

type ExerciseData = {
  exercise_id: number;
  custom_reps?: number;
  custom_load?: number;
};

type WorkoutState = {
  section_id: number;
  user_email: string;
  exercises: ExerciseData[];
  updateExercise: (exercise_id: number, updates: Partial<ExerciseData>) => void;
  initializeExercises: (newExercises: ExerciseData[]) => void;
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  section_id: 1,
  user_email: "manfdvcl9@gmail.com",
  exercises: [],
  updateExercise: (exercise_id, updates) =>
    set((state) => {
      const updatedExercises = state.exercises.some((ex) => ex.exercise_id === exercise_id)
        ? state.exercises.map((ex) =>
            ex.exercise_id === exercise_id ? { ...ex, ...updates } : ex
          )
        : [...state.exercises, { exercise_id, ...updates }];

      return { exercises: updatedExercises };
    }),

  //init store with fetched exercises
  initializeExercises: (newExercises) => {
    const currentExercises = get().exercises;
    if (currentExercises.length === 0) {
      set({ exercises: newExercises });
    }
  }
}));
