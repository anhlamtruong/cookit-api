"use client";

import { GlassesIcon, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChefModal } from "@/components/modals/chef_modal";
import Link from "next/link";
import { BioReview } from "./bio_review";

export const ChefClient = () => {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("isPreview");

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Chef`}
          description="Manage chef information for your store"
        />
        <Link
          key={"chef"}
          href={`?isPreview=${isPreview === "true" ? "false" : "true"}`}
        >
          <Button>
            {isPreview === "true" ? (
              <PencilRuler className=" mr-2 h-4 w-4"></PencilRuler>
            ) : (
              <GlassesIcon className=" mr-2 h-4 w-4" />
            )}

            {isPreview === "true" ? "Edit" : "Preview"}
          </Button>
        </Link>
      </div>
      <Separator />
      {isPreview === "true" ? <BioReview></BioReview> : <ChefModal></ChefModal>}
    </>
  );
};
