import React, { useState } from "react";
import styles from './pseudoSelect.module.scss';
import SelectCheckbox from "../SelectCheckbox/selectCheckbox";

/**
 * @typedef {*} OptionsType
 * {
 *   bug: true,
 *   task: false,
 * }
 */

const PseudoSelect = ({ options, title, type, innerFilter, setInnerFilter }) => {

  const [isOpen, setIsOpen] = useState(false);

  // const selected = 
  
  const names = Object.keys(options);
  const labels = Object.values(options);

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
              labels.map((label, index) => <SelectCheckbox
                                                id={index}
                                                labelText={label}
                                                key={index}
                                                type={names[index]}
                                                innerFilter={innerFilter}
                                                setInnerFilter={setInnerFilter}
                                              />)
            }
          </div>
        }
    </div>
  );
}

export default PseudoSelect;