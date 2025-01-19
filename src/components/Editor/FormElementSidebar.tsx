import React from "react";
import SidebarButtonElement from "./SidebarButtonElement";
import { FormElements } from "./FormElements";

export default function FormElementSidebar() {
  return (
    <div>
      Elements
      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
}
