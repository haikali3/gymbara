'use client'
import ExerciseCard from "@/components/exercise-card";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDetails } from "@/app/types/type";



function FullBodyWorkoutPage() {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/workout-sections/details?workout_section_id=1`;

  const { data, isLoading, isError, isSuccess } = useQuery<ExerciseDetails[]>({
    queryKey: ['workoutSections'],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  // console.log(data[1].name);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <Header title={"full body"} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {data?.map((exercise: ExerciseDetails, index: number) => (
          <ExerciseCard
            key={index}
            exercise={{
              name: exercise.exercise_name, // Use "exercise_name" from API data
              working_sets: exercise.working_sets, // Use `working_sets` as `defaultSets`
            }}
          />
        ))}
      </div>
      <Footer />
    </div >
  );
}

export default FullBodyWorkoutPage;