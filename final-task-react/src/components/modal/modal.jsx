import React from "react";
import ReactDom from "react-dom";
import { observer } from "mobx-react-lite";

import styles from './modal.module.scss';

const Modal = observer(({ children }) => {
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          { children }
        </div>
      </div>
    </>,
    document.getElementById('modal')
  )
})

export default Modal;