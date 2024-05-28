import { useState } from "react";
export default function Cart({ avatar, title, price, id }) {
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      <div className="h-/3 w-80 rounded-lg py-8 float-left">
        <img
          src={avatar.replace(/['"]+/g, "")}
          className="ml-[60px] w-50 rounded-lg bg-slate-500 text-center"
        />
        <div className="ml-[90px] w-4/5 float-left">
          <h4 className="my-6">{title}</h4>
          <h5>{price}$</h5>
          <button
            value={id}
            className="w-20 bg-slate-400 rounded-3xl"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
          <input
            type="text"
            placeholder="Quantity"
            name="price"
            required
            value={quantity}
            className="my-6 mx-[5px] px-2 w-20 h-12 border-solid border-[0.15px] border-black text-black inline"
          />
          <button
            onClick={() => setQuantity((prev) => prev - 1)}
            value={id}
            className="w-20 bg-slate-400 rounded-3xl"
          >
            -
          </button>
          <br />
          <button value={id} className="w-48 bg-slate-400">
            Add To cart
          </button>
        </div>
      </div>
    </>
  );
}
