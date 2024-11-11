"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/_layout/header";
import Footer from "@/components/_layout/footer";
import { fetchWorkoutList, fetchWorkoutSections } from "@/utils/services/api";
import { useQuery } from "@tanstack/react-query";
import { ExerciseList, WorkoutSections } from '../types/type';
import { Button } from "@/components/ui/button";

export default function Workout() {
  const router = useRouter();
  const navigateToWorkout = (route: string) => {
    router.push(route);
  };

  const {
    data: workoutSectionsData,
    isLoading: workouSectionsLoading,
    isError: workoutSectionsError,
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
    queryFn: () => fetchWorkoutList(workoutSectionsData?.[0]?.id || 1),
    enabled: !!workoutSectionsData,
  });
  console.log(workoutListData)

  //TODO: Remove hard coded card and fetch the proper data from backend
  //TODO: Add a loading card
  //TODO: Add an error card
  //TODO: Add a retry button

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col gap-2">
      <Header title={"workout"} />
      <main className="grid gap-2 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {workouSectionsLoading && <div>Loading...</div>}
        {workoutSectionsError && <div>Error loading workout plans(i have a skill issue)</div>}
        {workoutSectionsData?.map((section: WorkoutSections, index: number) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg p-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">{section.name} Workout</h3>
            <p className="text-sm text-gray-600">Day {section.id}</p>
          {/* Display exercises if needed */}
          <ul className="my-2 text-sm text-gray-700 list-disc pl-4">
            {workoutListLoading && <div>Loading...</div>}
            {workoutListError && <div>Error loading workout list</div>}
            {Array.isArray(workoutListData) &&
              workoutListData
                .map((workoutList, i) => (
                  <li key={i}>{workoutList.name}</li>
                ))}
          </ul> 
          <Button 
            className="w-full"
            onClick={() => navigateToWorkout(`/workouts/${section.route}`)}
          >
            Start Exercise
          </Button>
          </div>
          // TODO add workout list
        ))}
      </main>
      <Footer />
    </div>
  );
}
