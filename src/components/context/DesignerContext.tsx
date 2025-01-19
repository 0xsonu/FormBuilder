"use client";

import { createContext, ReactNode, useState } from "react";
import { FormElementInstance } from "../Editor/FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance): void => {
    setElements((prev) => {
      const newElem = [...prev];
      newElem.splice(index, 0, element);
      return newElem;
    });
  };

  return (
    <DesignerContext.Provider value={{ elements, addElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
