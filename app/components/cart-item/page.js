"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Mycart = () => {
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let _total = 0;
    let _quantities = [];
    for (let i = 0; i < cart.length; i++) {
      _total += Number(cart[i].quantity) * Number(cart[i].price);
      _quantities[i] = cart[i].quantity;
    }
    setQuantities(_quantities);
    setTotal(_total);
  }, [cart]);

  useEffect(() => {
    const storedValue = localStorage.getItem("cart");
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    setCart(parsedValue);
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
    console.log(quantities);
    let _total = 0;
    for (let i = 0; i < newCart.length; i++) {
      _total += Number(newCart[i].quantity) * Number(newCart[i].price);
    }

    localStorage.setItem("cart", JSON.stringify(newCart));

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

    localStorage.setItem("cart", JSON.stringify(newCart));

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
      newQuantities[index] = 0; // Set the quantity of the removed item to 0
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
            RemoveItem(index, id);
          }
        }
      });
      setCart(newCart);
      let _total = 0;
      for (let i = 0; i < newCart.length; i++) {
        _total += Number(newCart[i].quantity) * Number(newCart[i].price);
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] += 1;
        return newQuantities;
      });
    }
  };

  const handleInputChange = (index, value, id) => {
    const newQuantity = Math.max(0, parseInt(value) || 0);

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
    localStorage.setItem("cart", JSON.stringify(newCart));
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
    <>
      <div id="parentNode" className="min-h-screen bg-gray-100 py-12">
        <div className="rounded-lg bg-zinc-800 text-center flex z-10 ml-[300px] absolute">
          <div
            id="cartList"
            className="w-full rounded-lg bg-zinc-800 text-center block z-10"
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
                      onChange={(e) =>
                        handleInputChange(i, e.target.value, d.id)
                      }
                      className="my-6 mx-[5px] px-2 w-20 h-12 border-solid border-[0.15px] border-black text-black inline"
                    />
                    <button
                      onClick={() => handleDecrement(i, d.id)}
                      value={d.id}
                      className="w-20 bg-slate-400 rounded-3xl"
                    >
                      -
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
                {total}$
              </h1>
              <hr className="m-4 rounded-lg bg-slate-500" />
            </div>
            <button
              onClick={() => router.push("/components/load-products")}
              className="w-50 h-30 bg-slate-400 my-6"
            >
              Continue Shopping
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
    </>
  );
};
export default Mycart;
