import React, { useState } from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import styles from './ThankYou.module.css'

const ThankYou = () => {
  return (
    <div className={styles.mainDiv} style={{ backgroundColor: "#EFF5E9" }}>
      <Topbar list={[]} />
      <div className={styles.mainThankYouDiv}>
        <div className={styles.thankYouDiv}>
          <p className={styles.thankYouText}>Thank You For Applying!</p>
          <p className={styles.thankYouText2}>Your submission has been received. We will
            contact you for additional confirmation. If you have any query, please reach out to us at
            <b> services@assist.com</b>. We will get back to you ASAP</p>

        </div>
      </div>
    </div>
  )
}

export default ThankYou
