import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  if (!file) {
    return NextResponse.json({ message: "No Image Found", success: false });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "categories" }, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        })
        .end(buffer);
    });
    console.log(result.url, "uploaded image result");
    return new Response(
      JSON.stringify({ success: "Successful", url: result.url }),
      { status: 201 }
    );
  } catch (error) {
    return Response.json(error.message);
  }
}
