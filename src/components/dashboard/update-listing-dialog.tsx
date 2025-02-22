"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Building, Pencil, Plus } from "lucide-react";
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

function UpdateListingDialog() {
  const [files, setFiles] = useState<string[]>([]);

  const initialValues = {
    name: "",
    description: "",
    price: "",
    type: "",
    bedroom: "",
    bathroom: "",
    status: "",
    location: "",
    images: [],
  };

  const handleCreateListing = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    console.log(values);
  };
  const handleRemoveFile = (file: string) => {
    URL.revokeObjectURL(file);
    const filteredFiles = files.filter((f) => f !== file);
    setFiles(filteredFiles);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Formik initialValues={initialValues} onSubmit={handleCreateListing}>
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
                      <Input id="price" type="string" {...field} />
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
                  {({ meta, form }: FieldProps) => (
                    <div className="space-y-1 my-2">
                      <div className="space-y-1">
                        <Label htmlFor="status">
                          Status
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Select onValueChange={(e) => form.setFieldValue("status", e)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                            <SelectItem value="sold">sold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </Field>
                <Field name="type">
                  {({ meta, form }: FieldProps) => (
                    <div className="space-y-1 my-2">
                      <div className="space-y-1">
                        <Label htmlFor="type">
                          Type
                          {meta.touched && meta.error ? (
                            <span className="text-red-500 ml-1">{meta.error}</span>
                          ) : null}
                        </Label>
                        <Select onValueChange={(e) => form.setFieldValue("type", e)}>
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
                          className="absolute right-1 text-xs"
                          onClick={() => handleRemoveFile(file)}
                        >
                          x
                        </button>
                        <Image
                          width={60}
                          height={60}
                          src={file}
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
              <Button type="submit" className="ml-auto">
                Create
              </Button>
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateListingDialog;
