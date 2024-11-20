"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";
import liveblocks from "@/lib/liveblocks";

export async function createNewDocument() {
  auth.protect();

  const { sessionClaims, redirectToSignIn } = await auth();

  if (!sessionClaims) {
    return redirectToSignIn();
  }

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Document",
    //ownerId: sessionClaims?.userId,
    createdAt: new Date(),
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email as string)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(docId: string) {
  auth.protect();

  const { sessionClaims, redirectToSignIn } = await auth();

  if (!sessionClaims) {
    return redirectToSignIn();
  }

  console.log("Deleting document", docId);

  try {
    await adminDb.collection("documents").doc(docId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", docId)
      .get();
    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    await liveblocks.deleteRoom(docId);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
