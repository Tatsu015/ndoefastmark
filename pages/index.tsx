import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [data, setData] = useState(String);

  useEffect(
    () => {
      // async function loadData() {
      //   const response = await axios('http://127.0.0.1:5000');
      //   setData(response.data);
      // }

      // loadData();
      setData('testdata')
    }, []
  );


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>start</div>
        <div>{data}</div>
        <div>end</div>
      </main>
    </div>
  )
}

export default Home
