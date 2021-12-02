import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import { connect, disconnect } from "mongoose";
import Head from "next/head";
import moment from "moment";
import { Order } from "../models/orders";
import OrderComponent from "../components/Order";

export default function orders({ orders }) {
  const session = useSession();

  return (
    <>
      <Head>
        <title>My Orders - Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />

        <main className="max-w-screen-lg mx-auto p-10">
          <h1 className="text-3xl border-b border-yellow-400 pb-1 mb-2">Your Orders</h1>

          {session ? <h2>{orders?.length} Orders</h2> : <h2>Please sign in to see your orders</h2>}

          <div className="mt-5 gap-4">
            {orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
              <OrderComponent
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //get the logged in user
  const session = await getSession(ctx);

  if (!session) return { props: {} };

  await connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const stripeOrders = await Order.find({ user: session.user?.email }).sort("-timestamp");

  //Stripe exact order details
  const orders = await Promise.all(
    stripeOrders.map(async (order) => ({
      id: order._id.toString(),
      amount: order.amount,
      amountShipping: order.amount_shipping,
      images: order.images,
      timestamp: moment(new Date(order.timestamp)).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.order_id, {
          limit: 100,
        })
      ).data,
    }))
  );

  await disconnect();
  return {
    props: { orders, session },
  };
}
