import React from "react";

interface WorkoutSectionErrorProps {
  errorMessage: string;
  onRetry?: () => void;
}

const WorkoutSectionError: React.FC<WorkoutSectionErrorProps> = ({
  errorMessage,
  onRetry,
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-4">
      <div className="text-red-600 text-center mb-4">
        <p className="font-semibold">An error occurred</p>
        <p className="text-sm">{errorMessage}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none w-full"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default WorkoutSectionError;
