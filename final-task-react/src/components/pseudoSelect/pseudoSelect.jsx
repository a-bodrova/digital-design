import React, { useState } from "react";
import styles from './pseudoSelect.module.scss';
import SelectCheckbox from "../SelectCheckbox/selectCheckbox";

// const TASK = {
//   id: 'string',
//   type: 'bug',
//   userId: 'string',
//   assignedId: 'string',
//   title: 'Заголовок',
//   description: 'Описание',
//   dateOfCreation: '2022-05-13T09:54:27.630Z',
//   dateOfUpdate: '2022-05-13T09:54:27.630Z',
//   timeInMinutes: '0',
//   status: 'opened',
//   rank: 'low',
// }

const PseudoSelect = ({ options, title, type }) => {

  const [isOpen, setIsOpen] = useState(false);

  const showCheckboxes = (e) => {
    setIsOpen(!isOpen);
  }

  return ( 
    <div className={styles.multiselect}>
      <div className={`${styles.selectBox} ${isOpen && styles.active} ${styles[type]}`} onClick={showCheckboxes}>
        {title}
      </div>
        {
          isOpen &&
          <div className={styles.checkboxes}>

            {
              options.map((option, index) => <SelectCheckbox
                                                id={index}
                                                labelText={option}
                                                key={index}
                                              />)
            }
          </div>
        }
    </div>
  );
}

export default PseudoSelect;