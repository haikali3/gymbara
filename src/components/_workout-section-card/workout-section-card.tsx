import React from "react";
import { Button } from "../ui/button";
import { ExerciseList, WorkoutSections } from "@/app/types/type";

interface WorkoutSectionProps {
  index: number;
  section: WorkoutSections;
  workoutListData?: ExerciseList[];
  workoutListLoading: boolean;
  workoutListError: boolean;
  navigateToWorkout: (route: string) => void;
}

const WorkoutSectionCard: React.FC<WorkoutSectionProps> = ({
  section,
  workoutListData,
  workoutListLoading,
  workoutListError,
  navigateToWorkout,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg p-4">
    <h3 className="text-lg font-semibold text-gray-800">{section.name} Workout</h3>
    <p className="text-sm text-gray-600">Day {section.id}</p>
    <ul className="my-2 text-sm text-gray-700 list-disc pl-4">
      {workoutListLoading && (
        <>
          <li className="animate-pulse bg-gray-200 h-4 w-full rounded"></li>
          <li className="animate-pulse bg-gray-200 h-4 w-full rounded"></li>
          <li className="animate-pulse bg-gray-200 h-4 w-full rounded"></li>
        </>
      )}
      {workoutListError && (
        <div className="text-red-600 text-sm">Error loading workout list.</div>
      )}
      {Array.isArray(workoutListData) &&
        workoutListData.map((workoutList) => ( //! later fix unique key
          <li key={workoutList.id}>{workoutList.name}</li>
        ))}
    </ul>
    <Button
      className="w-full"
      onClick={() => navigateToWorkout(`/workouts/${section.route}`)}
    >
      Start Exercise
    </Button>
  </div>
  );
};

export default WorkoutSectionCard;
