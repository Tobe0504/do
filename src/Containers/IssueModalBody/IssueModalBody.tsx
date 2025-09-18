// IssueModal.tsx
import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import Textarea from "../../Components/Textarea/Textarea";
import { riskTypes } from "../../Utilities/types";
import styles from "./IssueModalBody.module.css";
import { projects } from "../../Utilities/dummyData";

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

interface IssueModalProps {
  issue: riskTypes;
  onClose: () => void;
  onUpdate: (updatedIssue: riskTypes) => void; // Callback to update issue data
}

const IssueModal: React.FC<IssueModalProps> = ({
  issue,
  onClose,
  onUpdate,
}) => {
  const [newComment, setNewComment] = useState("");
  const [assignedTo, setAssignedTo] = useState(issue.owner);
  const [status, setStatus] = useState(issue.status);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger entrance animation
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Delay to allow exit animation
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = issue?.comments
        ? [
            ...issue?.comments,
            {
              id: Date.now().toString(),
              user: "Current User", // Replace with actual user
              text: newComment,
              date: new Date().toLocaleString(),
            },
          ]
        : [
            {
              id: Date.now().toString(),
              user: "Current User", // Replace with actual user
              text: newComment,
              date: new Date().toLocaleString(),
            },
          ];
      const updatedIssue = {
        ...issue,
        comments: updatedComments,
        updatedDate: new Date().toLocaleString(),
      };
      onUpdate(updatedIssue);
      setNewComment("");
    }
  };

  const handleAssign = () => {
    const updatedIssue = {
      ...issue,
      owner: assignedTo,
      updatedDate: new Date().toLocaleString(),
    };
    onUpdate(updatedIssue);
  };

  const handleStatusChange = (newStatus: riskTypes["status"]) => {
    setStatus(newStatus);
    const updatedIssue = {
      ...issue,
      status: newStatus,
      updatedDate: new Date().toLocaleString(),
    };
    onUpdate(updatedIssue);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ff4d4f"; // Red
      case "Medium":
        return "#ffa940"; // Orange
      case "Low":
        return "#ffd666"; // Yellow
      default:
        return "#ffffff";
    }
  };

  return (
    <div
      className={`${styles.modalContent}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h2 className={styles.title}>{issue.title}</h2>
            <div className={styles.meta}>
              <span>Opened by Tobe</span>
              <span> on {"2025-03-28"}</span>
              <span> • Last updated {"2025-03-28"}</span>
            </div>
          </div>
          <div className={styles.descriptionSection}>
            <h3 className={styles.sectionTitle}>Description</h3>
            <p className={styles.description}>{issue.description}</p>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarTitle}>Status</h4>
              <div className={styles.statusButtons}>
                <Button
                  type={status === "Open" ? "secondary" : "tertiary"}
                  className={`${styles.statusButton} ${
                    status === "Open" ? styles.active : ""
                  }`}
                  onClick={() => handleStatusChange("Open")}
                >
                  Open
                </Button>
                <Button
                  type={status === "Mitigating" ? "secondary" : "tertiary"}
                  className={`${styles.statusButton} ${
                    status === "Mitigating" ? styles.active : ""
                  }`}
                  onClick={() => handleStatusChange("Mitigating")}
                >
                  Mitigating
                </Button>
                <Button
                  type={status === "Resolved" ? "secondary" : "tertiary"}
                  className={`${styles.statusButton} ${
                    status === "Resolved" ? styles.active : ""
                  }`}
                  onClick={() => handleStatusChange("Resolved")}
                >
                  Resolved
                </Button>
              </div>
            </div>
            <div className={styles.sidebarSection}>
              <h4 className={`${styles.sidebarTitle} `}>Severity</h4>
              <p
                className={`${styles.severity} ${
                  styles[issue.severity.toLowerCase()]
                }`}
              >
                {issue.severity}
              </p>
            </div>
            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarTitle}>Assignee</h4>

              <div>
                {issue.owner && (
                  <div className={styles.currentAssigneeContainer}>
                    <img src={projects?.[0]?.members?.[0]} alt={issue?.owner} />
                    <p className={styles.currentAssignee}>
                      <span>
                        Currently assigned to <span>{issue.owner} Barker</span>
                      </span>
                      <Button type="tertiary">Re-assign</Button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.conversations}>
            <h3 className={styles.sectionTitle}>Conversations</h3>
            <div className={styles.commentList}>
              {issue?.comments?.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <img
                      src={projects?.[0]?.members?.[0]}
                      alt={comment?.user}
                    />
                    <div className={styles.commentTextContainer}>
                      <span className={styles.commentUser}>{comment.user}</span>
                      <span className={styles.commentDate}>
                        commented {comment.date}
                      </span>
                      <p className={styles.commentText}>{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.newComment}>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment"
          />
          <Button onClick={handleAddComment} className={styles.addButton}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
