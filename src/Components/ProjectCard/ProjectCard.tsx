import {
  MoreHorizOutlined,
  StarOutline,
  StarOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../../Context/ToastContext";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import { genericModalsTypes, optionsType } from "../../Utilities/types";
import MembersList from "../MembersList";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  title: string;
  description: string;
  tags?: string[];
  members?: string[];
  progress?: number;
  isFavorite?: boolean;
  options: optionsType[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags = [],
  members = [],
  progress = 0,
  isFavorite,
  options: optionsArr,
}) => {
  // States
  const [options, setOptions] = useState<genericModalsTypes>({
    options: false,
  });

  // Refs
  const optionsRef = useRef<null | HTMLDivElement>(null);

  // Hooks
  const { showToast } = useToast();

  // Effects
  useEffect(() => {
    const handleCloseOptions = (e: any) => {
      if (optionsRef?.current && !optionsRef?.current?.contains(e.target)) {
        setAllModalsFalse(setOptions);
      }
    };

    document?.addEventListener("mousedown", handleCloseOptions);

    return () => {
      document?.removeEventListener("mousedown", handleCloseOptions);
    };
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div
            onClick={() => {
              showToast("Added to favorites successfully 🎉", 3000);
            }}
          >
            {isFavorite ? <StarOutlined /> : <StarOutlineOutlined />}
          </div>
          <div>
            <MoreHorizOutlined
              onClick={() => {
                setModalTrue(setOptions, "options");
              }}
            />
            {options?.options && (
              <div className={styles.options} ref={optionsRef}>
                {optionsArr?.map((data) => {
                  return (
                    <div
                      onClick={() => {
                        data?.action && data?.action();
                      }}
                    >
                      {data?.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
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
