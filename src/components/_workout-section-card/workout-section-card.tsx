import React from "react";
import { Button } from "../ui/button";
import { ExerciseList, WorkoutSections } from "@/types/type";
import { getErrorMessage } from "@/lib/utils";

interface WorkoutSectionProps {
  index: number;
  section: WorkoutSections;
  workoutListData?: ExerciseList[];
  workoutSectionsExercisesLoading: boolean;
  workoutSectionsExercisesError: unknown; // ✅ fix: this should match React Query's `error`
  navigateToWorkout: (route: string) => void;
}

const WorkoutSectionCard: React.FC<WorkoutSectionProps> = ({
  section,
  workoutListData,
  workoutSectionsExercisesLoading,
  workoutSectionsExercisesError,
  navigateToWorkout,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg p-4 flex flex-col ">
      <h3 className="text-lg font-semibold text-gray-800">
        {section.name} Workout
      </h3>
      <p className="text-sm text-gray-600">Day {section.id}</p>
      <ul className="my-2 text-sm text-gray-700 list-disc pl-4">
        {workoutSectionsExercisesLoading && (
          <>
            <li className="animate-pulse bg-gray-200 h-4 w-full rounded"></li>
            <li className="animate-pulse bg-gray-200 h-4 w-full rounded"></li>
            <li className="animate-pulse bg-gray-200 h-4 w-full rounded"></li>
          </>
        )}
        {!!workoutSectionsExercisesError && (
          <div className="text-red-600 text-sm">
            {getErrorMessage(workoutSectionsExercisesError)}
          </div>
        )}
        {!workoutSectionsExercisesLoading &&
          !workoutSectionsExercisesError &&
          Array.isArray(workoutListData) &&
          workoutListData.map((workoutList) => (
            <li key={workoutList.id}>{workoutList.name}</li>
          ))}
      </ul>
      <div className="mt-auto">
        <Button
          className="w-full"
          onClick={() => navigateToWorkout(`/workouts/${section.route}`)}
        >
          Start Exercise
        </Button>
      </div>
    </div>
  );
};

export default WorkoutSectionCard;
