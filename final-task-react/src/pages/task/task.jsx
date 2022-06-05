import React, { useState }   from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import styles from './task.module.scss';
import PageTitle from '../../components/pageTitle/pageTitle';
import { tasks } from '../../stores/tasksStore/tasks';
import ViewInfo from '../../components/viewInfo/viewInfo';
import Divider from '../../components/divider/divider';
import ViewDescription from '../../components/viewDescription/viewDescription';
import ViewComments from '../../components/viewComments/viewComments';
import { statusButtonList } from '../../constants';
import { changeStatus, getTask } from '../../api';

const Task = observer(() => {

  const { id } = useParams();
  const task = [...tasks.tenTasks].filter(task => task.id === id).pop();

  const [taskInfo, setTaskInfo] = useState({...task});

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/tasks/edit/${id}`);
  }

  const handleDelete = async () => {
    await tasks.deleteTask(id);
    await tasks.getTasks();
    navigate(-1);
  }
  
  const handleStatus = async (newStatus) => {
    await changeStatus(id, newStatus);
    const task = await getTask(id);
    setTaskInfo(task);
  }

  const buttons = [
    {
      text: 'Редактировать',
      view: 'primary',
      handler: handleEdit,
    },
    {
      text: 'Удалить',
      view: 'error',
      handler: handleDelete,
    },
  ]

  return (
    <>
      <main className={styles.main}>
        <PageTitle
          title={taskInfo.title}
          buttons={[ ...statusButtonList[taskInfo.status], ...buttons]}
          status={taskInfo.status}
          handler={handleStatus}
        />
        <section className={styles.page}>
          <ViewInfo info={taskInfo} />
          <Divider />
          <ViewDescription info={taskInfo} />
          <Divider />
          <ViewComments taskId={taskInfo.id} />
        </section>
      </main>
    </>
  )
})

export default Task;