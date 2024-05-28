"use client";

import React, { useState, useEffect, useRef } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [link, setLink] = useState("");
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      const fetchData = async () => {
        try {
          console.log("Fetching data...");
          const response = await fetch("/api/load-products", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          let links = await data.avatar.split(",");

          let str = links[0];
          let newStr = str.slice(1); // Removes the first character
          links[0] = newStr;
          setLink(links[0]);

          for (let i = 0; i < links.length; i++) {
            let element = document.createElement("button");
            element.style.backgroundColor = "#04AA6D";
            element.style.width = "40px";
            element.style.height = "40px";
            element.style.marginTop = "4px";
            element.style.marginLeft = "35px";
            element.style.backgroundImage = `url(${links[i]})`;
            element.style.backgroundPosition = "center";
            var btnDiv = document.getElementById("btnContainer");
            btnDiv.appendChild(element);
            element.value = i;
            element.addEventListener("click", (e) => {
              console.log(e.target.value);
              setLink(links[e.target.value]);
            });
          }

          setData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <div
      id="parentNode"
      className="min-h-screen bg-gray-100 py-12 px-6 lg:px-8"
    >
      <div className="min-h-screen justify-center bg-gray-100 ml-6 justify-top py-5 lg:px-8">
        <div className="w-1/2 h-[600px] py-6 mt-8 rounded-lg justify-center flex min-w-1 bg-white">
          <div
            style={{
              backgroundImage: `url(${link})`,
              backgroundRepeat: "repeat",
              height: "400px",
              width: "400px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid black", // Added for visibility
            }}
            // className="w-1/2 h-[400px] py-6 mt-8 rounded-lg bg-slate-500"
          ></div>
        </div>
        <div
          id="btnContainer"
          className="w-1/2 h-[100px] py-6 mt-8 rounded-lg bg-slate-500 justify-center py-5 content-center"
        ></div>
      </div>
    </div>
  );
};

export default MyComponent;
