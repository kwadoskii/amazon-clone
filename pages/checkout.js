import Header from "../components/Header";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../store/slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";

export default function CheckoutPage() {
  const items = useSelector(selectItems);
  const totalCost = useSelector(selectTotal);
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Cart - Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="py-5 bg-gray-100 min-h-screen">
        {/* left */}
        <div className="lg:flex max-w-screen-xl mx-auto">
          <div className="flex-grow mx-5 shadow-sm rounded-lg overflow-hidden">
            <div className="h-60 w-full relative">
              <Image src="https://links.papareact.com/ikj" layout="fill" objectFit="cover" />
            </div>

            <div className="flex flex-col p-5 gap-y-10 bg-white">
              <h1 className={`text-3xl pb-4 ${items.length > 0 && "border-b"}`}>
                {items.length === 0 ? "Your Amazon Basket is empty" : "Shoping basket"}
              </h1>

              {items.map(
                ({ image, title, price, id, rating, description, category, hasPrime }, i) => (
                  <CheckoutProduct
                    key={i}
                    image={image}
                    title={title}
                    price={price}
                    id={id}
                    rating={rating}
                    description={description}
                    category={category}
                    hasPrime={hasPrime}
                  />
                )
              )}
            </div>
          </div>

          {/* right */}
          {items.length > 0 && (
            <div className="bg-white flex flex-col p-5 shadow-md rounded-lg">
              <div>
                <h2 className="whitespace-nowrap">
                  {`Subtotal (${items.length} item${items.length > 1 ? "s" : ""})`}
                  <span className="font-bold">
                    {" "}
                    <Currency quantity={totalCost} currency="NGN" />
                  </span>
                </h2>

                <button
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    `from-gray-300 to-gray-500 cursor-not-allowed text-gray-200 border-gray-200 focus:ring-gray-300 active:from-gray-500`
                  }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
