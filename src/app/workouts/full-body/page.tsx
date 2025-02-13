"use client";
import ExerciseCard from "@/components/_exercise-card/exercise-card";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDetails } from "@/app/types/type";
import {
  fetchWorkoutDetails,
  submitUserExerciseDetails,
} from "@/utils/services/api";
import { Button } from "@/components/ui/button";
import ExerciseCardSkeleton from "@/components/_exercise-card/exercise-card-skeleton";
import ExerciseCardError from "@/components/_exercise-card/exercise-card-error";
import { useWorkoutStore } from "@/stores/useWorkoutStore";

export default function FullBodyWorkoutPage() {
  const { data, isLoading, isError, refetch } = useQuery<ExerciseDetails[]>({
    queryKey: ["workoutSections", 1],
    queryFn: () => fetchWorkoutDetails(1), //TODO: make it dynamic for 1,2,3
  });

  // why it doesnt submit to 10
  const handleSubmitWorkout = async () => {
    const { section_id, exercises } = useWorkoutStore.getState();
    const exerciseArray = Object.values(exercises).flat();

    try {
      const result = await submitUserExerciseDetails(section_id, exerciseArray);
      console.log("Workout submitted successfully: ", result);
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  const handleResetWorkout = () => {
    // clear persisted state from storage
    useWorkoutStore.persist.clearStorage();
    // reset in memory state to your initial values
    useWorkoutStore.setState({
      section_id: 1,
      exercises: {},
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <Header title={"full body"} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {isLoading && <ExerciseCardSkeleton />}
        {isError && <ExerciseCardError onRetry={refetch} />}
        {data?.map((exercise: ExerciseDetails, index: number) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
      <div className="pt-2" />
      <div className="flex justify-center">
        <div className="flex gap-2 max-w-md">
          <Button variant="outline" onClick={handleResetWorkout}>
            Clear Workout
          </Button>
          <Button onClick={handleSubmitWorkout}>Submit Workout</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
