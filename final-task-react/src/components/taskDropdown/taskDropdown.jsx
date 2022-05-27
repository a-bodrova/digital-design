import React from "react";
import styles from './taskDropdown.module.scss';
import { Link } from "react-router-dom";
import { tasks } from '../../stores/tasksStore/tasks';
import { observer } from "mobx-react-lite";

const TaskDropdown = observer(({taskId, setTasksChunk, currentPage, setUpdate, update}) => {

  const handleDelete = async () => {
    tasks.page = currentPage;
    await tasks.deleteTask(taskId);
    setUpdate(!update);
  }

  return (
    <ul className={styles.drop_menu}>
      <Link to={`/tasks/edit/${taskId}`} >Редактировать</Link>
      <li className={styles.danger__item} onClick={handleDelete}>Удалить</li>
      <li className={styles.test}>На тестирование</li>
      <li className={styles.reopen}>Переоткрыть</li>
    </ul>
  )
})

export default TaskDropdown;