"use client";
import React from 'react';
import { Button } from '../ui/button';

interface ExerciseCardErrorProps {
  onRetry: () => void;
  errorMessage?: string;
}

const ExerciseCardError: React.FC<ExerciseCardErrorProps> = ({ onRetry, errorMessage }) => {
  return (
    <div className="bg-white border border-red-200 pt-2 rounded-lg shadow-sm w-full max-w-md mx-auto flex flex-col gap-2 sm:gap-6">
      <h2 className="text-base font-normal text-red-700 text-center">
        Error Loading Exercise
      </h2>
      <p className="text-sm text-red-600 text-center px-4">
        {errorMessage || "There was an issue loading the exercise data. Please try again."}
      </p>
      <div className="flex items-center justify-center w-full p-2">
        <Button
          onClick={onRetry}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default ExerciseCardError;
