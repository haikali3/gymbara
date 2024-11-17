"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/_layout/header";
import Footer from "@/components/_layout/footer";
import { fetchWorkoutList, fetchWorkoutSections } from "@/utils/services/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ExerciseList, WorkoutSections } from '../types/type';
import WorkoutSectionLoading from "@/components/_workout-section-card/workout-section-card-skeleton";
import WorkoutSectionError from "@/components/_workout-section-card/workout-section-card-error";
import WorkoutSectionCard from "@/components/_workout-section-card/workout-section-card";

export default function Workout() {
  const router = useRouter();
  const navigateToWorkout = (route: string) => {
    router.push(route);
  };

  const {
    data: workoutSectionsData,
    isLoading: workoutSectionsLoading,
    isError: workoutSectionsError,
    refetch: refetchWorkoutSections,
  } = useQuery<WorkoutSections[]>({
    queryKey: ["workoutSections"],
    queryFn: fetchWorkoutSections,
  });
  const {
    data: workoutListData,
    isLoading: workoutListLoading,
    isError: workoutListError,
  } = useQuery<ExerciseList[]>({
    queryKey: ["exerciseList", workoutSectionsData?.map(section => section.id)],
    queryFn: () => fetchWorkoutList(workoutSectionsData?.[0]?.id || 2), //TODO: make this dynamic and not only fetch 1st list
    enabled: !!workoutSectionsData,
  });

  // console.log({ sectiondata: workoutSectionsData, listdata: workoutListData});

  const workoutSectionId = workoutSectionsData?.map(section => section.id) || [];
  // console.log({ workoutSectionId: workoutSectionId });

  const workoutLists = useQueries({
  queries: workoutSectionId.map((workouSectionId) => ({
    queryKey: ["exerciseList", workouSectionId], // Unique key for each section
    queryFn: () => fetchWorkoutList(workouSectionId), // workoutsectionId = [1,2,3]
    enabled: !!workoutSectionsData, //not null and true
  })),
});

console.log(
  workoutLists.map(({ data, isLoading, isError }, index) => ({
    sectionId: workoutSectionId[index], // The ID of the workout section
    data, // The fetched data for this section
    isLoading, // Loading state for this section
    isError, // Error state for this section
  }))
);  

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col gap-2">
      <Header title={"workout"} />
      <main className="grid gap-2 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Loading state */}
        {workoutSectionsLoading && (
          <>
            <WorkoutSectionLoading />  
            <WorkoutSectionLoading />  
          </>
        )}
        
        {/* Error state */}
        {workoutSectionsError && (
          <WorkoutSectionError 
            errorMessage="Failed to load workout sections. Please try again."
            onRetry={refetchWorkoutSections}
          />
        )}
        
        {/* Success State */}
        {workoutSectionsData?.map((section: WorkoutSections, index: number) => (
          <WorkoutSectionCard
            key={section.id}
            section={section}
            index={index}
            workoutListData={workoutListData}
            workoutListLoading={workoutListLoading}
            workoutListError={workoutListError}
            navigateToWorkout={navigateToWorkout}
        />
        ))}
      </main>
      <Footer />
    </div>
  );
}
