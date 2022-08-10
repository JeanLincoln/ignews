/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse} from "next";  
import { getSession } from "next-auth/react";
import { stripe } from '../../services/stripe'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const stripecCustomer = await stripe.customers.create({
        email:session?.user?.email,
        // metadata
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer:stripecCustomer.id,
        payment_method_collection: ['card'],
        billing_address_collection:'required',
        line_items: [
            { price:'price_1LTq0XKUPUDbRc2380FDg3aH', quantity:1 },
        ],
        mode:'subscription',
        allow_promotion_codes:true,
        success_url: process.env.STRIPE_SUCCESS_URL as string,
        cancel_url: process.env.STRIPE_CANCEL_URL as string,
        })
        return res.status(200).json({sessionId:stripeCheckoutSession.id})
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send("Method Not Allowed");
  }
}


