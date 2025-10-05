import { Command, Option } from "lucide-react";
import React, { act, useState } from "react";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";
import Input from "../../Components/Input/Input";
import SearchResult from "../../Components/SearchResult/SearchResult";
import { inputChangeHandler } from "../../HelperFunctions/inputChangeHandler";
import { useShortcuts } from "../../Hooks/useShortcuts";
import Logo from "../Logo/Logo";
import classes from "./Search.module.css";

const latestSearches = [
  { id: "1", label: "Test the Production" },
  { id: "2", label: "Create Interactive Elements" },
];
const quickActions = [
  { id: "a", label: "Create new task" },
  { id: "b", label: "Create new template" },
];

const results = [
  {
    id: "1",
    label: "Test the Production",
    description: "Navigate to production test page",
    route: "/production",
  },
  {
    id: "2",
    label: "Create Interactive Elements",
    description: "Open design playground",
    route: "/interactive",
  },
];

const Search = () => {
  // States
  const [searchKey, setSearchKey] = useState("");

  // Build shortcut map dynamically
  const shortcutMap: Record<string, (e: KeyboardEvent) => void> = {};

  // Latest searches: Cmd+index
  latestSearches.forEach((item, index) => {
    const combo = `Meta+${index + 1}`;
    shortcutMap[combo] = () => setSearchKey(item.label);
  });

  // Quick actions: Alt+index
  quickActions.forEach((item, index) => {
    const combo = `Alt+${index + 1}`;
    shortcutMap[combo] = () => setSearchKey(item.label);
  });

  // Install the shortcuts
  useShortcuts(shortcutMap);

  return (
    <DashboardLayout noHeader className={classes.container}>
      <section className={classes.searchContainer}>
        <Logo />

        <h2>Quick actions & search</h2>
        <Input
          placeholder="Search anything"
          autoFocus
          value={searchKey}
          onChange={(e) => inputChangeHandler(e, setSearchKey, true)}
        />

        {/* <div className={classes.section}>
          <h4 className={classes.sectionTitle}>Results</h4>
          <ul className={classes.list}>
            {results.map((data) => (
              <SearchResult key={data?.route} item={data} />
            ))}
          </ul>
        </div> */}

        <div className={classes.section}>
          <h4 className={classes.sectionTitle}>Recent searches</h4>
          <ul className={classes.list}>
            {latestSearches.map((item, i) => (
              <li
                key={item.id}
                className={classes.listItem}
                onClick={() => setSearchKey(item?.label)}
              >
                <span>{item.label}</span>
                <span className={classes.shortcut}>
                  <code>
                    <Command size={12} /> {i + 1}
                  </code>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.section}>
          <h4 className={classes.sectionTitle}>Quick actions</h4>
          <ul className={classes.list}>
            {quickActions.map((action, i) => (
              <li
                key={action.id}
                className={classes.listItem}
                onClick={() => setSearchKey(action?.label)}
              >
                <span>{action.label}</span>
                <span className={classes.shortcut}>
                  <code>
                    <Option size={12} /> {i + 1}
                  </code>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Search;
