import { useState, useEffect } from 'react';
import styles from './viewComments.module.scss';
import ButtonDefault from '../buttons/buttonDefault/buttonDefault';
import ViewComment from '../viewComment/viewComment';
import { userStore } from '../../stores/usersStore/usersStore';
import { getComments, sendComment } from '../../api';

const ViewComments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const loadComments = async (id) => {
      try {
        const response = await getComments(id);
        const comments = [...response];
        setComments(comments);

      } catch (error) {
        setErrMsg(error.message);
      }
    }
    
    loadComments(taskId);
  }, [taskId, comments]);

  const { user } = userStore;

  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const handleAddComment = () => {
    const body = {
      taskId,
      userId: user.id,
      text: comment,
      dateOfCreation: new Date().toISOString(),
      dateOfUpdate: new Date().toISOString(),
    }

    sendComment(body);
    setComment('');
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
        comments.map(comment => <ViewComment comment={comment} key={comment.id} />)
        :
        <p className={styles.error_message}>{errMsg}</p>
      }
    </div>
  )


}

export default ViewComments;