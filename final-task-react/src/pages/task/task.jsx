import React   from 'react';
import styles from './task.module.scss';
import PageTitle from '../../components/pageTitle/pageTitle';
import { useParams } from 'react-router';
import { tasks } from '../../stores/tasksStore/tasks';
import ViewInfo from '../../components/viewInfo/viewInfo';
import Divider from '../../components/divider/divider';
import ViewDescription from '../../components/viewDescription/viewDescription';
import ViewComments from '../../components/viewComments/viewComments';
import { useNavigate } from 'react-router';

const Task = () => {

  const { id } = useParams();
  const task = [...tasks.tenTasks].filter(task => task.id === id).pop();

  const navigate = useNavigate();
  
  const statusButtons = {
    opened: [
      {
        text: 'Взять в работу',
        view: 'default',
      },
      {
        text: 'Готово',
        view: 'success',
      },
    ],
    testing: [
      {
        text: 'Переоткрыть',
        view: 'default',
      },
      {
        text: 'Готово',
        view: 'success',
      },
    ],
    inProgress: [
      {
        text: 'Переоткрыть',
        view: 'default',
      },
      {
        text: 'На тестирование',
        view: 'default',
      },
      {
        text: 'Готово',
        view: 'success',
      },
    ],
    complete: [
      {
        text: 'Переоткрыть',
        view: 'default',
      }
    ]
  }

  const handleEdit = () => {
    navigate(`/tasks/edit/${id}`);
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
    },
  ]

  return (
    <>
      <main className={styles.main}>
        <PageTitle title={task.title} buttons={[ ...statusButtons[task.status], ...buttons]} status={task.status} />
        <section className={styles.page}>
          <ViewInfo info={task} />
          <Divider />
          <ViewDescription info={task} />
          <Divider />
          <ViewComments taskId={task.id} />
        </section>
      </main>
    </>
  )
}

export default Task;