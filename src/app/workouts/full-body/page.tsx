'use client'
import ExerciseCard from "@/components/exercise-card";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDetails } from "@/app/types/type";
import { fetchWorkoutDetails } from "@/utils/api";



function FullBodyWorkoutPage() {

  const { data, isLoading, isError } = useQuery<ExerciseDetails[]>({
    queryKey: ['workoutSections'],
    queryFn: () => fetchWorkoutDetails(1),
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <Header title={"full body"} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {data?.map((exercise: ExerciseDetails, index: number) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
          />
        ))}
      </div>
      <Footer />
    </div >
  );
}

export default FullBodyWorkoutPage;