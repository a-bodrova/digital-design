import styles from './header.module.scss';
import Logo from '../../assets/Logo.svg';
import React from "react";
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import UserWidget from '../userWidget/userWidget';

const Header = ({ path }) => {

  return (
    <header className={styles.header}>
      <Link to={AppRoute.START}>
        <img src={Logo} alt="logo"></img>
      </Link>

      {path !== AppRoute.START && (
        <>
          <nav className={styles.nav}>
            <Link
              to={AppRoute.TASKLIST}
              className={`${styles.nav__link} ${
                (path === AppRoute.TASKLIST
                  || path === AppRoute.TASK_ID) && styles.active
              }`}
            >
              Задачи
            </Link>
            <Link
              to={AppRoute.USERLIST}
              className={`${styles.nav__link} ${
                (path === AppRoute.USERLIST
                  || path === AppRoute.PROFILE)
                  && styles.active
              }`}
            >
              Пользователи
            </Link>
          </nav>
          <UserWidget />
        </>
      )}
    </header>
  );
}

export default Header;