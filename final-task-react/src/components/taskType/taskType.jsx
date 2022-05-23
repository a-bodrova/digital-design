import React from "react";
import styles from './taskType.module.scss';

const TaskType = ({type}) => {
  return (
    <div className={styles.type_wrapper}>
      <span className={styles.task_type + ' ' + styles[type]}></span>
    </div>
  )
}

export default TaskType;