import React, { useState } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggle}
        className={styles.input}
      />
      <span className={styles.box}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
