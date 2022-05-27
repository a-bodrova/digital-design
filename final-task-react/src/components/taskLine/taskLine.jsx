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

const TaskLine = observer(({task, currentPage, setTasksChunk, setUpdate, update}) => {

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
      <div className={styles.task_title}>
        <Link to={id} >{title}</Link>
      </div>
      <TaskPerformer username={user.username} />
      <TaskStatus status={status} />
      <TaskRank rank={rank} />
      <TaskMenu
        id={id}
        setTasksChunk={setTasksChunk}
        currentPage={currentPage}
        setUpdate={setUpdate}
        update={update}
      />
    </div>
  )
})

export default TaskLine;