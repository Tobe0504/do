import { LucideIcon } from "lucide-react";

export type onboardingAnswersType = {
  whatToManage: string;
  vibe: string;
};

export type genericModalsTypes = {
  [key: string]: boolean;
};

export type navItemTypes = {
  title: string;
  route?: string;
  isActive?: boolean;
  description?: string;
  id: string;
  isBordered?: boolean;
  icon?: LucideIcon;
};

export type TaskType = {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "done";
  [key: string]: any;
};

export type optionsType = {
  title: string;
  action?: (data?: any) => void;
  condition?: boolean;
  icon?: React.ReactNode;
  group?: string;
};

export type breadCrumbNavItemTypes = {
  title: string;
  route: string;
};

export type comments = {
  id: string;
  user: string;
  text: string;
  date: string;
};

export type riskTypes = {
  id: number;
  title: string;
  description: string;
  severity: string;
  owner: string;
  status: string;
  comments?: comments[];
};

export type issuesType = {
  id: number;
  title: string;
  description: string;
  severity: string;
  owner: string;
  status: string;
  comments?: comments[];
};

export type issueOptionsTypes = {
  title: string;
  action: () => void;
};
