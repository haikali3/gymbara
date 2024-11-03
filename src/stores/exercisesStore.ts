import { create } from 'zustand';
import { ExerciseDetails } from "@/app/types/type";

interface ExercisesStore {
  exercises?: ExerciseDetails[];
  setExercises?: (exercises?: ExerciseDetails[]) => void;
}

const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/workout-sections/details?workout_section_id=1`;

export const useExercisesStore = create<ExercisesStore>((set) => ({
  exercises: undefined,
  setExercises: (exercises) => set({ exercises }),
}));

