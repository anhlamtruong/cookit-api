import {
  getDownloadURL,
  listAll,
  ref,
  storage,
} from "@/services/firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
export async function GET(req: NextRequest) {
  try {
    const iconsRef = ref(storage, "icons/");
    const listResult = await listAll(iconsRef);

    const iconURLs = await Promise.all(
      listResult.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        // Sanitize the SVG content (implementation would depend on how you fetch the SVG content)
        const response = await fetch(downloadURL);
        const svgContent = await response.text();
        const sanitizedSVG = DOMPurify.sanitize(svgContent);

        return { sanitizedSVG: sanitizedSVG, svgURL: downloadURL };
      })
    );

    return NextResponse.json(iconURLs);
  } catch (error) {
    console.log("[ICONS_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
