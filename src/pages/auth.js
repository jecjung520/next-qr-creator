import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

export default function Auth() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const { value } = router.query;

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleAuthenticate = () => {
    // TODO: Add authentication logic here
    const isValidCode = code.length === 6 && /^\d+$/.test(code);
    if (isValidCode) {
      router.push(`/qrcode?value=${value}`);
    } else {
      alert('Invalid code');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter authentication code</h1>
      <input className={styles.input} type="password" value={code} onChange={handleCodeChange} />
      <button className={styles.button} onClick={handleAuthenticate}>Authenticate</button>
    </div>
  );
}
