import { useState, useEffect } from 'react';
import styles from './viewComments.module.scss';
import ButtonDefault from '../buttons/buttonDefault/buttonDefault';
import ViewComment from '../viewComment/viewComment';
import { userStore } from '../../stores/usersStore/usersStore';
import { getComments, sendComment } from '../../api';

const ViewComments = ({ taskId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  
  useEffect(() => {
    const loadComments = async (id) => {
      try {
        const response = await getComments(id);
        setComments([...response]);

      } catch (error) {
        setErrMsg(error.message);
      }
    }
    
    loadComments(taskId);
  }, [taskId, comment]);

  const { user } = userStore;


  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleAddComment = async () => {
    const body = {
      taskId,
      userId: user.id,
      text: comment,
      dateOfCreation: new Date().toISOString(),
      dateOfUpdate: new Date().toISOString(),
    }

    await sendComment(body);
    setComment('');
    const response = await getComments(taskId);
    setComments([...response]);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <label htmlFor='commentText' className={styles.label}>{`Комментарии (${comments.length})`}
          <textarea
            name="commentText"
            id="commentText"
            rows="4"
            placeholder='Текст комментария'
            value={comment}
            onChange={handleChange}
          ></textarea>
        </label>
        <ButtonDefault text='Добавить комментарий' view='success' handler={handleAddComment} />
      </div>
      {
        !errMsg
        ?
        comments.map(comment => <ViewComment comment={comment} comments={comments} setComments={setComments} key={comment.id} />)
        :
        <p className={styles.error_message}>{errMsg}</p>
      }
    </div>
  )


}

export default ViewComments;