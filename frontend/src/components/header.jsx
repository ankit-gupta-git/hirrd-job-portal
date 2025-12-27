import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center container mx-auto px-6 relative z-10">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd logo" />
        </Link>

        {/* <Button variant="outline">Login</Button> */}

         <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </nav>
    </>
  );
};

export default header;
