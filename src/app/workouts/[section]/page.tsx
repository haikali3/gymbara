"use client";

import { useParams } from "next/navigation";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDetails } from "@/types/type";
import { fetchWorkoutDetails } from "@/services/api";
import ExerciseCardSkeleton from "@/components/_exercise-card/exercise-card-skeleton";
import ExerciseCardError from "@/components/_exercise-card/exercise-card-error";
import ExerciseForm from "@/components/_exercise-card/exercise-form-card";
import { getErrorMessage } from "@/lib/utils";
import PageWrapper from "@/components/_layout/page-wrapper";

// TODO: mapping route names to section IDs
const sectionRouteToIdMap: Record<string, number> = {
  "full-body": 1,
  "upper-body": 2,
  "lower-body": 3,
};

export default function DynamicWorkoutPage() {
  const params = useParams();
  const sectionSlug = params.section as string;
  const sectionId = sectionRouteToIdMap[sectionSlug];

  const {
    data: exercises,
    isLoading: isExercisesLoading,
    isError, //boolean
    error: isExercisesError,
    refetch: refetchExercises,
  } = useQuery<ExerciseDetails[]>({
    queryKey: ["workoutSections", sectionId],
    queryFn: () => fetchWorkoutDetails(sectionId),
    enabled: !!sectionId, // only run query if valid section
  });

  return (
    <PageWrapper>
      <Header title={sectionSlug.replace("-", " ")} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {isExercisesLoading && <ExerciseCardSkeleton />}
        {isError && (
          <ExerciseCardError
            onRetry={refetchExercises}
            errorMessage={getErrorMessage(isExercisesError)}
            statusCode={(isExercisesError as any)?.status}
          />
        )}
        {exercises && <ExerciseForm exercises={{ data: exercises }} />}
      </div>
      <Footer />
    </PageWrapper>
  );
}
