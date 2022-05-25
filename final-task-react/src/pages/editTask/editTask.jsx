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
    ? 
    tasks.tenTasks.filter(task => id === task.id).pop()
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
  console.log(task);

  const [editedTask, setEditedTask] = useState({...task});

  const handleCancel = () => {
    navigate(-1);
  }

  const handleSave = async () => {
    await sendTask(editedTask);
    console.log('handleSave: ', {editedTask});
    tasks.getTasks({}, 5, 10);
    navigate(-2);
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
        <EditInfo setEditedTask={setEditedTask} editedTask={editedTask} />
        <Divider />
        <EditDescription setEditedTask={setEditedTask} editedTask={editedTask} />
      </section>
    </main>

  )
}

export default EditTask;