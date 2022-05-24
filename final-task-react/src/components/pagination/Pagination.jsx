import React from 'react';
import styles from './pagination.module.scss';
import ButtonDefault from '../buttons/buttonDefault/buttonDefault';

const Pagination = ({ currentPage, setCurrentPage, currentChunkLength, tasksTotal, limit }) => {

  const pagesTotal = Math.ceil(tasksTotal / limit);
  console.log({currentPage, limit});

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }
  
  const handleNext = () => {
    if (currentPage < pagesTotal) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ButtonDefault
          text="Назад"
          view={ currentPage === 0 ? 'disabled' : 'default' }
          handler={handlePrev}
        />
        <ButtonDefault text={currentPage + 1} view='primary' />
        <ButtonDefault
          text='Вперед'
          view={ currentPage < pagesTotal ? 'default' : 'disabled' }
          handler={handleNext}
        />
      </div>
      <span className={styles.viewed}>{`Показано ${currentPage * limit + 1} - ${currentPage * limit + currentChunkLength} из ${tasksTotal}`}</span>
    </div>
  )
}

export default Pagination;