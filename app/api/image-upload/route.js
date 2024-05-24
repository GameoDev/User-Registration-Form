import { v2 as cloudinary } from "cloudinary";
// import { IncomingForm } from "formidable";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// export async function UPLOAD(req, res) {
//   if (req.method !== "POST") {
//     return Response.json("Please apply appropriate method");
//   }

//   //   const data = await req.formData();
//   //   const file = data.get("file");
//   //   //   const form = new IncomingForm();

//   //   try {
//   //     const uploadResult = await cloudinary.uploader.upload(file.filepath, {
//   //       public_id: "bag_model",
//   //       categorization: "google_tagging",
//   //       auto_tagging: 0.75,
//   //       overwrite: true,
//   //     });
//   //     console.log(uploadResult);
//   //   } catch (error) {
//   //     console.error(error);
//   //     return Response.json("Failed To Upload File");
//   //   }
//   // }

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Error parsing the form:", err);
//       return Response.json("Invalid Form Data");
//     }
//     try {
//       if (Array.isArray(imageFile) && imageFile.length > 0) {
//         const file = imageFile[0];
//         try {
//           const uploadResult = await cloudinary.uploader.upload(file.filepath, {
//             public_id: "bag_model",
//             categorization: "google_tagging",
//             auto_tagging: 0.75,
//             overwrite: true,
//           });
//           console.log(uploadResult);
//         } catch (error) {
//           return Response.json(error.message);
//         }
//       } else {
//         console.error("No files uploaded");
//         return Response.json("Please select a File For Uploading");
//       }
//     } catch (error) {
//       console.error(error);
//       return Response.json("Failed To Upload File");
//     }
//   });
// }

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  if (!file) {
    return NextResponse.json({ message: "No Image Found", success: false });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // console.log("uploaedd file : ", file);
    // const uploadResult = await cloudinary.uploader.upload_stream(buffer, {
    //   public_id: "bag_model",
    //   categorization: "google_tagging",
    //   auto_tagging: 0.75,
    //   overwrite: true,
    // });
    // return Response.json({
    //   data: uploadResult.url,
    //   success: true,
    // });

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

  //   const byteData = await file.arrayBuffer();
  //   const buffer = Buffer.from(byteData);
  //   const path = `./public/${file.name}`;
  //   await writeFile(path, buffer);
  //   return NextResponse.json({ message: "File Uploaded ", success: true });
}
