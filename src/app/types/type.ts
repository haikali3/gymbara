export interface Exercise {
  name: string;
  working_sets: number;
}

export interface ExerciseCardProps {
  exercise: Exercise;
}

export interface ExerciseDetails {
  name: string;
  warmup_sets: number;
  working_sets: number;
  reps: string;
  load: number;
  rpe: string;
  rest_time: string;
}