import React, { useState } from "react";
import styles from './taskMenu.module.scss';
import TaskDropdown from '../taskDropdown/taskDropdown';

const TaskMenu = ({id}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className={styles.menu_wrapper}>
        <div className={`${styles.menu} ${isOpen && styles.active}`} onClick={handleMenu}>
          <span className={styles.burger_line}></span>
          {
            isOpen &&
            <TaskDropdown taskId={id} />
          }
        </div>
      </div>
      
    </>
  )
}

export default TaskMenu;