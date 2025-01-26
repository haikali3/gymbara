"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/_layout/header";
import Footer from "@/components/_layout/footer";
import {
  fetchWorkoutList,
  fetchWorkoutSections,
  fetchWorkoutSectionsWithExercises,
} from "@/utils/services/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ExerciseList, WorkoutSections } from "../types/type";
import WorkoutSectionLoading from "@/components/_workout-section-card/workout-section-card-skeleton";
import WorkoutSectionError from "@/components/_workout-section-card/workout-section-card-error";
import WorkoutSectionCard from "@/components/_workout-section-card/workout-section-card";

export default function Workout() {
  const router = useRouter();
  const navigateToWorkout = (route: string) => {
    router.push(route);
  };

  const {
    data: workoutSectionsExercisesData,
    isLoading: workoutSectionsExercisesLoading,
    isError: workoutSectionsExercisesError,
    refetch: workoutSectionsExercisesRefetch,
  } = useQuery({
    queryKey: ["workoutSectionsWithExercises"],
    queryFn: () => fetchWorkoutSectionsWithExercises([1, 2, 3]),
    //make queryFn dynamic later if workout has 3,4,5 days
  });

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col gap-2">
      <Header title={"workout"} />
      <main className="grid gap-2 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Loading state */}
        {workoutSectionsExercisesLoading && (
          <>
            <WorkoutSectionLoading />
            <WorkoutSectionLoading />
          </>
        )}

        {/* Error state */}
        {workoutSectionsExercisesError && (
          <WorkoutSectionError
            errorMessage="Failed to load workout sections. Please try again."
            onRetry={workoutSectionsExercisesRefetch}
          />
        )}

        {/* Success State */}
        {workoutSectionsExercisesData?.map(
          (section: WorkoutSections, index: number) => (
            <WorkoutSectionCard
              key={section.id}
              section={section}
              index={index}
              workoutListData={section.exercises}
              workoutSectionsExercisesLoading={workoutSectionsExercisesLoading}
              workoutSectionsExercisesError={workoutSectionsExercisesError}
              navigateToWorkout={navigateToWorkout}
            />
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
