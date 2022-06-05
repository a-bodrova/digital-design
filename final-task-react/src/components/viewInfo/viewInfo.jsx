import { useState } from 'react';
import moment from 'moment';
import "moment/locale/ru";

import ButtonDefault from '../buttons/buttonDefault/buttonDefault';
import styles from './viewInfo.module.scss';
import { userStore } from '../../stores/usersStore/usersStore';
import { typeText, rankText } from '../../constants';
import Modal from '../modal/modal';
import FormWorkTimeEdit from '../FormWorkTimeEdit/FormWorkTimeEdit';

const ViewInfo = ({info}) => {

  const { allUsers } = userStore;

  const performer = allUsers.filter(user => user.id === info.assignedId).pop();
  const author = allUsers.filter(user => user.id === info.userId).pop();
  const creationDate = moment(info.dateOfCreation).format('DD.MM.YYYY HH:MM');
  const updateDate = moment(info.dateOfUpdate).format('DD.MM.YYYY HH:MM');
  const duration = moment.duration(moment(info.dateOfUpdate).diff((moment(info.dateOfCreation))));

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleWorktime = () => {
    setIsOpenModal(true);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles.label}>Исполнитель</p>
        <p className={styles.text}>{performer.username}</p>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>Автор задачи</p>
        <p className={styles.text}>{author.username}</p>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>Тип запроса</p>
        <p className={styles.text}>{typeText[info.type]}</p>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>Приоритет</p>
        <p className={styles.text}>{rankText[info.rank]}</p>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>Дата создания</p>
        <p className={styles.text}>{creationDate}</p>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>Дата изменения</p>
        <p className={styles.text}>{updateDate}</p>
      </div>
      <div className={styles.block}>
        <p className={styles.label}>Затрачено времени</p>
        <p className={styles.text}>{duration.humanize()}</p>
        <ButtonDefault text='Сделать запись о работе' view='primary' handler={handleWorktime} />
      </div>
      {
        isOpenModal &&
        <Modal>
            <FormWorkTimeEdit onClose={() => setIsOpenModal(false)} taskId={info.id} />
        </Modal>
      }
    </div>
  )
}

export default ViewInfo;