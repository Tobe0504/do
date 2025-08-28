import React, { useState } from "react";
import { issuesType, riskTypes } from "../../Utilities/types";
import styles from "./ProjectDashboardOverviewStatsIssues.module.css";

interface Props {
  risks: riskTypes[];
  issues: issuesType[];
}

const ProjectDashboardOverviewStatsIssues: React.FC<Props> = ({
  risks,
  issues,
}) => {
  const [activeTab, setActiveTab] = useState("risks");

  const renderList = (list: riskTypes[] | issuesType[], type: string) => {
    return list.map((item) => (
      <div key={item.id} className={styles.card}>
        <div
          className={`${styles.severity} ${
            styles[item.severity.toLowerCase()]
          }`}
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
        </div>
      </div>
    ));
  };

  return (
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
  );
};

export default ProjectDashboardOverviewStatsIssues;
