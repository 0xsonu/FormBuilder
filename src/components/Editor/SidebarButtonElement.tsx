import { useDraggable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { FormElement } from "./FormElements";
import { cn } from "@/lib/utils";

export default function SidebarButtonElement({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerButton;
  const draggable = useDraggable({
    id: `element-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "opacity-50"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
export function SidebarButtonElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerButton;

  return (
    <Button
      variant="outline"
      className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-grab")}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
