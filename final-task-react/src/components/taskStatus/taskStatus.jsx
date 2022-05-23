import React from "react";
import styles from './taskStatus.module.scss';
import { statusText } from '../../constants';

const TaskStatus = ({ status }) => {
  return (
    <div className={styles.status_wrapper}>
      <span className={styles.common + ' ' + styles[status]}>{statusText[status]}</span>
    </div>
    
  )
}

export default TaskStatus;