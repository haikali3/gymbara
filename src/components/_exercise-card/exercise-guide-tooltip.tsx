import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import { fetchExerciseGuide } from "@/services/workoutService";

interface ExerciseGuideTooltipProps {
  exerciseId: number;
}

export function ExerciseGuideTooltip({
  exerciseId,
}: ExerciseGuideTooltipProps) {
  const {
    data: guideData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exerciseGuide", exerciseId],
    queryFn: () => fetchExerciseGuide(exerciseId),
    retry: false, // Don't retry on failure
  });

  const renderTooltipContent = () => {
    if (isLoading) {
      return <Typography variant="small">Loading guide...</Typography>;
    }

    if (error) {
      const status = (error as Error & { status?: number }).status;
      if (status === 401) {
        return (
          <Typography variant="small">
            Please log in to view exercise guide
          </Typography>
        );
      }
      return (
        <Typography variant="small">Failed to load exercise guide</Typography>
      );
    }

    if (!guideData?.data) {
      return (
        <Typography variant="small">
          No guide available for this exercise
        </Typography>
      );
    }

    const { notes, substitutions } = guideData.data;

    return (
      <div className="space-y-2">
        {notes && (
          <div>
            <Typography variant="small" className="font-semibold">
              Notes:
            </Typography>
            <Typography variant="small">{notes}</Typography>
          </div>
        )}
        {substitutions && substitutions.length > 0 && (
          <div>
            <Typography variant="small" className="font-semibold">
              Substitutions:
            </Typography>
            <ul>
              {substitutions.map((sub: string, index: number) => (
                <li key={index}>
                  <Typography variant="small">{sub}</Typography>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="w-80 p-4">
          {renderTooltipContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
