import React from "react";
import styles from './headerDropdown.module.scss';
import { Link } from "react-router-dom";
import { AppRoute } from "../../constants";
import { userStore } from '../../stores/usersStore/usersStore';
import { action } from "mobx";
import { observer } from "mobx-react-lite";

const HeaderDropdown = observer(() => {

  const handleExit = action(() => {
    userStore.user = '';
  });

  return (
    <ul className={ styles.drop_menu }>
      <Link to={ AppRoute.PROFILE }>Посмотреть профиль</Link>
      <Link to={ AppRoute.START } className={ styles.danger__item } onClick={handleExit}>Выйти из системы</Link>
    </ul>
  );
})

export default HeaderDropdown;