"use client";

import { DesignerContext } from "@/components/context/DesignerContext";
import React, { useContext } from "react";

export default function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error(
      "useDesigner must be used within a DesignerContextProvider"
    );
  }
  return context;
}
