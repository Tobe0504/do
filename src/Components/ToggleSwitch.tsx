import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  onChange?: (value: boolean) => void;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

export const ToggleSwitch: React.FC<Props> = ({
  onChange,
  checked,
  setChecked,
}) => {
  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full  transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
        checked ? "bg-[#e63e21]" : "bg-transparent"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
};
