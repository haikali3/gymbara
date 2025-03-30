import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

interface WorkoutSectionErrorProps {
  errorMessage: string;
  statusCode: number;
  onRetry?: () => void;
}

const WorkoutSectionError: React.FC<WorkoutSectionErrorProps> = ({
  errorMessage,
  statusCode,
  onRetry,
}) => {
  const isUnauthorized = errorMessage.toLowerCase().includes("unauthorized");
  const router = useRouter();
  const handleGoHomeAndLogin = () => {
    router.push("/");
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-4">
      <div className="text-red-600 text-center mb-4">
        <p className="font-semibold">
          {statusCode ? `Error ${statusCode}: ` : ""}
          {isUnauthorized ? "Unauthorized" : "An error occurred"}
        </p>
        <p className="text-sm">{errorMessage}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-red-600 text-white hover:bg-red-700 focus:outline-none w-full"
          >
            <RotateCcw />
            Retry
          </Button>
        )}

        <Button asChild className="gap-2 w-full" onClick={handleGoHomeAndLogin}>
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default WorkoutSectionError;
