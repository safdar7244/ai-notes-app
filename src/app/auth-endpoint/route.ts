import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

export async function POST(request: NextRequest) {
  auth.protect();
  const { sessionClaims, redirectToSignIn } = await auth();

  if (!sessionClaims) {
    return redirectToSignIn();
  }
  const { room } = await request.json();

  console.log("room", room);
  const session = liveblocks.prepareSession(sessionClaims?.email, {
    userInfo: {
      name: sessionClaims?.fullName,
      email: sessionClaims?.email,
      avatar: sessionClaims?.image,
    },
  });

  console.log("session", session);
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  }

  return NextResponse.json(
    { message: "You are not allowed to access this room" },
    { status: 403 }
  );
}
