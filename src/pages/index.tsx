import { GetStaticProps } from 'next'
import React from 'react'
import Image from 'next/image'
import Head from '../../node_modules/next/head'
import { SubscribeButton } from '../components/SubscribeButton/index'
import { stripe } from '../services/stripe'
import styles from '../styles/home.module.scss'

type HomeProps = {
  product:{
    priceId:string ,
    amount:number
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
      <Head>
          <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <Image width={334} height={520} src="/images/Avatar.svg" alt="Girl Coding" />
      </main>
    </>
      )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LTq0XKUPUDbRc2380FDg3aH')
  
  const product = {
    priceId:price.id,
    amount:new Intl.NumberFormat('en-US',{
      style:'currency',
      currency:'USD'
    }).format((price as any).unit_amount / 100)
  }

  return{
    props:{
      product
    },
    revalidate: 60*60*24 // 24 hours
  }
}
