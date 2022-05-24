import styles from './editTask.module.scss';
import PageTitle from '../../components/pageTitle/pageTitle';
import { useNavigate, useParams } from 'react-router';
import EditInfo from '../../components/editInfo/editInfo';
import { tasks } from '../../stores/tasksStore/tasks';
import { userStore } from '../../stores/usersStore/usersStore';
import { useState } from 'react';
import Divider from '../../components/divider/divider';
import EditDescription from '../../components/editDescription/editDescription';
import { sendTask } from '../../api';

const EditTask = () => {

  const navigate = useNavigate();

  const { user } = userStore;

  const { id } = useParams();
  
  const task = id
    ? tasks.tenTasks.filter(task => id === task.id).pop()
    : {
      userId: user.id,
      assignedId: user.id,
      title: 'Новая задача',
      description: 'Описание',
      type: 'task',
      dateOfCreation: new Date().toISOString(),
      dateOfUpdate: new Date().toISOString(),
      timeInMinutes: 0,
      status: 'opened',
      rank: 'low',
    };


  const [editedTask, setEditedTask] = useState({...task});

  const handleCancel = () => {
    navigate(-1);
  }

  const handleChange = (name, value) => {
    setEditedTask({ ...editedTask, [name]: value });
    tasks.getTasks(null, 0, 10);
  }

  const handleSave = () => {
    sendTask(editedTask);
    navigate(-1);
  }

  const buttons = [
    {
      text: 'Сохранить',
      view: 'primary',
      handler: handleSave,
      type: 'submit',
    },
    {
      text: 'Отмена',
      view: 'default',
      handler: handleCancel,
    },
  ];
  
  const title = id ? "Редактирование" : "Создание";

  return (
    <main className={styles.main}>
      <PageTitle title={title} buttons={buttons} />
      <section className={styles.page}>
        <EditInfo setter={handleChange} editedTask={task} />
        <Divider />
        <EditDescription setter={handleChange} editedTask={task} />
      </section>
    </main>

  )
}

export default EditTask;