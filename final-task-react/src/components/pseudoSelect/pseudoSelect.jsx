import React, { useState } from "react";
import styles from './pseudoSelect.module.scss';
import SelectCheckbox from "../SelectCheckbox/selectCheckbox";

const PseudoSelect = ({ options, title, type, innerFilter, setInnerFilter }) => {

  const [isOpen, setIsOpen] = useState(false);

  const keys = Object.keys(options);
  const values = Object.values(options);

  const showCheckboxes = (e) => {
    setIsOpen(!isOpen);
  }

  return ( 
    <div className={styles.multiselect}>
      <div className={`${styles.selectBox} ${isOpen && styles.active} ${styles[type]}`} onClick={showCheckboxes}>
        {title}
      </div>
      <div className={`${styles.checkboxes} ${isOpen && styles.active}`}>

            {
              values.map((value, index) => <SelectCheckbox
                                                id={index}
                                                labelText={value}
                                                key={index}
                                                type={keys[index]}
                                                innerFilter={innerFilter}
                                                setInnerFilter={setInnerFilter}
                                              />)
            }
          </div>
    </div>
  );
}

export default PseudoSelect;