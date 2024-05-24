"use client";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [file, setFile] = useState();
  const handleFileChange = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("file", file);
      // formData.append("upload_preset", "r7j9hqkt");
      const uploadResult = await fetch(
        "http://localhost:3000/api/image-upload",
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("file" + uploadResult);
    } catch (error) {
      console.log("e: ", error);
    }
  };

  // try {
    // const response = await axios.post(
    //   "https://api.cloudinary.com/v1_1/dw6zicb5w/image/upload",
    //   formData
    // );
  //   console.log(response.url);
  // } catch (error) {
  //   console.error(error.message);
  // }
  //handleImageUpload(formData);

  const handleImageUpload = async (_data) => {
    console.log(_data);
    const response = await fetch("http://localhost:3000/api/image-upload", {
      method: "POST",
      body: _data,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const data = await response.json();
    console.log(data.url);
  };

  return (
    <>
      <div className="min-h-screen  bg-gray-100 flex flex-col justify-center py-12 content-center px-6 lg:px-8">
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Italian Trulli"
          className="mx-auto h-[100px] w-auto py-[8px] my-9"
        />
        <h1 className="text-black self-center font-semibold text-4xl font-sans">
          Create a New Post
        </h1>
        <div className="py-6 mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:px-8 rounded-lg self-center min-w-1 bg-white">
          <form onSubmit={handleFileChange}>
            <label htmlFor="full_name">
              <b className="text-black font-semibold text-sm">Title</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Product Title"
              name="Name"
              required
              value="123344"
              className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <label htmlFor="email">
              <b className="text-black font-semibold text-sm">Description</b>
            </label>
            <br />
            <textarea
              id="title-description"
              name="title-description"
              rows="4"
              cols="50"
              placeholder="Product Description"
              className="my-2 py-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
              value="123344"
            ></textarea>
            <br />

            <label htmlFor="email">
              <b className="text-black font-semibold text-sm">Select Image</b>
            </label>
            <br />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="my-2 text-black"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
            <br />

            <div className="clearfix">
              <button
                type="submit"
                className="mt-4 rounded-md my-2 px-2 w-96 h-12 text-white font-semibold bg-blue-700"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
