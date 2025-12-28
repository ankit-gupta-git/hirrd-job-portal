import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (role) => {
    navigate(role === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    try {
      await user.update({ unsafeMetadata: { role } });
      navigateUser(role);
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  // Redirect only AFTER user is fully loaded
  useEffect(() => {
    if (!isLoaded) return;

    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [isLoaded, user]);

  // Loader while Clerk is loading
  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2
        className="font-extrabold text-7xl sm:text-8xl tracking-tighter
  bg-gradient-to-r from-gray-400 to-white
  bg-clip-text text-transparent"
      >
        I am a...
      </h2>

      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>

        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
