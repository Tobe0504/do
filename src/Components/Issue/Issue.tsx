import { Bubbles, Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import {
  genericModalsTypes,
  issueOptionsTypes,
  issuesType,
  riskTypes,
} from "../../Utilities/types";
import Options from "../Options/Options";
import styles from "./Issue.module.css";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  item: riskTypes | issuesType;
  type: "risk" | "issue";
  options: { risk: issueOptionsTypes[]; issue: issueOptionsTypes[] };
}

const Issue: React.FC<Props> = ({ item, type, options, ...props }) => {
  // Refs
  const optionsRef = useRef<null | HTMLDivElement>(null);

  //   States
  const [optionsState, setOptionsState] = useState<genericModalsTypes>({
    options: false,
  });

  // Effects
  useEffect(() => {
    const handleCloseOptions = (e: any) => {
      if (optionsRef?.current && !optionsRef?.current?.contains(e.target)) {
        setAllModalsFalse(setOptionsState);
      }
    };

    document?.addEventListener("mousedown", handleCloseOptions);

    return () => {
      document?.removeEventListener("mousedown", handleCloseOptions);
    };
  }, []);

  return (
    <div key={item.id} className={styles.card} onClick={props.onClick}>
      <div
        className={`${styles.severity} ${styles[item.severity.toLowerCase()]}`}
      >
        {item.severity}
      </div>
      <div className={styles.details}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <div className={styles.meta}>
          <span>Owner: {item.owner}</span>
          <span>Status: {item.status}</span>
        </div>
        <div className={styles.ai}>
          <Bubbles size={16} color="#e63e21" />
          <p>This issue is crucial to fix, please attend to it now. </p>
        </div>
      </div>
      <div className={styles.optionsContainer}>
        <Ellipsis
          size={16}
          onClick={() => setModalTrue(setOptionsState, "options")}
        />
        {optionsState?.options && (
          <Options
            options={options[type as "risk" | "issue"]}
            ref={optionsRef}
          />
        )}
      </div>
    </div>
  );
};

export default Issue;
