import styles from './editInfo.module.scss';
import { userStore } from '../../stores/usersStore/usersStore';
import { typeText, rankText } from '../../constants';

const EditInfo = ({setter, editedTask}) => {

  const { allUsers } = userStore;
  const performer = allUsers.filter(user => user.id === editedTask.assignedId).pop();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setter(name, value);
  }


  return (
    <section className={styles.wrapper}>
      <div className={styles.block}>
        <label htmlFor='performer' className={styles.label}>Исполнитель</label>
        <select
          id='performer'
          name='assignedId'
          className={styles.select}
          defaultValue={performer.username}
          onChange={handleChange}
        >
            {
              allUsers.map(user => {
                return <option value={user.username} key={user.id}>{user.username}</option>
              })
            }
        </select>
      </div>
      <div className={styles.block}>
        <label htmlFor='type' className={styles.label}>Тип запроса</label>
        <select
          id='type'
          name='type'
          className={styles.select}
          defaultValue={editedTask.type}
          onChange={handleChange}
        >
          {
            Object.values(typeText).map((type, index) => <option value={type} key={index}>{type}</option>)
          }
        </select>
      </div>
      <div className={styles.block}>
        <label htmlFor="rank" className={styles.label}>Приоритет</label>
          <select
            id='rank'
            name='rank'
            className={styles.select}
            defaultValue={editedTask.rank}
            onChange={handleChange}
          >
            {
              Object.values(rankText).map((rank, index) => <option value={rank} key={index}>{rank}</option>)
            }
          </select>
      </div>
    </section>
  )
}

export default EditInfo;