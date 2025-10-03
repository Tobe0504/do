import React from "react";

interface Props {
  status: string;
}

const StatusPill: React.FC<Props> = ({ status = "Draft" }) => {
  return <p className="border-1 text-sm font-medium ">{status}</p>;
};

export default StatusPill;
