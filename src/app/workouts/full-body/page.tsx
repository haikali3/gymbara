'use client'
import ExerciseCard from "@/components/exercise-card";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDetails } from "@/app/types/type";
import { fetchWorkoutDetails } from "@/utils/api";
import { Button } from "@/components/ui/button";
import ExerciseCardSkeleton from "@/components/exercise-card-skeleton";
import ExerciseCardError from "@/components/exercise-card-error";

function FullBodyWorkoutPage() {

  const { data, isLoading, isError, refetch } = useQuery<ExerciseDetails[]>({
    queryKey: ['workoutSections'],
    queryFn: () => fetchWorkoutDetails(1), //dynamic 1,2,3
  });

  console.log(isError);


  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <Header title={"full body"} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {isLoading && <ExerciseCardSkeleton />}
        {isError && <ExerciseCardError onRetry={refetch} />}
        {data?.map((exercise: ExerciseDetails, index: number) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
          />
        ))}
      </div>
      <div className="pt-2">
      </div>
      {/* TODO: Add submit function */}
      <Button>
        Finish Workout
      </Button>
      <Footer />
    </div >
  );
}

export default FullBodyWorkoutPage;