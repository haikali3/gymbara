
export interface Exercise {
  id: number;
  name: string;
  working_sets: number;
  custom_reps?: number;
  custom_load?: number;
}

export interface ExerciseCardProps {
  exercise: Exercise;
}

export interface WorkoutSections {
  id: number; //1,2,3
  name: string; //Full Body, Upper Body, Lower Body
  route: string; //full-body, upper-body, lower-body
  exercises: ExerciseList[];
}

export interface ExerciseList {
  id: number;
  name: string;
  warmup_sets: number;
  working_sets: number;
  reps: string;
  load: number;
  rpe: string;
  rest_time: string;
}

export interface ExerciseDetails extends ExerciseList {
  exercise_id: number;
  custom_reps: number; 
  custom_load: number; 
}
export interface UserDetails {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  is_premium: boolean; 
}

export interface SubmittedExercise {
  exercise_id: number;
  reps: number;
  load: number;
  submitted_at: string;
}

export interface SubmittedWorkoutResponse {
  user_workout_id: number;
  inserted_exercises: SubmittedExercise[];
}