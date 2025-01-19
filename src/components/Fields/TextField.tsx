"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../Editor/FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const properties = {
  label: "Text Field",
  helperText: "This is text field",
  required: false,
  placeHolder: "please write something",
};

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  formComponent: () => null,
  propertiesComponent: () => null,
  construct: (id: string): FormElementInstance => ({
    id,
    type,
    properties,
  }),
  designerButton: {
    label: "Text Field",
    icon: MdTextFields,
  },
};

type CustomInstance = FormElementInstance & {
  properties: typeof properties;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { placeHolder, label, required, helperText } = element.properties;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
