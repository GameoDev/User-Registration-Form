"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
const Products = () => {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const hasFetchedData = useRef(false);
  const [cart, setCart] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [total, setTotal] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
          const fetchedData = await response.json();
          setData(fetchedData);
          setQuantities(fetchedData.map(() => 0)); // Initialize quantities based on fetched data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("sessionToken");
  //     if (!token) {
  //       router.push("/");
  //       return;
  //     }

  //     try {
  //       const response = await fetch("/api/session", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //       if (data.authenticated) {
  //         setAuthenticated(true);
  //       } else {
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.error("Error during authentication check:", error);
  //       router.push("/");
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    router.push("/");
  };

  const handleIncrement = (index, id) => {
    const newCart = [...cart];
    let found = false;

    newCart.forEach((item) => {
      if (item.id === id) {
        item.quantity += 1;
        found = true;
      }
    });

    if (!found) {
      newCart.push({
        title: data[index].title,
        description: data[index].description,
        avatar: data[index].avatar,
        id: id,
        price: data[index].price,
        quantity: 1,
      });
    }

    setCart(newCart);
    let _total = 0;
    for (let i = 0; i < newCart.length; i++) {
      _total += Number(newCart[i].quantity) * Number(newCart[i].price);
    }
    setTotal(_total);
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const RemoveItem = (index, id) => {
    // Filter out the item with the specified id
    const newCart = cart.filter((item) => item.id !== id);

    // Update the cart state
    setCart(newCart);

    // Calculate the new total
    let _total = 0;
    for (let i = 0; i < newCart.length; i++) {
      _total += Number(newCart[i].quantity) * Number(newCart[i].price);
    }

    // Update the total state
    setTotal(_total);

    // Update the quantities state
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = 0;
      return newQuantities;
    });

    // If the cart is empty, trigger the mouse leave handler
    if (newCart.length === 0) {
      handleMouseLeave();
    }
  };

  const handleDecrement = (index, id) => {
    if (quantities[index] > 0) {
      const newCart = [...cart];

      newCart.forEach((item) => {
        if (item.id === id) {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            RemoveItem(index, id);
          }
        }
      });
    }
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] -= 1;
      if (newQuantities[index] <= 0) newQuantities[index] = 0;
      return newQuantities;
    });
  };

  const handleInputChange = (index, value, id) => {
    const newQuantity = Math.max(0, parseInt(value) || 0);
    console.log(newQuantity);

    const newCart = [...cart];
    let found = false;
    newCart.forEach((item) => {
      if (item.id === id) {
        found = true;
        item.quantity = newQuantity;
      }
    });

    if (!found) {
      newCart.push({
        title: data[index].title,
        description: data[index].description,
        avatar: data[index].avatar,
        id: id,
        price: data[index].price,
        quantity: 1,
      });
    }

    setCart(newCart);
    let _total = 0;
    for (let i = 0; i < newCart.length; i++) {
      _total += Number(newCart[i].quantity) * Number(newCart[i].price);
    }
    setTotal(_total);
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = newQuantity;
      return newQuantities;
    });
  };

  const handleMouseEnter = () => {
    if (cart.length >= 1) {
      document.querySelector("#cartList").className =
        "w-full rounded-lg bg-zinc-800 text-center block z-10";
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    document.querySelector("#cartList").className =
      "w-full rounded-lg bg-zinc-800 text-center hidden z-10";
    setIsHovered(false);
  };

  return (
    <div id="parentNode" className="min-h-screen bg-gray-100 py-12">
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-2/5 rounded-lg bg-slate-500 ml-[250px] z-0 relative"
      >
        <h1 className="font-semibold text-center text-black block">
          Shopping Cart
        </h1>
        {cart.length === 0 ? (
          <p className="font-semibold text-center text-black block">
            CART IS EMPTY
          </p>
        ) : (
          <h1 className="font-semibold text-center text-black hidden">
            Number of items in cart: {cart.length} and Your total is : {total}
          </h1>
        )}

        <div className="rounded-lg bg-zinc-800 text-center flex z-10 ml-[300px] absolute">
          <div
            id="cartList"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full rounded-lg bg-zinc-800 text-center hidden z-10"
          >
            {cart.map((d, i) => (
              <>
                <div className="rounded-lg h-30 flex">
                  <img
                    src={d.avatar.replace(/['"]+/g, "")}
                    className="ml-[30px] py-[10px] w-30 rounded-lg"
                  />
                  <div className="w-[300px] mt-[2px]">
                    <h4 className="mt-5 font-bold">
                      {d.quantity} x {d.title}
                    </h4>
                    <h5 className="mt-3  font-medium">{d.price}$</h5>
                    <h5 className="mt-3  font-medium">
                      Total {d.price * d.quantity}$
                    </h5>
                  </div>
                  <div className="mr-10 ml-[200px] mt-[20px]">
                    <button
                      onClick={() => RemoveItem(i, d.id)}
                      className="w-20 h-20 bg-slate-400 rounded-3xl"
                    >
                      X
                    </button>
                  </div>
                </div>
                <hr className="m-4 rounded-lg bg-slate-500" />
              </>
            ))}
            <div>
              <h1 className="inline-flex font-bold block mr-[400px]">
                TOTAL :{" "}
              </h1>
              <h1 className="inline-flex font-bold text-center block">
                {total}
              </h1>
              <hr className="m-4 rounded-lg bg-slate-500" />
            </div>
            <button
              onClick={() => router.push("/components/cart-item")}
              className="w-50 h-30 bg-slate-400 my-6"
            >
              View cart
            </button>
            <button
              onClick={() => router.push("/components/check-out")}
              className="ml-[200px] w-50 h-30 bg-slate-400 my-6"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div
        id="btnContainer"
        className="w-3/5 ml-20 mt-[400px] rounded-lg bg-slate-500 text-center flex"
      >
        {data.map((d, i) => (
          <div key={d.id} className="h-/1 w-40 rounded-lg py-8">
            <img
              src={d.avatar.replace(/['"]+/g, "")}
              className="ml-[60px] w-50 rounded-lg bg-slate-500 text-center"
              alt={`${d.title} avatar`}
            />
            <div className="ml-[90px] w-4/5 float-left">
              <h4 className="my-6">{d.title}</h4>
              <h5>{d.price}$</h5>
              <button
                value={d.id}
                className="w-20 bg-slate-400 rounded-3xl"
                onClick={() => handleIncrement(i, d.id)}
              >
                +
              </button>
              <input
                type="text"
                placeholder="Quantity"
                name="quantity"
                value={quantities[i]}
                onChange={(e) => handleInputChange(i, e.target.value, d.id)}
                className="my-6 mx-[5px] px-2 w-20 h-12 border-solid border-[0.15px] border-black text-black inline"
              />
              <button
                onClick={() => handleDecrement(i, d.id)}
                value={d.id}
                className="w-20 bg-slate-400 rounded-3xl"
              >
                -
              </button>
              <br />
              <button
                onClick={() => handleIncrement(i, d.id)}
                value={d.id}
                className="w-20 bg-slate-400 my-6"
              >
                Add To cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
