"use client";
import React, { useState } from "react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import DesignerSidebar from "./DesignerSidebar";
import { cn } from "@/lib/utils";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "@/app/(dashboard)/hooks/useDesigner";
import { IdGenerator } from "@/lib/IdGenerator";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";

export default function Designer() {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerButtonElement =
        active.data.current?.isDesignerButtonElement;

      if (isDesignerButtonElement) {
        const type = active.data.current?.type as ElementsType;
        const newElement = FormElements[type as ElementsType].construct(
          IdGenerator()
        );
        addElement(0, newElement);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow flex-1 items-center justify-start overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/40"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element: FormElementInstance) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { removeElement } = useDesigner();
  const DesignerElement = FormElements[element.type].designerComponent;
  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: {
      type: element.type,
      id: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      type: element.type,
      id: element.id,
      isTopHalfDesignerElement: false,
    },
  });
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className={"absolute w-full h-1/2 rounded-t-md"}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className={cn("absolute w-full bottom-0 h-1/2 rounded-b-md")}
      ></div>
      {isHover && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant={"outline"}
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={() => removeElement(element.id)}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              click for properties or drag for move
            </p>
          </div>
        </>
      )}
      <div className="flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}
