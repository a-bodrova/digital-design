import React from 'react';
import styles from './viewComment.module.scss';
import { userStore } from '../../stores/usersStore/usersStore';
import moment from 'moment';
import { deleteComment } from '../../api';

const ViewComment = ({comment}) => {

  const { allUsers, user } = userStore;
  const { dateOfUpdate } = comment;
  const formattedDate = moment(dateOfUpdate).format('DD.MM.YY HH:MM');

  const authorOfComment = allUsers.filter(user => comment.userId === user.id).pop();
  const isUserAuthor = user.id === comment.userId;

  const handleDeleteComment = () => {
    deleteComment(comment.id);
  }

  return (
      <div className={styles.block}>
        <p className={styles.label}>
          {
            `${authorOfComment.username} (${formattedDate})`
          }
          {
            isUserAuthor &&
              <span className={styles.delete_btn} onClick={handleDeleteComment}>Удалить</span>
          }
        </p>
        <p className={styles.text}>{comment.text}</p>
      </div>
  )
}

export default ViewComment;