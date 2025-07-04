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
};
