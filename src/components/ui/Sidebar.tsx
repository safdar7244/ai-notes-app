/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  //SheetDescription,
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

      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {loading && (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-6 w-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )}

        {!loading && groupedData.owner.length === 0 && (
          <h2
            className="text-gray-500 font-semibold
      text-sm"
          >
            No documents found.
          </h2>
        )}

        {!loading && groupedData.owner.length > 0 && (
          <>
            <h2
              className="text-gray-500 font-semibold
      text-sm"
            >
              My Documents
            </h2>
            {groupedData.owner.map((doc) => {
              return (
                <SidebarOption
                  key={doc.id}
                  id={doc.id}
                  href={`/doc/${doc.id}`}
                />
              );
            })}
          </>
        )}
      </div>

      {!loading && groupedData.owner.length > 0 && (
        <>
          <h2
            className="text-gray-500 font-semibold
      text-sm"
          >
            Shared with Me
          </h2>
          {groupedData.editor.map((doc) => {
            return (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            );
          })}
        </>
      )}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative ">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>

              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
