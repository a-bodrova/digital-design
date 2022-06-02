import React from 'react';
import styles from './pagination.module.scss';
import ButtonDefault from '../buttons/buttonDefault/buttonDefault';
import ButtonDigit from '../buttons/buttonDigit/buttonDigit';

const Pagination = ({ currentPage, setCurrentPage, currentChunkLength, itemsTotal, limit }) => {

  const pagesTotal = Math.floor(itemsTotal / limit);

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

        {
          [...Array(Math.ceil(itemsTotal / limit))].map((page, index) => (
            <ButtonDigit
              key={index}
              text={index + 1}
              view={index === currentPage ? 'primary' : 'default'}
              handler={() => setCurrentPage(index)}
            />
          ))
        }

        <ButtonDefault
          text='Вперед'
          view={ currentPage < itemsTotal / limit - 1 ? 'default' : 'disabled' }
          handler={handleNext}
        />
      </div>
      <span
        className={styles.viewed}
        >
        {
          itemsTotal > 0
          ?
          `Показано ${currentPage * limit + 1} - ${currentPage * limit + currentChunkLength} из ${itemsTotal}`
          :
          `Показано 0 из 0`
        }
      </span>
    </div>
  )
}

export default Pagination;