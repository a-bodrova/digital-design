import React, { useState } from "react";
import styles from './selectCheckbox.module.scss';

const SelectCheckbox = ({ id, labelText, type, innerFilter, setInnerFilter }) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setIsChecked(!isChecked);
    setInnerFilter({...innerFilter, [name]: checked});
  }

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name={type}
        id={id}
        // value={labelText}
        defaultChecked={isChecked}
        onChange={handleChange}
      />
      {labelText}
    </label>
  )
}

export default SelectCheckbox;