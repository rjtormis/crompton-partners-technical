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
import { Pencil } from "lucide-react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import FileUpload from "../file-upload";
import { Textarea } from "../ui/textarea";
import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function UpdateListingDialog({ listing }: { listing: Property }) {
  const [files, setFiles] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  console.log(files);

  const initialValues = {
    name: listing.name,
    description: listing.description,
    price: listing.price,
    type: listing.type,
    bedroom: listing.bedroom,
    bathroom: listing.bathroom,
    status: listing.status,
    location: listing.location,
    images: [],
  };

  const handleUpdateListing = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append("id", listing.id);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("type", values.type);
    formData.append("bedroom", String(values.bedroom));
    formData.append("bathroom", String(values.bathroom));
    formData.append("status", values.status);

    const photoData = await fetch(`https://photon.komoot.io/api/?q=${values.location}&limit=1`);
    const pd = await photoData.json();

    formData.append("location", values.location);
    formData.append("lat", pd.features[0].geometry.coordinates[0]);
    formData.append("lng", pd.features[0].geometry.coordinates[1]);
    values.images.map((i) => {
      formData.append("images", i);
    });

    const data = await fetch(`/api/dashboard/property/${listing.id}`, {
      method: "PATCH",
      body: formData,
    });

    // Handle success toast
    if (data.ok) {
      setSubmitting(false);
      toast.success("Listing updated successfully", {
        description: <p className="text-black">Listing {values.name} updated successfully..</p>,
      });
      actions.resetForm();
      setOpen(false);
      router.refresh();
    }

    if (!data.ok) {
      toast.error(`An error occured.`, {
        description: <p className="text-black">An error occured, please try again.</p>,
      });
    }
  };

  const handleRemoveFile = (file: string) => {
    URL.revokeObjectURL(file);
    const filteredFiles = files.filter((f) => f !== file);
    setFiles(filteredFiles);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleUpdateListing}>
          <Form>
            <DialogHeader>
              <DialogTitle className="flex gap-2">
                <Pencil />
                <span className="my-auto">Update Listing</span>
              </DialogTitle>
              <DialogDescription>
                Update property details, upload images, and set availability status.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <Label htmlFor="name">
                        Name
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <Input id="name" type="string" {...field} />
                    </div>
                  </div>
                )}
              </Field>
              <Field name="location">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1 my-2">
                    <div className="space-y-1">
                      <Label htmlFor="location">
                        Location
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <Input id="location" type="string" {...field} />
                    </div>
                  </div>
                )}
              </Field>
              <Field name="price">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1 my-2">
                    <div className="space-y-1">
                      <Label htmlFor="price">
                        Price
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <Input id="price" type="number" {...field} />
                    </div>
                  </div>
                )}
              </Field>

              <Field name="description">
                {({ field, meta }: FieldProps) => (
                  <div className="space-y-1 my-2">
                    <div className="space-y-1">
                      <Label htmlFor="description">
                        Description
                        {meta.touched && meta.error ? (
                          <span className="text-red-500 ml-1">{meta.error}</span>
                        ) : null}
                      </Label>
                      <Textarea id="description" {...field} />
                    </div>
                  </div>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field name="bedroom">
                  {({ field, meta }: FieldProps) => (
                    <div className="space-y-1 my-2">
                      <div className="space-y-1">
                        <Label htmlFor="bedroom">
                          Bedroom
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Input id="bedroom" type="number" {...field} />
                      </div>
                    </div>
                  )}
                </Field>
                <Field name="bathroom">
                  {({ field, meta }: FieldProps) => (
                    <div className="space-y-1 my-2">
                      <div className="space-y-1">
                        <Label htmlFor="bathroom">
                          Bathroom
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Input id="bathroom" type="number" {...field} />
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field name="status">
                  {({ field, meta, form }: FieldProps) => (
                    <div className="space-y-1 my-2">
                      <div className="space-y-1">
                        <Label htmlFor="status">
                          Status
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Select
                          value={field.value}
                          onValueChange={(e) => form.setFieldValue("status", e)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </Field>
                <Field name="type">
                  {({ field, meta, form }: FieldProps) => (
                    <div className="space-y-1 my-2">
                      <div className="space-y-1">
                        <Label htmlFor="type">
                          Type
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Select
                          value={field.value}
                          onValueChange={(e) => form.setFieldValue("type", e)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="room">Room</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              {files.length < 5 ? (
                <Field name="images">
                  {({ meta, form }: FieldProps) => {
                    return (
                      <div className="space-y-1">
                        <div className="space-y-1">
                          <Label htmlFor="images">
                            Images
                            {meta.touched && meta.error ? (
                              <span className="text-red-500 ml-1">{meta.error}</span>
                            ) : null}
                          </Label>
                          <FileUpload setFiles={setFiles} form={form} />
                        </div>
                      </div>
                    );
                  }}
                </Field>
              ) : null}

              {files.length > 0 ? (
                <div>
                  <Label htmlFor="preview">Preview</Label>
                  <div className="flex gap-2">
                    {files.map((file, index) => (
                      <div className="relative" key={index}>
                        <button
                          type="button"
                          className="absolute right-1 text-xs"
                          onClick={() => handleRemoveFile(file)}
                        >
                          x
                        </button>
                        {/* <Image
                          width={60}
                          height={60}
                          src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${file}`}
                          alt="sample"
                          className=" rounded-xl"
                        /> */}
                        <Image
                          width={60}
                          height={60}
                          src={`${file}`}
                          alt="sample"
                          className=" rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex my-4">
              <Button type="submit" className="ml-auto" disabled={submitting}>
                {submitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateListingDialog;
