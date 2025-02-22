"use client";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import { Upload } from "lucide-react";
import { FormikProps } from "formik";

interface FileUploadProps {
  setFiles: Dispatch<SetStateAction<string[]>>;
  form: FormikProps<unknown>;
}
function FileUpload({ setFiles, form }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && acceptedFiles.length <= 5) {
        const converted = acceptedFiles.map((file) => URL.createObjectURL(file));
        setFiles(converted);
        form.setFieldValue("images", acceptedFiles);
      } else {
        form.setFieldError("images", "Atleast 5 images");
      }
    },
    [setFiles, form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 5,
  });

  return (
    <div {...getRootProps()} className="border p-3 rounded-lg hover:cursor-pointer">
      <Input {...getInputProps()} id="images" />

      <div>
        <Upload className="mx-auto my-1" />
        <p className="text-center">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>
    </div>
  );
}

export default FileUpload;
