"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

interface ExerciseCardErrorProps {
  errorMessage: string;
  statusCode: number;
  onRetry?: () => void;
}

const ExerciseCardError: React.FC<ExerciseCardErrorProps> = ({
  errorMessage,
  statusCode,
  onRetry,
}) => {
  const isUnauthorized = errorMessage.toLowerCase().includes("unauthorized");

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
      <div className="text-red-600 text-center mb-4">
        <p className="font-semibold">
          {statusCode ? `Error ${statusCode}: ` : ""}
          {isUnauthorized ? "Unauthorized" : "Error Loading Exercise"}
        </p>
        <p className="text-sm">{errorMessage}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-red-600 text-white hover:bg-red-700 focus:outline-none w-full sm:w-auto"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        )}

        <Button asChild className="gap-2 w-full sm:w-auto">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ExerciseCardError;
