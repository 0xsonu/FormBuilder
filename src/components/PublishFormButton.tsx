import { MdOutlinePublish } from "react-icons/md";
import { Button } from "./ui/button";

export default function PublishFormButton() {
  return (
    <Button
      variant={"outline"}
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
    >
      <MdOutlinePublish className="h-6 w-6" /> Publish
    </Button>
  );
}
