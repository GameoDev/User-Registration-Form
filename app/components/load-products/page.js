"use client";

import React, { useState, useEffect, useRef } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const hasFetchedData = useRef(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

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
    console.log(newCart[0].quantity);
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

  const handleDecrement = (index, id) => {
    if (quantities[index] > 0) {
      const newCart = [...cart];

      newCart.forEach((item) => {
        if (item.id === id) {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            newCart.pop();
            item.quantity = 0;
          }
        }
      });
      setCart(newCart);
      let _total = 0;
      for (let i = 0; i < newCart.length; i++) {
        _total += Number(newCart[i].quantity) * Number(newCart[i].price);
      }
      setTotal(_total);
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] -= 1;
        return newQuantities;
      });
    }
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

  return (
    <div id="parentNode" className="min-h-screen bg-gray-100 py-12">
      <div className="w-2/5 rounded-lg bg-slate-500 ml-[250px]">
        <h1 className="font-semibold text-center text-black block">
          Shopping Cart
        </h1>
        {cart.length === 0 ? (
          <p className="font-semibold text-center text-black block">
            CART IS EMPTY
          </p>
        ) : (
          <h1 className="font-semibold text-center text-black block">
            Number of items in cart: {cart.length} and Your total is : {total}
          </h1>
        )}
      </div>
      <div
        id="btnContainer"
        className="w-3/5 m-10 rounded-lg bg-slate-500 text-center flex"
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
              <button value={d.id} className="w-20 bg-slate-400 my-6">
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
