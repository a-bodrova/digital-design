import React from "react";
import styles from './buttonSuccess.module.scss';

const ButtonSuccess = ({ text }) => {
  return (
    <button type='submit' className={ styles.success }>{ text }</button>
  )
};

export default ButtonSuccess;