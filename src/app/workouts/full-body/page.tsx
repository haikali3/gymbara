"use client";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDetails } from "@/app/types/type";
import { fetchWorkoutDetails } from "@/utils/services/api";
import ExerciseCardSkeleton from "@/components/_exercise-card/exercise-card-skeleton";
import ExerciseCardError from "@/components/_exercise-card/exercise-card-error";
import WorkoutForm from "@/components/_workout-form/workout-form-card";

export default function FullBodyWorkoutPage() {
  const { data, isLoading, isError, refetch } = useQuery<ExerciseDetails[]>({
    queryKey: ["workoutSections", 1],
    queryFn: () => fetchWorkoutDetails(1), //TODO: make it dynamic for 1,2,3
  });

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <Header title={"full body"} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {isLoading && <ExerciseCardSkeleton />}
        {isError && <ExerciseCardError onRetry={refetch} />}
        {data && <WorkoutForm exercises={data} />}
      </div>
      <div className="pt-2" />
      {/* make this sticky at the bottom of phone screen to improve UIUX */}
      <Footer />
    </div>
  );
}
