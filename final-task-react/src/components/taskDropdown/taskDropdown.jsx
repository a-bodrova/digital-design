import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import styles from './taskDropdown.module.scss';
import { tasks } from '../../stores/tasksStore/tasks';
import { changeStatus } from "../../api";
import { statusButtonList } from "../../constants";

const TaskDropdown = observer(({taskId, taskStatus, currentPage, setUpdate, update}) => {

  console.log({taskStatus});
  const handleDelete = async () => {
    tasks.page = currentPage;
    await tasks.deleteTask(taskId);
    setUpdate(!update);
  }

  const handleStatus = async (newStatus) => {
    await changeStatus(taskId, newStatus);
    setUpdate(!update);
  }

  return (
    <ul className={styles.drop_menu}>
      <Link to={`/tasks/edit/${taskId}`} >Редактировать</Link>
      <li className={styles.danger__item} onClick={handleDelete}>Удалить</li>
      {
        statusButtonList[taskStatus].map(item => {
          return <li onClick={() => handleStatus(item.newStatus)}>{item.text}</li>
        })
      }
    </ul>
  )
})

export default TaskDropdown;