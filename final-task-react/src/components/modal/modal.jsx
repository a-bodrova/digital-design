import React from "react";
import ReactDom from "react-dom";
import { observer } from "mobx-react-lite";
import styles from './modal.module.scss';
import FormUserEdit from "../formUserEdit/formUserEdit";

const Modal = observer(({user, open, onClose}) => {
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <FormUserEdit user={user} onClose={onClose} />
        </div>
      </div>
    </>,
    document.getElementById('modal')
  )
})

export default Modal;