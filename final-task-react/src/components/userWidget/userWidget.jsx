import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import styles from './userWidget.module.scss';
import avatar from '../../assets/avatar-anonymous.jpg';
import { userStore } from '../../stores/usersStore/usersStore';
import HeaderDropdown from '../headerDropdown/headerDropdown';

const UserWidget = observer(() => {

  const { user } = userStore;

  const [ isOpenDrop, setIsOpenDrop ] = useState(false);

  const handleAvatar = () => {
    setIsOpenDrop(!isOpenDrop);
  }

  return (
    <div className={styles.user}>
      <span className={styles.user__name}>{user.username}</span>
      <div className={styles.avatar__border} onClick={handleAvatar}>
        <img className={styles.avatar} src={user.photoUrl ? user.photoUrl : avatar} alt="avatar" />

        {isOpenDrop && <HeaderDropdown />}
      </div>
    </div>
  );
})

export default UserWidget;