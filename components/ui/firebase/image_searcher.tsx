import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { debounce } from "lodash";
import { DotLoader } from "react-spinners";
import { Input } from "../input";
import { Label } from "../label";
import { cn } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../error";
import { Button } from "../button";
import { Trash, X } from "lucide-react";

interface ImageSearcherProps {
  onImageSelect: Function;
  onRemove: Function;
  value: string;
  disable: boolean;
  showSelectedImage: boolean;
  id?: string;
  className?: string;
}

export const ImageSearcher: FC<ImageSearcherProps> = ({
  onImageSelect,
  onRemove,
  value,
  id,
  disable,
  className,
  showSelectedImage = false,
}) => {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const pathname = usePathname();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { replace } = useRouter();
  const query = searchParams.get(`q-${id}`)?.toString() ?? "";

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Update state whenever the URL search parameters change
  useEffect(() => {
    setIsPopoverOpen(true);
  }, []);
  // Debounce function to handle search query updates
  const debouncedSetQuery = debounce((query) => {
    setDebouncedQuery(query);
  }, 2000);

  // Update URL search params when debouncedQuery changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery) {
      params.set(`q-${id}`, debouncedQuery);
      setIsPopoverOpen(true);
    } else {
      params.delete(`q-${id}`);
      setIsPopoverOpen(false);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, id, pathname, replace, searchParams]);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      debouncedSetQuery(inputValue);
    } else {
      setDebouncedQuery("");
    }
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [inputValue, debouncedSetQuery]);

  const fetchImages = async (query: string) => {
    if (query.trim() === "") {
      return;
    }
    const { data } = await axios.get<PixabayResponse | null>(
      "/api/image_search",
      {
        params: { query },
      }
    );
    return data?.hits;
  };
  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["images", query],
    queryFn: () => fetchImages(query),
    enabled: !!query,
  });

  return (
    <div className={cn(className, "relative")}>
      <Label htmlFor={id ?? ""}>Or Quick Search For Your Image</Label>
      <Input
        id={id ?? ""}
        type="text"
        value={inputValue}
        className="mb-4"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Search for images"
        disabled={isLoading || disable}
      />
      {inputValue != "" && !isLoading && !images ? (
        <div> Waiting 2s to fetch your images 🕐</div>
      ) : null}
      {value && showSelectedImage === true ? (
        <div className=" relative w-[200px] h-[200px] rounded-md overflow-hidden  flex mb-4 justify-center p-1 border-primary-foreground border ">
          <Image
            sizes="100"
            fill
            alt="Image"
            className=" object-cover"
            src={value}
          ></Image>
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={() => onRemove(value)}
              variant="destructive"
            >
              <Trash className=" h-4 w-4"></Trash>
            </Button>
          </div>
        </div>
      ) : null}

      <div className={cn(` absolute `, !isPopoverOpen ? "hidden" : "grid")}>
        <div className=" o relative z-50 w-auto h-auto rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 grid grid-cols-3 gap-1">
          {isLoading && (
            <DotLoader
              color="white"
              size={24}
              className="items-center"
            ></DotLoader>
          )}
          {error && <ErrorComponent message={error.message}></ErrorComponent>}
          {images
            ? images.map((image) => (
                <Image
                  key={image.id}
                  src={image.webformatURL}
                  alt={image.id.toString()}
                  priority={false}
                  loading="lazy"
                  className=" aspect-square overscroll-hidden hover:opacity-85"
                  onClick={() => onImageSelect(image.largeImageURL)}
                  width={100}
                  height={100}
                  style={{ cursor: "pointer" }}
                />
              ))
            : !isLoading ?? <div>There is no images found ㄟ( ▔, ▔ )ㄏ</div>}

          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const params = new URLSearchParams(searchParams);
                params.delete(`q-${id}`);
                setIsPopoverOpen(false);
                setInputValue("");
                replace(`${pathname}?${params.toString()}`);
              }}
              variant="destructive"
            >
              <X className=" h-4 w-4"></X>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
