import React, { useState } from "react";
import styles from './taskMenu.module.scss';
import { observer } from "mobx-react-lite";
import TaskDropdown from '../taskDropdown/taskDropdown';

const TaskMenu = observer(({id, setTasksChunk, currentPage, setUpdate, update}) => {

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
            <TaskDropdown
              taskId={id}
              setTasksChunk={setTasksChunk}
              currentPage={currentPage}
              setUpdate={setUpdate}
              update={update}
            />
          }
        </div>
      </div>
      
    </>
  )
})

export default TaskMenu;