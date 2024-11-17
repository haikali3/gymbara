export interface Exercise {
  name: string;
  working_sets: number;
}

export interface ExerciseCardProps {
  exercise: Exercise;
}

export interface WorkoutSections {
  id: number; //1,2,3
  name: string; //Full Body, Upper Body, Lower Body
  route: string; //full-body, upper-body, lower-body
}

export interface ExerciseList {
  id: number;
  name: string;
  // TODO: later refine this and remove all other fields
  warmup_sets: number;
  working_sets: number;
  reps: string;
  load: number;
  rpe: string;
  rest_time: string;
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

export interface UserDetails {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}
