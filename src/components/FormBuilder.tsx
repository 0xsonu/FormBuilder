import { Form } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish, MdPreview } from "react-icons/md";
import { HiSaveAs } from "react-icons/hi";

interface FormBuilderProps {
  form: Form;
}

export default function FormBuilder({ form }: FormBuilderProps) {
  return (
    <main className="flex flex-col w-full">
      <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2"> Form: </span>{" "}
          {form.name}
        </h2>
        <div className="flex items-center gap-2">
          <PreviewDialogButton />
          {!form.published && (
            <>
              <SaveFormButton />
              <PublishFormButton />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function PreviewDialogButton() {
  return (
    <Button variant={"outline"} className="gap-2">
      <MdPreview className="h-6 w-6" /> Preview
    </Button>
  );
}
function SaveFormButton() {
  return (
    <Button variant={"outline"} className="gap-2">
      <HiSaveAs className="h-6 w-6" /> Save
    </Button>
  );
}
function PublishFormButton() {
  return (
    <Button
      variant={"outline"}
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
    >
      <MdOutlinePublish className="h-6 w-6" /> Publish
    </Button>
  );
}
