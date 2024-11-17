import React from "react";

const WorkoutSectionSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="mt-4 h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
};

export default WorkoutSectionSkeleton;
