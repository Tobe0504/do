import { Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchResult.module.css";

export type SearchResult = {
  id: string;
  label: string;
  description?: string;
  route: string;
};

type Props = {
  item: SearchResult;
  isActive?: boolean;
  onSelect?: (item: SearchResult) => void;
};

const SearchResult: React.FC<Props> = ({ item, isActive, onSelect }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    } else {
      navigate(item.route);
    }
  };

  return (
    <div
      className={`${styles.resultItem} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <div className={styles.left}>
        <span className={styles.icon}>
          <Search size={16} />
        </span>
        <div className={styles.texts}>
          <span className={styles.label}>{item.label}</span>
          {item.description && (
            <span className={styles.description}>{item.description}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
