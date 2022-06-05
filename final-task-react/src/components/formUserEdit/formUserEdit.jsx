import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import { action } from "mobx";

import styles from './formUserEdit.module.scss';
import { userStore } from "../../stores/usersStore/usersStore";
import ButtonDefault from "../buttons/buttonDefault/buttonDefault";

const FormUserEdit = observer(({ user, onClose, handler }) => {

  const [userData, setUserData] = useState({
    username: user.username,
    about: user.about,
    photoUrl: user.photoUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleSubmit = action((e) => {
    e.preventDefault();

    userStore.editUser({
      ...userData,
      id: user.id,
      login: user.login,
      password: user.password,
    });

    handler({
      ...userData,
      id: user.id,
      login: user.login,
      password: user.password,
    })

    onClose();
  })

  return (
    <form className={styles.editUser} onSubmit={handleSubmit}>
      <legend className={styles.title}>Редактирование пользователя</legend>
      <div className={styles.divider}></div>
      <fieldset className={styles.fieldset}>
        <label htmlFor="username">Имя пользователя
          <input
            type="text"
            name="username"
            defaultValue={userData.username}
            placeholder='Введите имя'
            onChange={handleChange}
          />
        </label>
        <label htmlFor="photo">URL фотографии
          <input
            type="text"
            name="photoUrl"
            defaultValue={userData.photoUrl ? userData.photoUrl : undefined}
            placeholder='Введите URL'
            onChange={handleChange}
          />
        </label>
        <label htmlFor="about">О себе
          <textarea
            name="about"
            value={user.about ? userData.about : undefined}
            placeholder='Введите текст'
            rows={4}
            onChange={handleChange}
            >
          </textarea>
        </label>
      </fieldset>
      <div className={styles.divider}></div>
      <div className={styles.btn_container}>
        <ButtonDefault text={'Сохранить'} view={'primary'} type={'submit'} />
        <ButtonDefault text={'Отмена'} view={'default'} type={'reset'} handler={onClose} />
      </div>
      
    </form>
  )
})

export default FormUserEdit;