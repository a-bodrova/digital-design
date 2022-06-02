import React from 'react';
import styles from './userTaskListItem.module.scss';
import TaskStatus from '../taskStatus/taskStatus';
import TaskRank from '../taskRank/taskRank';

const UserTaskListItem = ({task}) => {

  return (
    <>
      <li className={styles.user_tasks__item}>
        <span className={styles.task_type + ' ' + styles[task.type]}></span>
        <span className={styles.task_title}>{task.title}</span>
        <TaskStatus status={task.status} />
        <TaskRank rank={task.rank} />
      </li>
    </>
  )
}

export default UserTaskListItem;