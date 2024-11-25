import LiveBlocksProvider from "@/components/LiveBlocksProvider";

function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-purple-200">
      <LiveBlocksProvider>{children}</LiveBlocksProvider>
    </div>
  );
}

export default PageLayout;
