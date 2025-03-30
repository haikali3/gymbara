"use client";

import { useParams } from "next/navigation";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDetails } from "@/types/type";
import { fetchWorkoutDetails } from "@/utils/services/api";
import ExerciseCardSkeleton from "@/components/_exercise-card/exercise-card-skeleton";
import ExerciseCardError from "@/components/_exercise-card/exercise-card-error";
import ExerciseForm from "@/components/_exercise-card/exercise-form-card";

// Optional: mapping route names to section IDs
const sectionRouteToIdMap: Record<string, number> = {
  "full-body": 1,
  "upper-body": 2,
  "lower-body": 3,
};

export default function DynamicWorkoutPage() {
  const params = useParams();
  const sectionSlug = params.section as string;
  const sectionId = sectionRouteToIdMap[sectionSlug];

  const { data, isLoading, isError, refetch } = useQuery<ExerciseDetails[]>({
    queryKey: ["workoutSections", sectionId],
    queryFn: () => fetchWorkoutDetails(sectionId),
    enabled: !!sectionId, // only run query if valid section
  });

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <Header title={sectionSlug.replace("-", " ")} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {isLoading && <ExerciseCardSkeleton />}
        {isError && <ExerciseCardError onRetry={refetch} />}
        {data && <ExerciseForm exercises={data} />}
      </div>
      <Footer />
    </div>
  );
}
