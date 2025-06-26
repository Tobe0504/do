import React from "react";
import MembersList from "../MembersList";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  title: string;
  description: string;
  tags?: string[];
  members?: string[]; // image URLs
  progress?: number; // 0 - 100
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags = [],
  members = [],
  progress = 0,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <MembersList members={members} />
          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
