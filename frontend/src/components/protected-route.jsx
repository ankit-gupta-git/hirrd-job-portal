import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser(); // ✅ user added
  const location = useLocation();
  const pathname = location.pathname; // ✅ pathname defined

  // ⏳ Wait for Clerk
  if (!isLoaded) {
    return null; // or loader
  }

  // 🔒 Not signed in
  if (!isSignedIn) {
    return (
      <Navigate
        to="/?signIn=true"
        replace
        state={{ from: pathname }}
      />
    );
  }

  // 🧭 Signed in but role missing → onboarding
  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // ✅ All good
  return children;
};

export default ProtectedRoute;
