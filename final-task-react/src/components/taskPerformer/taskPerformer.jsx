import React from "react";
import styles from './taskPerformer.module.scss';

const TaskPerformer = ({username}) => {
  return (
    <div className={styles.executor_wrapper}>
      <span className={styles.executor}>{username}</span>
    </div>
    
  )
}

export default TaskPerformer;