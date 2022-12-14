/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse} from "next";  
import { getSession } from "next-auth/react";
import { stripe } from '../../services/stripe'
import {fauna} from '../../services/fauna'
import {query as q} from 'faunadb'

type User = {
  ref:{
    id:string
  }
  data:{
    stripe_customer_id:string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('users_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_customer_id

    if(!customerId){
      const stripecCustomer = await stripe.customers.create({
        email:session?.user?.email,
        // metadata
    })

    await fauna.query(
      q.Update(
        q.Ref(q.Collection('users'),user.ref.id),
        {
          data:{
            stripe_customer_id:stripecCustomer.id,
          }
        }
      )
    )
    customerId = stripecCustomer.id
    }

    
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer:customerId,
        payment_method_types: ['card'],
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


