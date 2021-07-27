import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import style from './home.module.scss';
import { GetServerSideProps } from 'next'
import { stripe } from '../services/stripe';

type HomeProps = {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={style.contentContainer}>
          <section className={style.hero}>
            <span>👏 Hey, Welcome</span>
            <h1>New about <br/ > the <span>React</span> world.</h1>
            <p>
              Get access to all the publications <br />
              <span>for {product.amount} month</span> 
            </p>
            <SubscribeButton princeId={product.priceId} />
        </section>
          <img src="/images/avatar.svg" alt="Girl Coding"/>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JF4TAIB23GSRVa7SuzgXITY')

  const product = {
    priceId:  price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }
  return {
    props: {
      product,
    }
  }
}