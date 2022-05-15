import React, { useState } from "react";
import ButtonDefault from "../buttons/buttonDefault/buttonDefault";
import styles from './formUserEdit.module.scss';
import { observer } from 'mobx-react-lite';
import { action } from "mobx";
import { userStore } from "../../stores/usersStore/usersStore";

const FormUserEdit = observer(({ user, onClose }) => {

  const [userInfo, setUser] = useState({
    username: user.username,
    about: user.about,
    photoUrl: user.photoUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({...userInfo, [name]: value});
  }

  const handleSubmit = action((e) => {
    e.preventDefault();

    userStore.editUser({
      ...userInfo,
      id: user.id,
      login: user.login,
      password: user.password,
    });

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
            defaultValue={userInfo.username}
            placeholder='Введите имя'
            onChange={handleChange}
          />
        </label>
        <label htmlFor="photo">URL фотографии
          <input
            type="text"
            name="photoUrl"
            defaultValue={userInfo.photoUrl ? userInfo.photoUrl : undefined}
            placeholder='Введите URL'
            onChange={handleChange}
          />
        </label>
        <label htmlFor="about">О себе
          <textarea
            name="about"
            value={user.about ? userInfo.about : undefined}
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