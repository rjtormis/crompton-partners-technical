"use client";
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
import { Property } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteListingDialog({
  selectedListings,
  setRefetch,
}: {
  selectedListings: Property[];
  setRefetch: Dispatch<SetStateAction<boolean>>;
}) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    setSubmitting(true);

    if (selectedListings.length > 1) {
      const ids = selectedListings.map((listing) => listing.id);
      const data = await fetch(`/api/dashboard/property`, {
        method: "DELETE",
        body: JSON.stringify({ ids: ids }),
      });

      // Handle success toast
      if (data.ok) {
        setSubmitting(false);
        toast.success(`Listings deleted successfully`, {
          description: <p className="text-black">Listings have been deleted successfully..</p>,
        });
        setRefetch(true);
        setOpen(false);
        router.refresh();
      }

      // Handle Error
      if (!data.ok) {
        toast.error(`An error occured.`, {
          description: <p className="text-black">An error occured, please try again.</p>,
        });
      }
    } else {
      const data = await fetch(`/api/dashboard/property/${selectedListings[0].id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: selectedListings[0].id }),
      });

      // Handle success toast
      if (data.ok) {
        setRefetch(true);

        setSubmitting(false);
        toast.success(`Listing ${selectedListings[0].name} deleted successfully`, {
          description: (
            <p className="text-black">Listing {selectedListings[0].name} updated successfully..</p>
          ),
        });
        setOpen(false);
        router.refresh();
      }

      // Handle Error
      if (!data.ok) {
        toast.error(`An error occured.`, {
          description: <p className="text-black">An error occured, please try again.</p>,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={selectedListings.length === 0}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash /> <span>Delete selected property</span>
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the selected property or
            listing and remove your data from our servers.
          </DialogDescription>
          <Button variant="destructive" disabled={submitting} onClick={handleDelete}>
            {submitting ? "Deleting..." : "Delete"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteListingDialog;
