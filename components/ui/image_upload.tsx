"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <ImageComponentList onRemove={onRemove} value={value} />
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME_BILLBOARD}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlusIcon className=" h-4 w-4 mr-2"></ImagePlusIcon>
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

export const ImageComponentList = ({
  value,
  onRemove,
}: {
  value: string[];
  onRemove: Function;
}) => {
  return (
    <div className=" mb-4 flex items-center gap-4">
      {value.map((url) => (
        <div
          key={url}
          className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
        >
          {" "}
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={() => onRemove(url)}
              variant="destructive"
            >
              <Trash className=" h-4 w-4"></Trash>
            </Button>
          </div>
          <Image
            sizes="100"
            fill
            className=" object-cover"
            alt="Image"
            src={url}
          ></Image>
        </div>
      ))}
    </div>
  );
};
