import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { Briefcase, PenBox, Heart } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Open modal if URL has ?signIn=true
  useEffect(() => {
    if (searchParams.get("signIn") === "true") {
      setShowSignIn(true);
    }
  }, [searchParams]);

  // Centralized close handler
  const closeSignIn = () => {
    setShowSignIn(false);
    setSearchParams({}); // ✅ clear query params
  };

  // ESC key + scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeSignIn();
      }
    };

    if (showSignIn) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [showSignIn]);

  return (
    <>
      <nav className="py-4 flex justify-between items-center container mx-auto px-6 relative z-10">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd logo" />
        </Link>

        <div className="flex gap-8 items-center">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => {
                setShowSignIn(true);
                setSearchParams({ signIn: "true" }); // optional sync
              }}
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
            <Link to="/post-job"></Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: "2.5rem", // Tailwind w-10 = 2.5rem
                    height: "2.5rem", // Tailwind h-10 = 2.5rem
                  },
                },
              }}
            >
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Jobs"
                labelIcon={<Briefcase size={16} />}
                href="/my-jobs"
              />
              <UserButton.Link
                label="Saved Jobs"
                labelIcon={<Heart size={16} />}
                href="/saved-jobs"
              />
            </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeSignIn}
          />

          {/* Clerk SignIn modal */}
          <div className="relative z-10">
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
