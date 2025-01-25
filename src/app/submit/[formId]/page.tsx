import { GetFormContentById } from "@/actions/form";
import { FormElementInstance } from "@/components/Editor/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

export default async function SubmitPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  const form = await GetFormContentById(formId);
  if (!form) {
    return new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return <FormSubmitComponent content={formContent} formId={formId} />;
}
