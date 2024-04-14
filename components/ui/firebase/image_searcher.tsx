import axios from "axios";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { DotLoader } from "react-spinners";
import { Input } from "../input";
import { Label } from "../label";
import { cn } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../error";
import { Button } from "../button";
import { Trash } from "lucide-react";
interface ImageSearcherProps {
  onImageSelect: Function;
  onRemove: Function;
  value: string;
  disable: boolean;
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
}) => {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const pathname = usePathname();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { replace } = useRouter();
  const query = searchParams.get("q")?.toString() ?? "";
  const isPopoverOpen = searchParams.get("pop_over") === "true";

  // Debounce function to handle search query updates
  const debouncedSetQuery = debounce((query) => {
    setDebouncedQuery(query);
  }, 2000);

  // Update URL search params when debouncedQuery changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
      params.set("pop_over", "true");
    } else {
      params.delete("q");
      params.set("pop_over", "false");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, pathname, replace, searchParams]);

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
    <div className={cn(className)}>
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
      {value ? (
        <div className=" relative w-[200px] h-[200px] rounded-md overflow-hidden  flex mb-4 justify-center p-1 border-primary-foreground border ">
          <Image
            // style={{ display: "block" }}
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

      <div
        className={cn(
          `z-50 w-82 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 grid grid-cols-3 gap-1`,
          !isPopoverOpen ? "hidden" : "grid"
        )}
      >
        {inputValue != "" && !isLoading && !images ? (
          <div> Waiting 2s to fetch your images 🕐</div>
        ) : null}
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
                alt=""
                className="w-auto aspect-square overscroll-hidden hover:opacity-85"
                onClick={() => onImageSelect(image.largeImageURL)}
                width={100}
                height={100}
                style={{ cursor: "pointer" }}
              />
            ))
          : !isLoading ?? <div>There is no images found ㄟ( ▔, ▔ )ㄏ</div>}
      </div>
    </div>
  );
};

const ImageComponent = ({
  value,
  onRemove,
}: {
  value: string;
  onRemove: Function;
}) => {
  return (
    <div className=" mb-4 flex items-center gap-4">
      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
        <div className="z-10 absolute top-2 right-2">
          <Button
            type="button"
            onClick={() => onRemove()}
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
          src={value}
        ></Image>
      </div>
    </div>
  );
};
