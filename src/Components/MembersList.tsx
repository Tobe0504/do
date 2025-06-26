import styles from "./ProjectCard/ProjectCard.module.css";

type MembersListTypes = {
  members: string[];
};

const MembersList = ({ members }: MembersListTypes) => {
  return (
    <div className={styles.members}>
      {members.slice(0, 3).map((img, i) => (
        <img key={i} src={img} className={styles.avatar} alt="Member" />
      ))}
      {members.length > 3 && (
        <span className={styles.more}>+{members.length - 3}</span>
      )}
    </div>
  );
};

export default MembersList;
