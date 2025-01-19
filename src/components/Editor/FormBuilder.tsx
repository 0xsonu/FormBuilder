"use client";

import { Form } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { MdOutlinePublish, MdPreview } from "react-icons/md";
import { HiSaveAs } from "react-icons/hi";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

interface FormBuilderProps {
  form: Form;
}

export default function FormBuilder({ form }: FormBuilderProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      tolerance: 5,
      delay: 250,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
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
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
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
