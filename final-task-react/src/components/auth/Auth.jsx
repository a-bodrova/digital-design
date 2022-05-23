import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';
import { useNavigate } from "react-router-dom";
import styles from './auth.module.scss';
import ButtonSuccess from "../buttons/buttonSuccess/buttonSuccess";
import { userStore } from '../../stores/usersStore/usersStore';
import { getAuth } from "../../api";
import { AppRoute } from "../../constants";

const Auth = observer(() => {

  const [ errorMsg, setErrorMsg ] = useState('');

  const navigate = useNavigate();

  const handleSubmit = action(async (e) => {
    e.preventDefault();

    const login = e.target[1].value;
    const password = e.target[2].value;

    try {

      const response = await getAuth(login, password);
      userStore.user = { ...response.data, password };

    } catch (error) {

      if (!error.response) {

        setErrorMsg('Нет соединения с сервером');

      } else {

        setErrorMsg(error.response.data.message);
      }
    }

    if (userStore.user.id) {
      navigate(AppRoute.TASKLIST);
    }
  });

  return (
    <section className={ styles.container }>
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <legend className={styles.title}>Авторизация</legend>
      <fieldset className={styles.fieldset}>
        <label htmlFor="login" className={styles.label}>
          Логин
          <input
            type="text"
            id="login"
            autoComplete="off"
            className={errorMsg ? styles.input_error : ''}
            required
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          Пароль
          <input
            type="password"
            id="password"
            className={errorMsg ? styles.input_error : ''}
            required
          />
        </label>
      </fieldset>
      <ButtonSuccess text={"Вход"} />
      {
        errorMsg && (
          <div className={styles.error_line}>{errorMsg}</div>
        )
      }
    </form>
    </section>
  );
});

export default Auth;