import React from 'react';
import ReactDom from "react-dom";

import styles from './ModalWOrkTime.module.scss';
import FormWorkTimeEdit from '../FormWorkTimeEdit/FormWorkTimeEdit';

const ModalWorkTime = ({onClose}) => {
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <FormWorkTimeEdit onClose={onClose} />
        </div>
      </div>
    </>,
    document.getElementById('modal')
  )
}

export default ModalWorkTime;