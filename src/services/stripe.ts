import Stripe from 'stripe'
import React from 'react'
import { version } from '../../package.json'

export const stripe = new Stripe(
    (process.env.STRIPE_API_KEY as string) ,
    {
        apiVersion:'2022-08-01',
        appInfo:{
            name:'Ignews',
            version
        }
    }
)