import React from "react";
import { TextFieldFormElement } from "../Fields/TextField";
import { IconType } from "react-icons/lib";

export type ElementsType = "TextField";
export type FormElementInstance = {
  id: string;
  type: ElementsType;
  properties?: Record<string, any>;
};

export type FormElement = {
  construct: (id: string) => FormElementInstance;
  type: ElementsType;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  designerButton: {
    label: string;
    icon: IconType;
  };
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};

export default function FormElementsComponent() {
  return <div>FormElements</div>;
}
