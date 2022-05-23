import React from "react";
import styles from './pageTitle.module.scss';
import ButtonDefault from "../buttons/buttonDefault/buttonDefault";
import TaskStatus from '../taskStatus/taskStatus';

const PageTitle = ({title, buttons, status}) => {
  return (
  <section className={styles.pageTitle}>
    <span className={styles.title}>{title}
      {
        status &&
          <TaskStatus status={status} />
      }
    </span>
    <div className={styles.buttons_container}>
      {
        buttons.map((buttonInfo, index) => <ButtonDefault
              text={buttonInfo.text}
              view={buttonInfo.view}
              handler={buttonInfo.handler}
              key={index}
            />
        )
      }
    </div>
  </section>
  )
}

export default PageTitle;