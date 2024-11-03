import ExerciseCard from "@/components/exercise-card";
import Header from "../../../components/_layout/header";
import Footer from "../../../components/_layout/footer";

interface Exercise {
  name: string;
  defaultSets: number;
}

async function FullBodyWorkoutPage() {
  const exercises: Exercise[] = [
    { name: "Incline Machine Press", defaultSets: 1 },
    { name: "Single-Leg Leg Press (Heavy)", defaultSets: 2 },
    { name: "Single-Leg Leg Press (Back off)", defaultSets: 1 },
    { name: "Pendlay Row", defaultSets: 3 },
    { name: "Glute-Ham Raise", defaultSets: 2 },
    { name: "Spider Curl", defaultSets: 2 },
    { name: "Cable Lateral Raise", defaultSets: 2 },
    { name: "Hanging Leg Raise", defaultSets: 2 },
  ];

  // const workoutSections = await fetchWorkoutSections();

  // const exercisesMock = workoutSections.map((section: Section[]) => ({
  //   name: section,
  //   defaultSets: 2, // Default value or fetch as per API structure
  // }));

  return (
    <div className="min-h-screen bg-gray-50 p-2 pt-4 pb-4 flex flex-col">
      <Header title={"full body"} />
      <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-1">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
      <Footer />
    </div >
  );
}

export default FullBodyWorkoutPage;