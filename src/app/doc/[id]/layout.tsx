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

  return (
    <div className="bg-purple-200">
      {" "}
      <RoomProvider roomId={id}>{children}</RoomProvider>
    </div>
  );
}

export default DocLayout;
