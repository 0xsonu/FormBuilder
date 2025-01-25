import { MdOutlinePublish } from "react-icons/md";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

export default function PublishFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const publishForm = async () => {
    try {
      // Publish the form
      await PublishForm(id);

      toast({
        title: "Form Published",
        description: "Your form has been published successfully",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while publishing the form",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          <MdOutlinePublish className="h-6 w-6" /> Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to publish this form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be undone. After publishing, you will not be
            able to make any changes to the form. <br /> <br />
            <span className="font-medium">
              By publishing this form, you will make it available to the users
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
