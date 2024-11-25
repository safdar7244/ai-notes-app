"use client";
import { use } from "react";
import Document from "@/components/Document";

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-purple-200">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;
