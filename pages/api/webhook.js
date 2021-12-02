import { buffer } from "micro";
import { connect, disconnect, model, models } from "mongoose";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("fulfilling order");

  // const User = mongoose.model("User", { email: String });
  await connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const Order =
    models.Order ||
    model("Order", {
      order_id: { type: String },
      amount: { type: Number },
      amount_shipping: { type: Number },
      images: { type: Array },
      timestamp: { type: Date },
      user: { type: String },
    });

  // const user = new User({ email: session.metadata.email });
  const order = new Order({
    order_id: session.id,
    amount: session.amount_total / 100,
    amount_shipping: session.total_details.amount_shipping / 100,
    images: JSON.parse(session.metadata.images),
    timestamp: new Date(),
    user: session.metadata.email,
  });

  await order
    .save()
    .then(() => console.log(`SUCCESS: Order ${session.id} had been added to the DB.`));

  // return order
  //   .save()
  //   .then(() => console.log(`SUCCESS: Order ${session.id} had been added to the DB.`));
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("Webhook event error:", err.message);
      return res.status(400).send(`Webhook event error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook fulfill error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
