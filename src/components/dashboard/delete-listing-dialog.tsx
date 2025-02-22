import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

function DeleteListingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
          <Button variant="destructive">Delete</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteListingDialog;
