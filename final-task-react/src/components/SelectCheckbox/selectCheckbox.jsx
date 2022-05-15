import React, { useState } from "react";
import styles from './selectCheckbox.module.scss';

const SelectCheckbox = ({ id, labelText }) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <label htmlFor={id} className={styles.label}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name={id}
        id={id}
        value={labelText}
        checked={isChecked}
        onChange={handleChange}
      />
      {labelText}
    </label>
  )
}

export default SelectCheckbox;