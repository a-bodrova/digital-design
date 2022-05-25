import React from "react";
import styles from './taskDropdown.module.scss';
import { Link } from "react-router-dom";

const TaskDropdown = ({taskId}) => {

  return (
    <ul className={styles.drop_menu}>
      <Link to={`/tasks/edit/${taskId}`} >Редактировать</Link>
      <Link to={taskId} className={styles.danger__item}>Удалить</Link>
      <li className={styles.test}>На тестирование</li>
      <li className={styles.reopen}>Переоткрыть</li>
    </ul>
  )
}

export default TaskDropdown;