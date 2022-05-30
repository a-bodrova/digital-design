import React from "react";
import styles from './pageTitle.module.scss';
import ButtonDefault from "../buttons/buttonDefault/buttonDefault";
import TaskStatus from '../taskStatus/taskStatus';

const PageTitle = ({title, buttons, status, handler}) => {
  return (
  <section className={styles.pageTitle}>
    <div className={styles.title}>{title}
      {
        status &&
          <TaskStatus status={status} />
      }
    </div>
    <div className={styles.buttons_container}>
      { buttons &&
          buttons.map((buttonInfo, index) => <ButtonDefault
                text={buttonInfo.text}
                view={buttonInfo.view}
                handler={buttonInfo.handler || (() => handler(buttonInfo.newStatus))}
                key={index}
              />
          )
      }
    </div>
  </section>
  )
}

export default PageTitle;