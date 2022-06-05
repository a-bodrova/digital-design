import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
// import { action } from 'mobx';

import styles from './UserOverview.module.scss';
import avatar from '../../assets/avatar-anonymous.jpg';
import { userStore } from '../../stores/usersStore/usersStore';
import { AppRoute } from '../../constants';
import PageTitle from '../pageTitle/pageTitle';
import Divider from '../divider/divider';
import Pagination from '../pagination/Pagination';
import { tasks } from '../../stores/tasksStore/tasks';
import UserTaskListItem from '../userTaskListItem/userTaskListItem';
import Modal from '../modal/modal';
import FormUserEdit from '../formUserEdit/formUserEdit';

const UserOverview = observer(() => {

  const { id } = useParams();

  const { user, allUsers } = userStore;
  const userData = allUsers.filter(info => id === info.id).pop();
  const [userInfo, setUserInfo] = useState({...userData})

  const isAuthorizedUser = id === user.id;

  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const [userTasks, setUserTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {

    const getUserTasks = async () => {
      await tasks.getTasks({...tasks.filter, assignedUsers: [userInfo.id]}, currentPage);
      setUserTasks([...tasks.tenTasks]);
    }
    
    try {

      getUserTasks();

    } catch (error) {
      setErrMsg(error.message);
    }

  }, [userInfo, currentPage]);

// TODO запрос на таски этого пользователя.
//      В параметр к запросу filter положить assignedId: [userInfo.id]


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
          <ul className={styles.tasks}>
            {
              userTasks
              ?
              userTasks.map(task => {
                return <UserTaskListItem task={task} key={task.id} />
              })
              :
              <div className={styles.err_msg}>{errMsg}</div>
            }
          </ul>
          <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentChunkLength={userTasks.length}
              itemsTotal={tasks.total}
              limit={10}
          />
        </section>
      </section>
      {
        isModal &&
          <Modal>
            <FormUserEdit
                user={user}
                onClose={() => setIsModal(false)}
                handler={setUserInfo}
            />
          </Modal>
      }
    </main>
  )
})

export default UserOverview;