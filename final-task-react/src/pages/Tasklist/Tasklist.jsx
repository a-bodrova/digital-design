import React, { useEffect, useState } from "react";
import { action } from "mobx";
// import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router";

import styles from './taskList.module.scss';
import PageTitle from "../../components/pageTitle/pageTitle";
import Filter from "../../components/filter/filter";
import TaskItem from "../../components/taskItem/taskItem";
import { AppRoute } from "../../constants";
import Pagination from "../../components/pagination/Pagination";
import { tasks } from "../../stores/tasksStore/tasks";


const TaskList = action(() => {
  
  
  const [filter, setFilter] = useState({...tasks.filter});

  const [currentPage, setCurrentPage] = useState(0);
  const [tasksChunk, setTasksChunk] = useState([]);
  const [currentChunkLength, setCurrentChunkLength] = useState(0);
  const [tasksTotal, setTasksTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const loadTasks = action(async () => {
      await tasks.getTasks(filter, currentPage);
      tasks.page = currentPage;

      setTasksChunk([...tasks.tenTasks]);
      setCurrentChunkLength(tasks.tenTasks.length);
      setTasksTotal(tasks.total);
    })

    try {
      loadTasks();
    } catch (error) {
      setErrorMsg(error.message);
    }
    
  }, [filter, currentPage, update]);
  
  

  const navigate = useNavigate();

  const handleAddNewTask = action(() => {
    tasks.page = currentPage;
    navigate(AppRoute.NEW_TASK);
  })

  const button = [
    {
      text: 'Добавить задачу',
      view: 'primary',
      handler: handleAddNewTask,
    },
  ];

  return (
    <main className={styles.main}>
      <PageTitle title='Задачи' buttons={button} />
      <section className={styles.page}>
        <Filter filter={filter} setFilter={setFilter} />
        <div className={styles.tasks}>
          {
            !errorMsg && tasksChunk.length
              ?
              tasksChunk.map(task => {
                return (
                  <TaskItem
                    task={task}
                    key={task.id}
                    currentPage={currentPage}
                    setTasksChunk={setTasksChunk}
                    setUpdate={setUpdate}
                    update={update}
                  />
                )
              })
              :
              <p className={styles.error_message}>{errorMsg || 'Ничего не найдено'}</p>
          }
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsTotal={tasksTotal}
          limit={tasks.limit}
          currentChunkLength={currentChunkLength}
        />
      </section>
    </main>
  )
});

export default TaskList;