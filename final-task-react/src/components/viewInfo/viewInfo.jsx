import ButtonDefault from '../buttons/buttonDefault/buttonDefault';
import styles from './viewInfo.module.scss';
import { userStore } from '../../stores/usersStore/usersStore';
import { typeText, rankText } from '../../constants';
import moment from 'moment';
import "moment/locale/ru";

const ViewInfo = ({info}) => {

  const { allUsers } = userStore;

  const performer = allUsers.filter(user => user.id === info.assignedId).pop();
  const author = allUsers.filter(user => user.id === info.userId).pop();
  const creationDate = moment(info.dateOfCreation).format('DD.MM.YYYY HH:MM');
  const updateDate = moment(info.dateOfUpdate).format('DD.MM.YYYY HH:MM');
  const duration = moment.duration(moment(info.dateOfUpdate).diff((moment(info.dateOfCreation))));

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
        <ButtonDefault text='Сделать запись о работе' view='primary' />
      </div>
      
    </div>
  )
}

export default ViewInfo;