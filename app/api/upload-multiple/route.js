import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req, res) {
  const data = await req.formData();
  const count = data.get("count");
  if (count <= 0) {
    return NextResponse.json({ message: bar, success: false });
  }

  let _urls = [];
  try {
    for (let i = 0; i < count; i++) {
      const file = data.get("file" + i);
      if (!file) {
        return NextResponse.json({ message: "No Image Found", success: false });
      }
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
      _urls.push(result.url);
    }
    return new Response(_urls);
  } catch (e) {
    return Response.json(e.message);
  }
}
