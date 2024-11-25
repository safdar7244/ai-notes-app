"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "../../actions/actions";
import { toast } from "sonner";

function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();

  async function handleDelete() {
    const roomId = pathName.split("/").pop();
    if (roomId) {
      startTransition(async () => {
        // Delete the document
        const { success } = await deleteDocument(roomId);

        if (success) {
          setIsOpen(false);
          router.replace("/");
          toast.success("Document deleted successfully");
        } else {
          toast.error("Failed to delete document");
        }
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 
            hover:to-rose-600 text-white border-0 shadow-lg shadow-red-500/25
            transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          variant="destructive"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gradient-to-b from-white to-red-50/50 backdrop-blur-sm border border-red-100/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-600 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Delete Document
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            This action cannot be undone. This will permanently delete the
            document and remove all collaborators.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 
              hover:to-rose-600 text-white border-0 shadow-md"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete Document"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDocument;
