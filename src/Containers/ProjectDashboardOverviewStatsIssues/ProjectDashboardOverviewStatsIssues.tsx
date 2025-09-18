import { Bubbles, Ellipsis } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Issue from "../../Components/Issue/Issue";
import Modal from "../../Components/Modal/Modal";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import {
  genericModalsTypes,
  issuesType,
  riskTypes,
} from "../../Utilities/types";
import IssueModalBody from "../IssueModalBody/IssueModalBody";
import styles from "./ProjectDashboardOverviewStatsIssues.module.css";

interface Props {
  risks: riskTypes[];
  issues: issuesType[];
  summary?: boolean;
}

const ProjectDashboardOverviewStatsIssues: React.FC<Props> = ({
  risks,
  issues,
  summary,
}) => {
  // States
  const [activeTab, setActiveTab] = useState("risks");
  const [modals, setModals] = useState<genericModalsTypes>({ detail: false });
  const [activeIssue, setActiveIssue] = useState<riskTypes | issuesType | null>(
    null
  );

  // Utils
  const options = {
    issue: [
      {
        title: "View Issue",
        action: () => {
          setModalTrue(setModals, "detail");
        },
      },
      {
        title: "Resolve Issue",
        action: () => {},
      },
      {
        title: "Archive Issue",
        action: () => {},
      },
      {
        title: "Escalate Issue",
        action: () => {},
      },
    ],
    risk: [
      {
        title: "View risk ",
        action: () => {
          setModalTrue(setModals, "detail");
        },
      },
      {
        title: "Add risk mitigation",
        action: () => {},
      },
    ],
  };

  // States
  const renderList = (list: riskTypes[] | issuesType[], type: string) => {
    const sliceEnd = summary ? 2 : undefined;
    return list?.slice(0, sliceEnd).map((item) => (
      <Issue
        item={item}
        type={type as any}
        onClick={() => {
          setActiveIssue(item);
        }}
        options={options}
      />
    ));
  };

  return (
    <>
      {modals?.detail && (
        <Modal
          onClose={() => setAllModalsFalse(setModals)}
          body={
            <IssueModalBody
              issue={activeIssue as riskTypes}
              onClose={() => {}}
              onUpdate={() => {}}
            />
          }
        />
      )}
      <div className={styles.wrapper}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("risks")}
            className={activeTab === "risks" ? styles.active : ""}
          >
            Risks
          </button>
          <button
            onClick={() => setActiveTab("issues")}
            className={activeTab === "issues" ? styles.active : ""}
          >
            Issues
          </button>
        </div>

        {/* Content */}
        <div className={styles.list}>
          {activeTab === "risks"
            ? renderList(risks, "risk")
            : renderList(issues, "issue")}
        </div>
      </div>
    </>
  );
};

export default ProjectDashboardOverviewStatsIssues;
