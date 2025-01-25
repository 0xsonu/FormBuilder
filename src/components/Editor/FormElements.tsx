import React from "react";
import { TextFieldFormElement } from "../Fields/TextField";
import { IconType } from "react-icons/lib";

export type ElementsType = "TextField";
export type SubmitFunction = (key: string, value: string) => void;
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
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
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
