import React from "react";
import styles from './taskRank.module.scss';
import { rankText } from '../../constants';
import low from '../../assets/low_rank.svg';
import medium from '../../assets/medium_rank.svg';
import high from '../../assets/high_rank.svg';

const TaskRank = ({ rank }) => {

  const image = rank === 'low' ? low : rank === 'high' ? high : medium;

  return (
    <span className={styles.common + ' ' + styles[rank]}>
      <img className={styles.rank_image} src={image} alt='' />
      {rankText[rank]}
    </span>
  )
}

export default TaskRank;