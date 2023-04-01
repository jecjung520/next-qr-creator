// import { useRouter } from 'next/router'
// import QRCodePage from '../components/QRCodePage'

// function QRCode() {
//   const router = useRouter()
//   const { value } = router.query

//   return <QRCodePage value={value} />
// }

// export default QRCode

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebase } from '../../config'

export default function Home(props) {
  const { title, initialQrValue } = props
  const router = useRouter()
  const { value } = router.query

  const [qrValue, setQrValue] = useState(initialQrValue)

  const updateHash = (text) => {
    firebase.firestore()
      .collection('courses')
      .doc(value.trim())
      .update({
        hash: text
      })
      .then(() => {
        console.log('hash updated')
      })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const hash = Math.random().toString(36).substring(2, 5);
      const newQrValue = value + '#' + hash
      setQrValue(newQrValue)
      updateHash(hash)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [qrValue])

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generate QR code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.qrContainer}>
          <QRCode value={qrValue} size={256} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Next.js</p>
      </footer>
    </div>
  )
}

Home.getInitialProps = async ({ query }) => {
  const { qrValue } = query

  return {
    title: qrValue,
    initialQrValue: qrValue
  }
}

