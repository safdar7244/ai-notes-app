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
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { inviteUser } from "../../actions/actions";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  //const router = useRouter();
  const [email, setEmail] = useState("");

  async function handleInvite() {
    const roomId = pathName.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      const { success } = await inviteUser(roomId, email);

      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User Added Successfully!");
      } else {
        toast.error("Failed to add user.");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 
            hover:to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25
            transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          variant="secondary"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Invite
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gradient-to-b from-white to-indigo-50/50 backdrop-blur-sm border border-indigo-100/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Invite a User to collaborate!
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Enter the email of the user you want to invite to collaborate.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleInvite();
            }}
          >
            <Input
              type="email"
              placeholder="colleague@example.com"
              className="flex-1 border-indigo-100 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
                bg-white/70 backdrop-blur-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 
                hover:to-teal-600 text-white border-0 shadow-md"
              type="submit"
              disabled={!email || isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  Inviting...
                </span>
              ) : (
                "Invite"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
