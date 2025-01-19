"use client";

import { createContext, ReactNode, useState } from "react";
import { FormElementInstance } from "../Editor/FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
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

  const removeElement = (id: string): void => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <DesignerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
