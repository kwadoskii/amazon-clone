import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToBasket, removeFromBasket } from "../store/slices/basketSlice";

export default function CheckoutProduct({
  image,
  title,
  price,
  id,
  rating,
  description,
  category,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      image,
      title,
      price,
      id,
      rating,
      description,
      category,
      hasPrime,
    };

    dispatch(addToBasket(product));
    toast.success("Item added to basket", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error("Item removed from basket", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p className="font-medium text-lg my-1.5">{title}</p>
        <div className="flex">
          {Array(Math.floor(rating))
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="line-clamp-3 text-xs my-2">{description}</p>
        <Currency quantity={price * 567} currency="NGN" />

        {hasPrime && (
          <div className="flex items-center gap-2">
            <img loading="lazy" src="https://links.papareact.com/fdw" className="w-12" alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}
