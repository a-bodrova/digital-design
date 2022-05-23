import React from "react";
import styles from './filter.module.scss';
import { observer } from "mobx-react-lite";
import PseudoSelect from '../pseudoSelect/pseudoSelect';
import { userStore } from '../../stores/usersStore/usersStore';
import { typeText, statusText, rankText } from "../../constants";
import ButtonDefault from '../buttons/buttonDefault/buttonDefault';

const Filter = observer(() => {

  const { allUsernames } = userStore;

  return (
    <>
      <section className={styles.filter_container}>
        <PseudoSelect options={Object.values(typeText)} title="Тип" type={'type'} /> 
        <input type="text" placeholder="Название задачи" className={styles.input_title} />
        <PseudoSelect options={allUsernames} title="Пользователь" type={'user'} />
        <PseudoSelect options={Object.values(statusText)} title="Статус" type={'status'} />
        <PseudoSelect options={Object.values(rankText)} title="Приоритет" type={'rank'} />
        <ButtonDefault view='primary' text="Применить" />
      </section>
    </>
  );
})

export default Filter;