import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarButtonElementDragOverlay } from "./SidebarButtonElement";
import { ElementsType, FormElements } from "./FormElements";
import useDesigner from "@/app/(dashboard)/hooks/useDesigner";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();
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

  const isDesignerElement = draggedItem.data.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      overlay = <div>Element not found</div>;
    } else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      overlay = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{overlay}</DragOverlay>;
}
