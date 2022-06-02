import React from 'react';
import { Link } from 'react-router-dom';

import styles from './UserItem.module.scss';
import { AppRoute } from '../../constants';

const UserItem = ({userInfo}) => {

  return (
    <Link to={`${AppRoute.USERLIST}/${userInfo.id}`}
      className={styles.item}
    >{userInfo.username}
    </Link>
  )
}

export default UserItem;