"use client";

import { Form } from "@prisma/client";
import React, { useEffect } from "react";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import PreviewDialogButton from "../PreviewDialogButton";
import PublishFormButton from "../PublishFormButton";
import SaveFormButton from "../SaveFormButton";
import useDesigner from "@/app/(dashboard)/hooks/useDesigner";

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

  const { setElements } = useDesigner();

  // load saved form
  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
  }, [form, setElements]);

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
                <SaveFormButton id={form.id} />
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
