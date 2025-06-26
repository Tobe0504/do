import React from "react";
import MembersList from "../MembersList";
import classes from "./SquadCard.module.css";

type SquadCardProps = {
  name: string;
  description: string;
  imageUrl: string;
  members: string[];
};

const SquadCard: React.FC<SquadCardProps> = ({
  name,
  description,
  imageUrl,
  members,
}) => {
  return (
    <div className={`${classes.dark} ${classes.card}`}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={classes.content}>
        <h3 className={classes.name}>{name}</h3>
        <p className={classes.description}>{description}</p>
        <div className={classes.members}>
          <MembersList members={members} />
        </div>
      </div>
    </div>
  );
};

export default SquadCard;
