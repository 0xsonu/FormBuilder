"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./Editor/FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "@/hooks/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";
import { sub } from "date-fns";

interface IFromSubmitProps {
  content: FormElementInstance[];
  formId: string;
}

export default function FormSubmitComponent({
  content,
  formId,
}: IFromSubmitProps) {
  const formValue = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    content.forEach((element) => {
      const actualValue = formValue.current[element.id] || "";
      const valid = FormElements[element.type].validate(element, actualValue);
      if (!valid) {
        formErrors.current[element.id] = true;
      }
    });
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValue.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const isValid = validateForm();
    if (!isValid) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Form Validation Error",
        description: "Please check the form for validation errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValue.current);

      await SubmitForm(formId, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }

    console.log("FormValues", formValue.current);
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col flex-grow gap-4 w-full bg-background p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form Already Submitted!</h1>
          <p className="text-muted-foreground">
            Thnak you for submitting the form. You can close this window now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col flex-grow gap-4 w-full bg-background p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValue.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {pending ? (
            <ImSpinner2 className="animate-spin" />
          ) : (
            <>
              <HiCursorClick className="mr-2" /> Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
