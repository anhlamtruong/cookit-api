"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/services/firebase/storage";
import React from "react";

interface VideoUploaderProps {
  handleUpload: Function;
  value?: string;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  handleUpload: handleUploadVideo,
  value,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      handleUpload(file);
    }
  };
  const handleUpload = async (file: File) => {
    try {
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //TODO Show progress...
        },
        (error) => {
          toast.error(`Failed to upload file: ${error}`);
        },
        () => {
          // Get download URL when complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // updateUserInFirestore(downloadURL); // Update Firestore next
          });
        }
      );
      toast.success(
        "?????"
        // `File uploaded successfully. Server responded with: ${JSON.stringify(
        //   response
        // )}`
      );
    } catch (error) {
      toast.error(`Failed to upload file: ${error}`);
    }
  };
  return (
    <>
      <div className=" p-4 grid w-full max-w-sm items-center gap-1.5 ">
        <Label className="hover:cursor-pointer" htmlFor="video">
          Video
        </Label>
        <Input
          onChange={handleFileChange}
          className="hover:cursor-pointer"
          id="video"
          type="file"
        />
      </div>
    </>
  );
};
