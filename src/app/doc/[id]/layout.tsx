import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params: { id },
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  auth.protect();

  const { sessionClaims, redirectToSignIn } = await auth();

  if (!sessionClaims) {
    return redirectToSignIn();
  }

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
