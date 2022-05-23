import styles from './editTask.module.scss';
import PageTitle from '../../components/pageTitle/pageTitle';
import { useNavigate, useParams } from 'react-router';
import EditInfo from '../../components/editInfo/editInfo';
import { tasks } from '../../stores/tasksStore/tasks';
import { useState } from 'react';
import Divider from '../../components/divider/divider';
import EditDescription from '../../components/editDescription/editDescription';
import { sendTask } from '../../api';

const EditTask = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const task = tasks.tenTasks.filter(task => id === task.id).pop();

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


  return (
    <main className={styles.main}>
      <PageTitle title="Редактирование" buttons={buttons} />
      <section className={styles.page}>
        <EditInfo setter={handleChange} editedTask={task} />
        <Divider />
        <EditDescription setter={handleChange} editedTask={task} />
      </section>
    </main>

  )
}

export default EditTask;