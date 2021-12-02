import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../store/slices/basketSlice";

export default function Product({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime: rating > 4,
    };

    dispatch(addToBasket(product));
  };

  const exchangeRate = 567; //exchange rate to Naira from USD

  return (
    <div className="relative flex flex-col m-4 bg-white z-30 p-10 rounded-md shadow-sm">
      <p className="absolute top-2 right-0 text-xs italic text-gray-700 bg-yellow-400 py-1 px-2 rounded-md rounded-r-none shadow-md ">
        {category}
      </p>

      <Image src={image} objectFit="contain" height={200} width={200} />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(Math.floor(rating))
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-300" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price * exchangeRate} currency="NGN" />
      </div>

      {rating > 4 && (
        <div className="flex items-center gap-2 -mt-5">
          <img src="https://links.papareact.com/fdw" className="w-12" alt="has prime" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}
