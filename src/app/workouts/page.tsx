"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/_layout/header";
import Footer from "@/components/_layout/footer";
import { fetchWorkoutSectionsWithExercises } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { WorkoutSections } from "../../types/type";
import WorkoutSectionLoading from "@/components/_workout-section-card/workout-section-card-skeleton";
import WorkoutSectionError from "@/components/_workout-section-card/workout-section-card-error";
import WorkoutSectionCard from "@/components/_workout-section-card/workout-section-card";
import { getErrorMessage } from "@/lib/utils";

export default function Workout() {
  const router = useRouter();
  const navigateToWorkout = (route: string) => {
    router.push(route);
  };

  const {
    data: workoutSectionsExercisesData,
    isLoading: workoutSectionsExercisesLoading,
    isError,
    error: workoutSectionsExercisesError,
    refetch: workoutSectionsExercisesRefetch,
  } = useQuery({
    queryKey: ["workoutSectionsWithExercises"],
    queryFn: () => fetchWorkoutSectionsWithExercises([1, 2, 3]),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col gap-2">
      <Header title={"workout"} />
      <main className="grid gap-2 w-full max-w-5xl grid-cols-1 sm:grid-cols-3">
        {/* Loading state */}
        {workoutSectionsExercisesLoading && (
          <>
            <WorkoutSectionLoading />
            <WorkoutSectionLoading />
          </>
        )}

        {/* Error state */}
        {isError && (
          <div className="col-span-full flex justify-center">
            <div className="max-w-md w-full">
              <WorkoutSectionError
                errorMessage={getErrorMessage(workoutSectionsExercisesError)}
                onRetry={workoutSectionsExercisesRefetch}
                statusCode={(workoutSectionsExercisesError as any)?.status}
              />
            </div>
          </div>
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
