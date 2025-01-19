"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import DesignerSidebar from "./DesignerSidebar";

export default function Designer() {
  const droppable = useDroppable({
    id: "designer",
    data: {
      isDesignerDropArea: true,
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow flex-1 items-center justify-start overflow-y-auto">
          <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
            Drop here
          </p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
