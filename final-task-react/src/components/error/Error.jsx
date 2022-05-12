import React from "react";
import styles from './error.module.scss';

const Error = () => {
  return (
    <div className={styles.error}>
      <h1>Error 404. Page not found</h1>
    </div>
  )
}

export default Error;