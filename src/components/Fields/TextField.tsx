"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../Editor/FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent: () => <div>Hello</div>,
  formComponent: () => null,
  propertiesComponent: () => null,
  construct: (id: string): FormElementInstance => ({
    id,
    type,
    properties: {
      label: "Text Field",
      helperText: "",
      required: false,
      placeHolder: "",
    },
  }),
  designerButton: {
    label: "Text Field",
    icon: MdTextFields,
  },
};
