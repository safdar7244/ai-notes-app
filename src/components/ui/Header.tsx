"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import BreadCrumbs from "./BreadCrumbs";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-lg backdrop-blur-sm bg-opacity-90 sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-[160px]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-lg">
            <span className="font-bold text-lg">N</span>
          </div>
          <span className="font-sans text-lg tracking-tight">NotesAI</span>
        </div>

        {/* User Section */}
        {user && (
          <h1 className="hidden md:flex items-center gap-2 font-sans">
            <span className="text-gray-300 font-normal">Welcome,</span>
            <span className="font-medium">{user?.firstName}</span>
          </h1>
        )}
      </div>

      {/* Breadcrumbs */}
      <div className="flex-1 mx-8">
        <BreadCrumbs />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 
              text-sm font-medium backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg"
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-3 bg-white/10 p-1.5 rounded-lg border border-white/10">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "hover:scale-105 transition-transform",
                  userButtonPopulator: "h-8 w-8",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
