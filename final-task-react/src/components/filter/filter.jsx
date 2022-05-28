import React, { useState } from "react";
import styles from './filter.module.scss';
import { observer } from "mobx-react-lite";
import PseudoSelect from '../pseudoSelect/pseudoSelect';
import { userStore } from '../../stores/usersStore/usersStore';
import { typeText, statusText, rankText } from "../../constants";
import ButtonDefault from '../buttons/buttonDefault/buttonDefault';
import { tasks } from "../../stores/tasksStore/tasks";

/**
 * @params filter: {
 * }
 * 
 */

const Filter = observer(({filter, setFilter}) => {

  const { allUsernames } = userStore;
  
  const [innerFilter, setInnerFilter] = useState({...tasks.filter});

  const handleTitle = (e) => {
    const { value } = e.target;
    setInnerFilter({ ...innerFilter, query: value });
  }

  const handleFilter = async (e) => {
    e.preventDefault();

    setFilter({ ...filter, ...innerFilter });
    // await tasks.getTasks(filter, 0, 10);
    // console.log(filter);

  }

  return (
    <>
      <form className={styles.filter_container} onSubmit={handleFilter}>

        <PseudoSelect
          options={typeText}
          title="Тип"
          type='type'
          innerFilter={innerFilter}
          setInnerFilter={setInnerFilter}
        />

        <input
          type="text"
          placeholder="Название задачи"
          className={styles.input_title}
          onInput={handleTitle}
        />

        <PseudoSelect
          options={allUsernames}
          title="Пользователь"
          type='username'
          setInnerFilter={setInnerFilter}
        />
        
        <PseudoSelect
          options={statusText}
          title="Статус"
          type='status'
          setInnerFilter={setInnerFilter}
        />

        <PseudoSelect
          options={rankText}
          title="Приоритет"
          type='rank'
          setInnerFilter={setInnerFilter}
        />

        <ButtonDefault
          view='primary'
          text="Применить"
          handler={handleFilter}
        />

      </form>
    </>
  );
})

export default Filter;