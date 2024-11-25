"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { removeUserFromDocumnet } from "../../actions/actions";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";

function ManageUsers() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const isOwner = useOwner();
  const [isPending, startTransition] = useTransition();
  const room = useRoom();

  //const router = useRouter();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  async function handleDelete(userId: string) {
    if (!userId) return;

    startTransition(async () => {
      const { success } = await removeUserFromDocumnet(room.id, userId);
      if (success) {
        setIsOpen(false);
        toast.success("User Removed Successfully!");
      } else {
        toast.error("Failed to remove user.");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        asChild
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
        variant={"secondary"}
      >
        <DialogTrigger>
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Users ({usersInRoom?.docs.length})
          </span>
        </DialogTrigger>
      </Button>
      <DialogContent className="sm:max-w-[500px] shadow-2xl border-purple-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Users with Access
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Below is a list of users who have access to this document.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 border-t border-purple-100" />

        <div className="flex flex-col space-y-3">
          {usersInRoom?.docs.map((doc) => {
            const isCurrentUser =
              doc.data().userId === user.user?.emailAddresses[0].toString();
            return (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                key={doc.data().userId}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white font-medium">
                    {isCurrentUser
                      ? "You"
                      : doc.data().userId.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-medium text-gray-700">
                    {isCurrentUser ? "You" : doc.data().userId}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      doc.data().role === "owner"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {doc.data().role}
                  </span>

                  {isOwner && !isCurrentUser && (
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDelete(doc.data().userId)}
                      disabled={isPending}
                      className="hover:bg-red-600 transition-colors duration-200"
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Removing
                        </span>
                      ) : (
                        "Remove"
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageUsers;
