"use client";

import { useIcons } from "@/hooks/store/firebase/useIcons";
import { Button } from "../button";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { BeatLoader } from "react-spinners";
import { cn } from "@/lib/utils";

export const IconPickerFirebase = ({
  onIconSelect,
  id,
}: {
  onIconSelect: Function;
  id?: string;
}) => {
  const { data: icons, isLoading } = useIcons();
  const [isMounted, setIsMounted] = useState(false);

  const [selectedSVG, setSelectedSVG] = useState<SVGIcons | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleIconClick = (icon: SVGIcons) => {
    onIconSelect(icon.svgURL);
    // Assuming the retrieved 'url' contains raw SVG:
    setSelectedSVG(icon);
  };

  if (!isMounted) {
    return null;
  }

  return isLoading ? (
    <BeatLoader></BeatLoader>
  ) : icons ? (
    <>
      <Popover>
        <PopoverTrigger className="items-center flex" id={id}>
          {selectedSVG ? (
            <div
              className={cn(
                " self-center text-sm p-3 bg-light-backgroundTertiary rounded-full hover:bg-opacity-75"
              )}
              dangerouslySetInnerHTML={{ __html: selectedSVG.sanitizedSVG }}
            />
          ) : (
            <div
              className="self-center text-sm p-3 bg-light-textPrimary 
              text-light-backgroundPrimary rounded-full hover:bg-opacity-75"
            >
              Icon
            </div>
          )}
        </PopoverTrigger>

        <PopoverContent align="start" className=" w-auto">
          <div className=" h-128 md:h-64 w-auto grid grid-cols-3 md:grid-cols-5 gap-4 gap-x-4 overflow-auto overflow-y-auto">
            {icons.map((icon) => (
              <Button
                id={id}
                key={icon.svgURL}
                variant={"secondary"}
                size={"icon"}
                className=" rounded-full"
                onClick={() => handleIconClick(icon)}
              >
                <div dangerouslySetInnerHTML={{ __html: icon.sanitizedSVG! }} />
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  ) : (
    <div>Something went wrong with Icons Picker</div>
  );
};
