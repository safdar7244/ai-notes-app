"use client";

import { Button } from "./button";
import { useTransition } from "react";
import { createNewDocument } from "../../../actions/actions";
import { useRouter } from "next/navigation";

function NewDocumentButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleCreateNewDocument() {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  }

  return (
    <Button
      onClick={handleCreateNewDocument}
      disabled={isPending}
      className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 
      text-white shadow-lg shadow-indigo-500/25 border-0 
      transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
      ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      <div className="flex items-center justify-center gap-2">
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            <span>Creating...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Create New Document</span>
          </>
        )}
      </div>
    </Button>
  );
}

export default NewDocumentButton;
