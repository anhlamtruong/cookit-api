import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { currentUser } from "@/lib/auth";
import { db } from "@/services/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export const updateUserInFirestore = async (downloadURL: string) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User is not authenticated");
    if (user.role === UserRole.USER) throw new Error("User is not authorized");

    const userDocRef = doc(db, "users", user?.id);

    await updateDoc(userDocRef, { videoUrl: downloadURL });
    toast.success("File updated successfully!");
  } catch (error) {
    toast.error(`Failed to update Firestore: ${error}`);
  }
};
