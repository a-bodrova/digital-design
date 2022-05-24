import React from "react";
import styles from './taskLine.module.scss';
import TaskType from '../taskType/taskType';
import TaskStatus from '../taskStatus/taskStatus';
import TaskRank from "../taskRank/taskRank";
import TaskMenu from "../taskMenu/taskMenu";
import TaskPerformer from '../taskPerformer/taskPerformer';
import { userStore } from "../../stores/usersStore/usersStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const TaskLine = observer(({task}) => {

  const {
    type,
    status,
    rank,
    id,
    title,
  } = task;

  const { allUsers } = userStore;
  const user = allUsers.filter(user => task.assignedId  === user.id).pop();

  return (
    <div className={styles.task_line}>
      <TaskType type={type} />
      <Link to={id} className={styles.task_title}>{title}</Link>
      <TaskPerformer username={user.username} />
      <TaskStatus status={status} />
      <TaskRank rank={rank} />
      <TaskMenu id={id} />
    </div>
  )
})

export default TaskLine;