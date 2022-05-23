import React from "react";
import styles from './tasks.module.scss';
import { observer } from 'mobx-react-lite';
import PageTitle from "../../components/pageTitle/pageTitle";
import Filter from "../../components/filter/filter";
import { tasks } from "../../stores/tasksStore/tasks";
import TaskLine from "../../components/taskLine/taskLine";


const Tasks = observer(() => {

  const button = [{
    text: 'Добавить задачу',
    view: 'primary',
  }];

  const { tenTasks } = tasks;

  return (
    <main className={styles.main}>
      <PageTitle title={'Задачи'} buttons={button} />
      <section className={styles.page}>
        <Filter />
        <div className={styles.tasks}>
          {
            tenTasks.map(task => <TaskLine task={task} key={task.id} />)
          }
        </div>
      </section>
    </main>
  )
});

export default Tasks;