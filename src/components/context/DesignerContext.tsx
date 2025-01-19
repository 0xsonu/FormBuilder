"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { FormElementInstance } from "../Editor/FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

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

  const updateElement = (id: string, element: FormElementInstance): void => {
    setElements((prev) => {
      const newElem = [...prev];
      const index = newElem.findIndex((el) => el.id === id);
      if (index === -1) return prev;
      newElem[index] = element;
      return newElem;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        updateElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
