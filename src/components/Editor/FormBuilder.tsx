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
import useDesigner from "@/hooks/useDesigner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";

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

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-2xl">Share this Form</h2>
            <h3 className="text-xl text-muted-foreground pb-10 border-b">
              Anyone with the link can view and submit responses
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" value={shareUrl} readOnly />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Link Copied",
                    description:
                      "The form link has been copied to your clipboard",
                  });
                }}
              >
                Copy Link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <BsArrowLeft className="h-6 w-6" /> Go to Home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form Details <BsArrowRight className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                <PublishFormButton id={form.id} />
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
