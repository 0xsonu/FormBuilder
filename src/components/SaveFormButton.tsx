import { HiSaveAs } from "react-icons/hi";
import { Button } from "./ui/button";
import useDesigner from "@/hooks/useDesigner";
import { SaveFormContent } from "@/actions/form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";

export default function SaveFormButton({ id }: { id: number }) {
  const { elements } = useDesigner();

  const [loading, startTransition] = useTransition();

  const saveFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await SaveFormContent(id, JsonElements);
      toast({
        title: "Form Saved",
        description: "Your form has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the form",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      onClick={() => {
        startTransition(saveFormContent);
      }}
    >
      <HiSaveAs className="h-6 w-6" /> Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}
