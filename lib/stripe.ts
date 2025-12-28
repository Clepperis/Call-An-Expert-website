import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
    typescript: true,
});

export const PRICES = {
    session: 4900, // $49 in cents
    agency: {
        starter: 9900, // $99
        studio: 24900, // $249
        agency: 49900, // $499
    },
};
