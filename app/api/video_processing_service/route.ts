// import ffmpeg from "fluent-ffmpeg";
// import { NextApiRequest } from "next";
// import { NextResponse } from "next/server";
// export async function POST(
//   req: NextApiRequest

//   // { params }: { params: { storeId: string } }
// ) {
//   try {
//     // Get the path of the input video file from the request body
//     const { inputFilePath, outputFilePath } = req.body;

//     if (!inputFilePath || !outputFilePath) {
//       return new NextResponse("Bad Request: Missing file path", {
//         status: 400,
//       });
//     }
//     ffmpeg(inputFilePath)
//       .outputOption("-vf", "scale=-1:360")
//       .on("end", () => {
//         console.log("Processing finished successfully");
//         return new NextResponse("Processing finished successfully", {
//           status: 200,
//         });
//       })
//       .on("error", (err) => {
//         console.log("An error occurred: " + err.message);
//         return new NextResponse("API ERROR", {
//           status: 500,
//           statusText: "Internal Server Error",
//         } as ResponseInit);
//       })
//       .save(outputFilePath);
//   } catch (error) {
//     console.log("[VIDEO_PROCESS_POST]", error);
//     return new NextResponse("API ERROR", {
//       status: 500,
//       statusText: "Internal Server Error",
//     } as ResponseInit);
//   }
// }
