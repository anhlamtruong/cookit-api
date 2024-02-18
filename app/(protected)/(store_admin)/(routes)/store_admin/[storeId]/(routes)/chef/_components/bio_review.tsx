"use client";

import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { TextRevealCard } from "@/components/ui/text_review_card";
import { useCurrentUser } from "@/hooks/authenticate/use_current_user";
import { useChef } from "@/hooks/store/useChef";

export const BioReview = () => {
  const { data: chefData } = useChef();
  const user = useCurrentUser();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TextRevealCard
        text={user?.name ?? "unknown"}
        revealText={chefData?.bio ?? "bio"}
        className=" w-full mb-4"
      ></TextRevealCard>
      <div className=" w-full grid grid-flow-row grid-cols-2 gap-4 items-center justify-center">
        {chefData?.profilePictures.map((image) => (
          <DirectionAwareHover key={image.id} imageUrl={image.url}>
            <p>{image.description}</p>
            <p>{image.createdAt.toString()}</p>
          </DirectionAwareHover>
        ))}
      </div>
    </div>
  );
};
