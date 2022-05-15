import React from "react";
import styles from './tasks.module.scss';
import { observer } from 'mobx-react-lite';
import PageTitle from "../../components/pageTitle/pageTitle";
import Filter from "../../components/filter/filter";

const Tasks = observer(() => {

  const button = [{
    text: 'Добавить задачу',
    view: 'primary',
  }]

  return (
    <>
    <main className={styles.main}>
      <PageTitle title={'Задачи'} buttons={button} />
      <section className={styles.page}>
        <Filter />
        <div className={styles.tasks}></div>
      </section>
    </main>
    </>
  )
});

export default Tasks;