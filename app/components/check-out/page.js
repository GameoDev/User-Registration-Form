"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const CheckOut = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   const initQuantities = () => {
  //     const storedValue = localStorage.getItem("userId");
  //     userID = Number(storedValue);
  //     console.log(userID);
  //   };
  //   initQuantities();
  // }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("sessionToken");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch("/api/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log("Error during authentication check:", error);
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const storedValue = localStorage.getItem("cart");
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    // console.log(parsedValue);
    setCart(parsedValue);
  }, []);

  const OnHandleSubmit = (e) => {
    e.preventDefault();

    const formData = {};

    const storedValue = localStorage.getItem("userId");

    const userID = Number(storedValue);

    formData["userId"] = userID;

    SubmitData(formData);
  };

  const SubmitData = async (_data) => {
    const response = await fetch("http://localhost:3000/api/place-order", {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    PlaceOrder(data.id);
  };
  const PlaceOrder = async (_id) => {
    try {
      for (let i = 0; i < cart.length; i++) {
        const formData = {};
        let quantity = cart[i].quantity;
        let id = cart[i].id;

        formData["orderId"] = _id;
        formData["productId"] = id;
        formData["product_quantity"] = quantity;
        console.log("---------", formData);

        const response = await fetch("http://localhost:3000/api/add-order", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        });

        console.log(response, "Api reponse");
        const data = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
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
          {/* {props?.user}, Create Your Account */}Checkout
        </h1>
        <div className="py-6 mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:px-8 rounded-lg self-center min-w-1 bg-white">
          <form onSubmit={OnHandleSubmit} method="POST">
            <label htmlFor="full_name">
              <b className="text-black font-semibold text-sm">Full Name</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Full Name"
              name="customer_name"
              className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <label htmlFor="email">
              <b className="text-black font-semibold text-sm">Contact Number</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Mobile Number"
              name="customer_mobile"
              className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <br />
            <label htmlFor="email">
              <b className="text-black font-semibold text-sm">Email Address</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Email"
              name="customer_email"
              className="my-2 px-2 w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <br />
            <label htmlFor="psw">
              <b className="text-black font-semibold text-sm">Address</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Delivery Address"
              name="customer_address"
              className="my-2 px-2 content-center w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <br />
            <label htmlFor="psw-repeat">
              <b className="text-black font-semibold text-sm">City</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="City"
              name="customer_city"
              className="my-2 px-2 content-center w-96 h-12 border-solid border-[0.15px] border-black text-black"
            />
            <br />

            <div className="clearfix">
              <button
                type="submit"
                className="mt-4 rounded-md my-2 px-2 w-96 h-12 text-white font-semibold bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
