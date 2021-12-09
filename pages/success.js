import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { clearBasket } from "../store/slices/basketSlice";

export default function success() {
  const router = useRouter();
  const dispatch = useDispatch();

  dispatch(clearBasket());

  return (
    <>
      <Head>
        <title>Order Placed - Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-100 h-screen">
        <Header />

        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col p-10 bg-white">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircleIcon className="text-green-500 h-10" />
              <h2 className="text-2xl text-gray-900">
                Thank you, for your order has been confirmed
              </h2>
            </div>

            <p className="text-gray-700">
              Thank you for shopping with us. We'll send a confirmation once your item has shipped,
              if you would like to check the status of your oders(s) please click on the link below.
            </p>

            <button onClick={() => router.push("/orders")} className="button mt-5">
              Go to my orders
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
