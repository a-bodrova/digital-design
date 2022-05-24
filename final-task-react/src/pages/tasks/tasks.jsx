import React, { useEffect, useState } from "react";
import styles from './tasks.module.scss';
import { observer } from 'mobx-react-lite';
import PageTitle from "../../components/pageTitle/pageTitle";
import Filter from "../../components/filter/filter";
// import { tasks } from "../../stores/tasksStore/tasks";
import TaskLine from "../../components/taskLine/taskLine";
import { useNavigate } from "react-router";
import { AppRoute } from "../../constants";
// import { action } from "mobx";
import { getTasks } from "../../api";
import Pagination from "../../components/pagination/Pagination";
import { action } from "mobx";
import { tasks } from "../../stores/tasksStore/tasks";


const Tasks = observer(() => {
  
  
  const [filter, setFilter] = useState({
    query: '',
    assignedUsers: [],
    userIds: [],
    type: [],
    status: [],
    rank: [],
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [tasksChunk, setTasksChunk] = useState([]);
  const [currentChunkLength, setCurrentChunkLength] = useState(0);
  const [tasksTotal, setTasksTotal] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadTasks = action(async () => {
      const chunk = await getTasks(filter, currentPage, limit);
      setLimit(limit);
      setTasksChunk([...chunk.data]);
      tasks.tenTasks = [...chunk.data];
      setCurrentChunkLength(tasksChunk.length);
      setTasksTotal(chunk.total);
    })

    try {
      loadTasks();
    } catch (error) {
      setErrorMsg(error.message);
    }
    
  }, [filter, currentPage, limit, tasksChunk]);
  
  

  const navigate = useNavigate();

  const handleAddNewTask = () => {
    navigate(AppRoute.NEW_TASK);
  }

  const button = [{
    text: 'Добавить задачу',
    view: 'primary',
    handler: handleAddNewTask,
  }];

  return (
    <main className={styles.main}>
      <PageTitle title={'Задачи'} buttons={button} />
      <section className={styles.page}>
        <Filter filter={filter} setFilter={setFilter} />
        <div className={styles.tasks}>
          {
            !errorMsg
              ?
              tasksChunk.map(task => <TaskLine task={task} key={task.id} />)
              :
              <p className={styles.error_message}>{errorMsg}</p>
          }
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} tasksTotal={tasksTotal} limit={limit} currentChunkLength={currentChunkLength} />
      </section>
    </main>
  )
});

export default Tasks;