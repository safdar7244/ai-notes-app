"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  function updateTitle(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        // Update the document title
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  }

  return (
    <div className="flex-1 min-h-screen ">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Title and Controls Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-100/20 p-4">
          <form
            className="flex flex-wrap gap-3 items-center"
            onSubmit={updateTitle}
          >
            <div className="flex-1 min-w-[200px]">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300
                  bg-white/70 backdrop-blur-sm text-gray-800 font-medium"
                placeholder="Document Title"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 
                  hover:to-purple-600 text-white shadow-md border-0 transition-all duration-200"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update"
                )}
              </Button>

              {isOwner && (
                <div className="flex items-center gap-2">
                  <InviteUser />
                  <DeleteDocument />
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Users Management Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-indigo-100/20">
          <ManageUsers />
        </div>

        {/* Editor Section */}
        <div className="bg-white rounded-xl shadow-lg border border-indigo-100/20 min-h-[500px]">
          <div className="p-6">
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Document;
