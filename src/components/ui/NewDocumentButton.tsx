"use client";

import { Button } from "./button";
import { useTransition } from "react";
import { createNewDocument } from "../../../actions/actions";
import { useRouter } from "next/navigation";

function NewDocumentButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleCreateNewDocument() {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  }

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating..." : "Create New Document"}
    </Button>
  );
}

export default NewDocumentButton;
