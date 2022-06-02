import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
// import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

import styles from './UserOverview.module.scss';
import avatar from '../../assets/avatar-anonymous.jpg';
import { userStore } from '../../stores/usersStore/usersStore';
import { AppRoute } from '../../constants';
import PageTitle from '../pageTitle/pageTitle';
import Divider from '../divider/divider';

const UserOverview = action(() => {

  const { id } = useParams();
  const { user, allUsers } = userStore;
  const userInfo = allUsers.filter(info => id === info.id).pop();
  const isAuthorizedUser = id === user.id;
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
// TODO запрос на таски этого пользователя.
//      В параметр к запросу filter положить assignedId: [userInfo.id]
  useEffect(() => {
    if (id === user.id) {
      navigate(AppRoute.PROFILE);
    }
  }, [id, navigate, user.id]);

  const editUser = () => {
    setIsModal(!isModal);
  };

  const handleAddTask = () => {
    navigate(AppRoute.NEW_TASK);
  }

  const addButton = {
    text: 'Добавить задачу',
    view: 'default',
    handler: handleAddTask,
  };


  const editButton = {
    text: 'Редактировать',
    view: 'primary',
    handler: editUser,
  }

  return (
    <main className={styles.main}>
      <PageTitle title={userInfo.username} buttons={isAuthorizedUser ? [addButton, editButton] : [addButton]} />
      <section className={styles.page}>
        <aside className={styles.user_info}>
          <div className={styles.avatar__border}>
            <img className={styles.avatar} src={userInfo.photoUrl ? userInfo.photoUrl : avatar} alt="avatar" />
          </div>
          <div className={styles.info}>
            <p className={styles.about__title}>О себе</p>
            <p className={styles.about}>{userInfo.about ? userInfo.about : 'Расскажите о себе'}</p>
          </div>
        </aside>
        <Divider />
        <section className={styles.taskslist}>
          <p className={styles.taskslist__title}>Задачи</p>
          <ul className={styles.tasks}></ul>
        </section>
      </section>
    </main>
  )
})

export default UserOverview;