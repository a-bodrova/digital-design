import React from 'react';
import styles from './buttonDigit.module.scss';

const ButtonDigit = ({ text, view, handler }) => {
  return (
    <button className={ `${styles[view]} ${styles.default}` } onClick={handler}>{ text }</button>
  )
}

export default ButtonDigit