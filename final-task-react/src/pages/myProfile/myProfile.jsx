import React, { useState } from "react";
import styles from './myProfile.module.scss';
import avatar from '../../assets/avatar-anonymous.jpg';
import { observer } from "mobx-react-lite";
import { userStore } from '../../stores/usersStore/usersStore';
import PageTitle from "../../components/pageTitle/pageTitle";
import UserTaskListItem from '../../components/userTaskListItem/userTaskListItem';
import Divider from "../../components/divider/divider";
import Modal from '../../components/modal/modal';

const MyProfile = observer(() => {

  const { user } = userStore;

  const [isModal, setIsModal] = useState(false);

  const editUser = () => {
    setIsModal(!isModal);
  }

  const buttons = [
    {
      text: 'Добавить задачу',
      view: 'default',
    },
    {
      text: 'Редактировать',
      view: 'primary',
      handler: editUser,
    }
  ]

  return (
    <>
    <main className={styles.main}>
      <PageTitle title={user.username} buttons={buttons} /> 
      <section className={styles.page}>
        <aside className={styles.user_info}>
          <div className={styles.avatar__border}>
            <img className={styles.avatar} src={user.photoUrl ? user.photoUrl : avatar} alt="avatar" />
          </div>
          <div className={styles.info}>
            <p className={styles.about__title}>О себе</p>
            <p className={styles.about}>{user.about ? user.about : 'Расскажите о себе'}</p>
          </div>
        </aside>
        <Divider />
        <section className={styles.taskslist}>
          <p className={styles.taskslist__title}>Задачи</p>
          <div className={styles.tasks}>
            <UserTaskListItem task={{type: 'task', title: 'Test title 1', status: 'opened', rank: 'low'}} />
            <UserTaskListItem task={{type: 'task', title: 'Test title 3', status: 'inProgress', rank: 'medium'}} />
            <UserTaskListItem task={{type: 'task', title: 'Test title 4', status: 'complete', rank: 'high'}} />
            <UserTaskListItem task={{type: 'bug', title: 'Test title 2', status: 'testing', rank: 'high'}} />
            <UserTaskListItem task={{type: 'bug', title: 'Test title 5', status: 'testing', rank: 'low'}} />
            <UserTaskListItem task={{type: 'bug', title: 'Test title 6', status: 'complete', rank: 'medium'}} />
          </div>
        </section>
      </section>
    </main>
    { isModal && <Modal user={ user } open={isModal} onClose={() => setIsModal(false)} />}
    </>
  )
})

export default MyProfile;