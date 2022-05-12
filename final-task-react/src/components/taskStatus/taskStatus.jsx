import React from "react";
import styles from './taskStatus.module.scss';
import { statusText } from '../../constants';

const TaskStatus = ({ status }) => {
  return (
    <span className={styles.common + ' ' + styles[status]}>{statusText[status]}</span>
  )
}

export default TaskStatus;