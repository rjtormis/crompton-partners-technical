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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function DeleteListingDialog({ ids, listing }: { ids: string[]; listing: Property }) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    setSubmitting(true);

    if (ids.length >= 1) {
      const res = await fetch(`/api/dashboard/property/${ids[0]}`, {
        method: "DELETE",
        body: JSON.stringify({ id: ids[0] }),
      });
      const data = await res.json();

      // Handle success toast
      if (data.ok) {
        setSubmitting(false);
        toast.success(`Listing ${listing.name} successfully`, {
          description: <p className="text-black">Listing {listing.name} updated successfully..</p>,
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
    } else {
      const res = await fetch(`/api/dashboard/property/${ids[0]}`, {
        method: "DELETE",
        body: JSON.stringify({ ids: ids }),
      });
      const data = await res.json();
      // Handle success toast
      if (data.ok) {
        setSubmitting(false);
        toast.success(`Listing ${listing.name} successfully`, {
          description: <p className="text-black">Listing {listing.name} updated successfully..</p>,
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
        <Button>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {ids.length >= 1
              ? "Are you sure that you want to delete multiple listings?"
              : `Are you sure that you want to delete listing ${listing.name}`}
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
          <Button variant="destructive" disabled={submitting}>
            {submitting ? "Deleting..." : "Delete"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteListingDialog;
