"use client";
import axios from "axios";
import React, { useRef, useState } from "react";

export default function UploadMulitple() {
  const [progress, setProgress] = useState(0);

  let _formData = new FormData();
  let formData = new FormData();
  const handleFiles = async (e) => {
    e.preventDefault();
    try {
      for (const element of e.target.elements) {
        if (element.name != "image") {
          if (element.name == "price") {
            formData[element.name] = Number(element.value);
          } else formData[element.name] = element.value;
        }
      }

      const fileInput = document.querySelector("#image");
      const files = fileInput.files;
      let i = 0;
      for (i = 0; i < files.length; i++) {
        _formData.set("file" + i, files[i]);
      }
      _formData.set("count", i);

      UploadFiles(_formData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const UploadFiles = async (_data) => {
    try {
      let parentBar = document.querySelector("#parentBar");
      const uploadResult = await axios.post(
        "http://localhost:3000/api/upload-multiple",
        _data,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percentage = Math.floor((loaded * 100) / total);
            parentBar.className =
              "justify-center mt-3 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 visible";
            setProgress(percentage);
          },
        }
      );

      let originalArray = JSON.stringify(uploadResult.data);

      formData["avatar"] = originalArray;
      formData["published"] = true;
      SubmitData(formData);
      // console.log(typeof originalArray, " ------ ", originalArray);
      // originalArray = originalArray.split(",");
    } catch (error) {
      console.log("e: ", error);
    }
  };

  const SubmitData = async (_data) => {
    console.log(_data);
    const response = await fetch("http://localhost:3000/api/add-post", {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      let parentBar = document.querySelector("#parentBar");
      parentBar.className =
        "justify-center mt-3 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 invisible";
    }
    console.log(response, "Api reponse");
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div
        id="parentNode"
        className="min-h-screen  bg-gray-100 flex flex-col justify-center py-12 content-center px-6 lg:px-8"
      >
        <div className="min-h-screen  bg-gray-100 flex flex-col justify-center py-12 content-center px-6 lg:px-8">
          <h1 className="text-black self-center font-semibold text-4xl font-sans">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Italian Trulli"
              className="mx-auto h-[100px] w-auto py-[8px] my-9"
            />
            Add a New Product
          </h1>
          <div className="py-6 mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:px-8 rounded-lg self-center min-w-1 bg-white">
            <form onSubmit={handleFiles}>
              <label htmlFor="full_name">
                <b className="text-black font-semibold text-sm">Title</b>
              </label>
              <br />
              <input
                type="text"
                placeholder="Product Title"
                name="title"
                required
                className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
              />
              <label htmlFor="price">
                <b className="text-black font-semibold text-sm">Price</b>
              </label>
              <br />
              <input
                type="text"
                placeholder="Price"
                name="price"
                required
                className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
              />
              <label htmlFor="email">
                <b className="text-black font-semibold text-sm">Description</b>
              </label>
              <br />
              <textarea
                id="title-description"
                name="description"
                rows="4"
                cols="50"
                placeholder="Product Description"
                className="my-2 py-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
              ></textarea>
              <br />

              <label htmlFor="email">
                <b className="text-black font-semibold text-sm">
                  Select Multiple Images
                </b>
              </label>
              <br />
              <input
                type="file"
                id="image"
                name="image"
                className="my-2 text-black"
                multiple
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
            <div
              id="parentBar"
              className="justify-center mt-3 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 w-full invisible"
            >
              {/* <div id="bar" class="bg-blue-600 h-2.5 rounded-full w-0"></div> */}
              <div
                style={{
                  backgroundColor: "#2563eb", // bg-blue-600
                  height: "0.625rem", // h-2.5 (2.5 * 0.25rem = 0.625rem)
                  borderRadius: "9999px", // rounded-full (sets border-radius to a large value)
                  width: `${progress}%`, // w-0
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
