"use client";
import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import SidebarOption from "../SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, doc) => {
        const roomData = doc.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: doc.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: doc.id,
            ...roomData,
          });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );

    console.log("herere", grouped);
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      <div className="flex py-6 flex-col space-y-6 md:max-w-48">
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {!loading && groupedData.owner.length === 0 && (
          <h2 className="text-white font-medium text-sm px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
            No documents found.
          </h2>
        )}

        {!loading && groupedData.owner.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-indigo-100 font-semibold text-sm px-2 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-indigo-400"></span>
              My Documents
            </h2>
            <div className="space-y-2">
              {groupedData.owner.map((doc) => (
                <SidebarOption
                  key={doc.id}
                  id={doc.id}
                  href={`/doc/${doc.id}`}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && groupedData.editor.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-indigo-100 font-semibold text-sm px-2 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-indigo-400"></span>
              Shared with Me
            </h2>
            <div className="space-y-2">
              {groupedData.editor.map((doc) => (
                <SidebarOption
                  key={doc.id}
                  id={doc.id}
                  href={`/doc/${doc.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="p-2 md:p-5 min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className="p-2 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
              size={40}
            />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
              <div className="mt-4">{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
