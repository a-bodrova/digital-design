import React  from "react";
import styles from './buttonDefault.module.scss';

const ButtonDefault = ({ text, view, handler, type }) => {
  return (
    <button type={type} className={ `${styles[view]} ${styles.default}` } onClick={handler}>{ text }</button>
  )
};

export default ButtonDefault;