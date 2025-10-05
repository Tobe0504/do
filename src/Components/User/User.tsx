import React, { useEffect, useRef, useState } from "react";
import classes from "./User.module.css";
import { projects } from "../../Utilities/dummyData";
import Options from "../Options/Options";
import { optionsType } from "../../Utilities/types";

interface Props {
  options?: optionsType[];
  showDropdown?: boolean;
}

const User: React.FC<Props> = ({ options, showDropdown = true }) => {
  // Refs
  const optionsRef = useRef<HTMLDivElement>(null);

  //   States
  const [showOptions, setShowOptions] = useState(false);

  // Effects
  useEffect(() => {
    const closeOptions = (e: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", closeOptions);

    return () => {
      document.removeEventListener("mousedown", closeOptions);
    };
  }, []);

  return (
    <div className={classes.user}>
      <img
        src={projects[0].members[0]}
        width={16}
        height={16}
        onClick={() => setShowOptions((prevState) => !prevState)}
        title="Profile"
      />
      {showOptions && showDropdown && (
        <div>
          <Options options={options as optionsType[]} ref={optionsRef} />
        </div>
      )}
    </div>
  );
};

export default User;
