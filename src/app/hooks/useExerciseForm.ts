import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workoutSchema, WorkoutFormValues } from "@/schema/workoutSchema";
import { ExerciseDetails } from "@/types/type";
import { useWorkoutStore } from "@/stores/useWorkoutStore";
import { submitUserExerciseDetails } from "@/services/workoutService";
import { useToast } from "@/app/hooks/use-toast";

export function useExerciseForm(exercises: ExerciseDetails[]) {
  const { toast } = useToast();
  
  // Compute default values using the passed-in exercises data
  const defaultValues: WorkoutFormValues = {
    exercises: exercises.map((ex) => ({
      exercise_id: ex.id,
      custom_reps: 10,
      custom_load: 10,
    })),
  };

  // Initialize the form with our schema and default values
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues,
  });

  const onSubmit = async (values: WorkoutFormValues) => {
    try {
      const result = await submitUserExerciseDetails(1, values.exercises);
      console.log("Workout submitted successfully:", result);
      
      toast({
        title: "Success!",
        description: "Your workout has been submitted successfully.",
        variant: "default",
      });
      
      return { success: true, data: result };
    } catch (error) {
      console.error("Error submitting workout:", error);
      
      toast({
        title: "Error",
        description: "Failed to save your workout. Please try again.",
        variant: "destructive",
      });
      
      return { success: false, error };
    }
  };

  const handleResetWorkout = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
    }
    
    // Reset the form to its default values
    form.reset(defaultValues);
    
    // Clear persisted state from storage and reset the in-memory state
    useWorkoutStore.persist.clearStorage();
    useWorkoutStore.setState({
      section_id: 1,
      exercises: {},
    });
    
    toast({
      title: "Workout Reset",
      description: "Your workout has been reset to default values.",
      variant: "default",
    });
  };

  return {
    form,
    onSubmit,
    handleResetWorkout,
    defaultValues,
  };
} 