import React, { useEffect, useState } from 'react';

import styles from './FormWorkTimeEdit.module.scss';
import ButtonDefault from '../buttons/buttonDefault/buttonDefault';
import { editWorktime } from '../../api';
import { userStore } from '../../stores/usersStore/usersStore';

const FormWorkTimeEdit = ({onClose, taskId}) => {

  const { user } = userStore;

  const [timeForm, setTimeForm] = useState({
    time: 0,
    units: 'Минуты',
    comment: '',
  });

  const [sending, setSending] = useState(0);

  const [errMsg, setErrMsg] = useState(null);

  // useEffect(() => {
  //   let timeInMinutes = timeForm.time;

  //   if (timeForm.units === 'Часы') {
  //     timeInMinutes = timeForm.time * 60;
  //   } else if (timeForm.time === 'Дни') {
  //     timeInMinutes = timeForm.time * 60 * 24;
  //   }
  // }, [timeForm])

  useEffect(() => {

    const sendWorkTime = async (id, time, comment, userId) => {
       const res = await editWorktime(id, {
         timeInMinutes: time,
         comment,
         currentUser: userId,
       });

       console.log({res});
       return res;
    }

    // if (sending > 0) {
      let timeInMin = timeForm.time;

      if (timeForm.units === 'Часы') {
        timeInMin = timeForm.time * 60;
      } else if (timeForm.time === 'Дни') {
        timeInMin = timeForm.time * 60 * 24;
      }

      try {
        const res = sendWorkTime(taskId, timeInMin, timeForm.comment, user.id);
        console.log('res: ', res);

      } catch (error) {
        setErrMsg(error.message);
      }
    // }

    
  }, [sending, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSending(sending + 1);

    onClose();
  }

  const handleCancel = () => {
    onClose();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTimeForm({
      ...timeForm,
      [name]: value,
    });
  }
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <legend className={styles.title}>Запись о работе</legend>
      <div className={styles.divider}></div>
      <fieldset className={styles.fieldset}>
        <label htmlFor="time">Затраченное время
          <input
            type="text"
            id='time'
            name="time"
            defaultValue={0}
            placeholder='Введите время'
            onChange={handleChange}
          />
        </label>
        <label htmlFor="units">Единица измерения
          <select
            id='units'
            name='units'
            className={styles.select}
            onChange={handleChange}>
            <option value="Минуты">Минуты</option>
            <option value="Часы">Часы</option>
            <option value="Дни">Дни</option>
          </select>
        </label>
        <label htmlFor="about">Комментарий
          <textarea
            name="comment"
            placeholder='Оставьте комментарий'
            rows={4}
            onChange={handleChange}
          >
          </textarea>
        </label>
        {
          errMsg &&
            <div className={styles.error_message}>{errMsg}</div>
        }
      </fieldset>
      <div className={styles.divider}></div>
      <div className={styles.btn_container}>
        <ButtonDefault text='Добавить' view='primary' type='submit' />
        <ButtonDefault text='Отмена' view='default' handler={handleCancel} type='reset' />
      </div>
    </form>
  )
}

export default FormWorkTimeEdit;