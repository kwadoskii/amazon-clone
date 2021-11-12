import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

export default function Product({ id, title, price, description, category, image, rating }) {
  const [hasPrime, setHasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-md shadow-sm">
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
        <Currency quantity={price * 578} currency="NGN" />
      </div>

      {rating > 4 && (
        <div className="flex items-center gap-2 -mt-5">
          <img src="https://links.papareact.com/fdw" className="w-12" alt="has prime" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}
