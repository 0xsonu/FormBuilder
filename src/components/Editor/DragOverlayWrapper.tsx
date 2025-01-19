import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarButtonElementDragOverlay } from "./SidebarButtonElement";
import { ElementsType, FormElements } from "./FormElements";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;
  let overlay = <div>Overlay</div>;
  const isSidebarButtonElement =
    draggedItem.data.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data.current?.type as ElementsType;
    overlay = (
      <SidebarButtonElementDragOverlay formElement={FormElements[type]} />
    );
  }

  return <DragOverlay>{overlay}</DragOverlay>;
}
