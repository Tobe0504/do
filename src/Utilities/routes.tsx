import {
  Archive,
  Bell,
  Info,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  Sun,
  Search as SearchIcon,
  Infinity,
} from "lucide-react";
import Conversations from "../Containers/Conversations/Conversations";
import Dashboard from "../Containers/Dashboard/Dashboard";
import ForgotPassword from "../Containers/ForgotPassword/ForgotPassword";
import Home from "../Containers/Home/Home";
import MentionsPage from "../Containers/Mentions/Mentions";
import Onboarding from "../Containers/Onboarding/Onboarding";
import Organizations from "../Containers/Organizations/Organizations";
import ProjectDashboard from "../Containers/ProjectDashboard/ProjectDashboard";
import ResetPassword from "../Containers/ResetPassword/ResetPassword";
import Search from "../Containers/Search/Search";
import SignIn from "../Containers/SignIn/SignIn";
import SignUp from "../Containers/SignUp/SignUp";
import ThinkSpace from "../Containers/ThinkSpace/ThinkSpace";
import ThinkSpaceCanvas from "../Containers/ThinkSpaceCanvas/ThinkSpaceCanvas";

export const routes = Object.freeze({
  BASE_URL: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  CREATE: "/create",
  VIEW: "/view/:id",
  EDIT: "/edit/:id",
  DOs: "/do",
  DASHBOARD: "/dashboard",
  ORGANIZATIONS: "/hives",
  ORGANIZATION_OVERVIEW: "/hives/:organizationId/overview",
  ORGANIZATIONS_MEMBERS: "/hives/:organizationId/members-and-roles",
  ORGANIZATION_TEAMS: "/hives/:organizationId/squads",
  ORGANIZATION_CHAT: "/hive/:organizationId/chat",
  ORGANIZATION_ACTIVITY: "/hives/:organizationId/activity",
  ORGANIZATION_RECIGNITION: "/hives/:organizationId/recognition",
  ORGANIZATION_VIBE_ROOM: "/hives/::organizationId/vibe-room",
  ORGANIZATION_RESOURCES: "/hives/:organizationId/resources",
  ORGANIZATION_SECRETS: "/hives/:organizationId/secrets",
  ONBOARDING: "/onboarding",
  PROJECT_OVERVIEW: "/hives/:organizationId/project/:projectId",
  CONVERSATIONS: "/conversations",
  MENTIONS: "/conversations/mentions",
  GENERAL_CONVERSATIONS: "/conversations/general",
  CHAT_CONVERSATION: "/conversations/1",
  SEARCH: "/search",
  NOTIFICATIONS: "/notifications",
  TEAMS: "/squads",
  THINK_SPACE: "/think-space",
});

export const routeComponents = [
  {
    title: "Home",
    component: <Home />,
    properties: null,
    route: routes.BASE_URL,
    icon: null,
  },
  {
    title: "Sign In",
    component: <SignIn />,
    properties: null,
    route: routes.SIGN_IN,
    icon: null,
  },
  {
    title: "Sign Up",
    component: <SignUp />,
    properties: null,
    route: routes.SIGN_UP,
    icon: null,
  },
  {
    title: "Forgot Password",
    component: <ForgotPassword />,
    properties: null,
    route: routes.FORGOT_PASSWORD,
    icon: null,
  },

  {
    title: "Reset Password",
    component: <ResetPassword />,
    properties: null,
    route: routes.RESET_PASSWORD,
    icon: null,
  },

  {
    title: "Dashboard",
    component: <Dashboard />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.DASHBOARD,
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Search",
    component: <Search />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.SEARCH,
    icon: <SearchIcon size={20} />,
  },
  {
    title: "Do's",
    component: <Dashboard />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.DOs,
    icon: <Sun size={20} />,
  },
  {
    title: "Conversations",
    component: <Conversations />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.GENERAL_CONVERSATIONS,
    icon: <MessagesSquare size={20} />,
  },
  {
    title: "Think Space",
    component: <ThinkSpace />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.THINK_SPACE,
    icon: <Infinity size={20} />,
  },
  {
    title: "Tobe's Think Space",
    component: <ThinkSpaceCanvas />,
    properties: ["isProtected"],
    route: `${routes.THINK_SPACE}/1`,
    icon: null,
  },
  {
    title: "Notifications",
    component: <Dashboard />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.NOTIFICATIONS,
    icon: <Bell size={20} />,
  },

  {
    title: "Organizations",
    component: <Organizations />,
    properties: ["isProtected"],
    route: routes.ORGANIZATIONS,
    icon: null,
  },
  {
    title: "Onboarding",
    component: <Onboarding />,
    properties: [""],
    route: routes.ONBOARDING,
    icon: null,
  },
  {
    title: "Overview",
    component: <Onboarding />,
    properties: ["isOrganization", "isProtected"],
    route: routes.ORGANIZATION_OVERVIEW,
    icon: "🌄",
  },
  {
    title: "Teams & Roles",
    component: <Onboarding />,
    properties: ["isOrganization", "isProtected"],
    route: routes.ORGANIZATION_TEAMS,
    icon: "👥",
  },
  {
    title: "Chat",
    component: <Onboarding />,
    properties: ["isOrganization", "isProtected"],
    route: routes.ORGANIZATION_TEAMS,
    icon: "👥",
  },

  {
    title: "Project Overview",
    component: <ProjectDashboard />,
    properties: [, "isProtected"],
    route: routes.PROJECT_OVERVIEW,
    icon: "👥",
  },

  {
    title: "Mentions",
    component: <MentionsPage />,
    properties: [, "isProtected"],
    route: routes.MENTIONS,
  },
];

export const sideNavFooterRoutes = [
  {
    title: "Settings",
    component: <Dashboard />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.DASHBOARD,
    icon: <Settings size={20} />,
  },
  {
    title: "Help & Support",
    component: <Dashboard />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.DASHBOARD,
    icon: <Info size={20} />,
  },
  {
    title: "Archive",
    component: <Dashboard />,
    properties: ["isProtected", "isSideNavRoute"],
    route: routes.DASHBOARD,
    icon: <Archive size={20} />,
  },
];
