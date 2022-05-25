import styles from './editInfo.module.scss';
import { userStore } from '../../stores/usersStore/usersStore';
import { typeText, rankText } from '../../constants';

const EditInfo = ({setEditedTask, editedTask}) => {

  const { allUsers } = userStore;
  
  const getUserById = (id) => {
    return allUsers.filter(user => user.id === id).pop();
  }
  
  const getIdByUsername = (username) => {
    return allUsers.filter(user => user.username === username).pop().id;
  }
  
  const handlePerformerChange = (e) => {
    const { name, value } = e.target;
    const val = getIdByUsername(value);
    setEditedTask({...editedTask, [name]: val});
  }
  
  const handleTypeChange = (e) => {
    const { name, value } = e.target;

    for (const key of Object.keys(typeText)) {
      if (typeText[key] === value) {
        setEditedTask({...editedTask, [name]: key});
      }
    }
  }
  
  const handleRankChange = (e) => {
    const { name, value } = e.target;

    for (const key of Object.keys(rankText)) {

      if (rankText[key] === value) {
        setEditedTask({...editedTask, [name]: key});
      }
    }
  }

  const performer = getUserById(editedTask.assignedId);

  return (
    <section className={styles.wrapper}>
      <div className={styles.block}>
        <label htmlFor='performer' className={styles.label}>Исполнитель</label>
        <select
          id='performer'
          name='assignedId'
          className={styles.select}
          defaultValue={performer.username}
          onChange={handlePerformerChange}
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
          defaultValue={typeText[editedTask.type]}
          onChange={handleTypeChange}
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
            defaultValue={rankText[editedTask.rank]}
            onChange={handleRankChange}
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