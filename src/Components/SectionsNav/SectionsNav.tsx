import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./SectionsNav.module.css";
import { navItemTypes } from "../../Utilities/types";
import Loader from "../Loader/Loader";
import { activeToggler } from "../../HelperFunctions/activeTogglerr";
import { capitalizeEachWord } from "../../HelperFunctions/capitalize";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { searchParamKeys } from "../../Utilities/constants";

type SectionsNavTypes = {
  navItems: navItemTypes[];
  setNavItems: Dispatch<SetStateAction<navItemTypes[]>>;
  type?: "secondary" | "tertiary";
  isRoute?: boolean;
  id?: string;
};

const SectionsNav = ({
  navItems,
  setNavItems,
  type,
  isRoute,
  id,
}: SectionsNavTypes) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const section = updateSearchParams(
    searchParamKeys?.ORGANIZATIONS?.SECTION,
    undefined,
    "get"
  );

  const updateIndicator = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  };

  useEffect(() => {
    const matchIndex = navItems.findIndex(
      (item) => item.id === (section as string)
    );
    const index =
      matchIndex >= 0 ? matchIndex : navItems.findIndex((i) => i.isActive);
    if (index >= 0) {
      activeToggler(index, navItems, setNavItems);
      updateIndicator(index);
    }
  }, [section]);

  const handleClick = (index: number, id?: string) => {
    if (isRoute && id) {
      updateSearchParams(searchParamKeys?.ORGANIZATIONS?.SECTION, id, "set");
    }
    activeToggler(index, navItems, setNavItems);
    updateIndicator(index);
  };

  return (
    <Suspense fallback={<Loader />}>
      <section className={classes.container} id={id} ref={containerRef}>
        <div className={classes.track}>
          {navItems.map((navItem, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => handleClick(index, navItem.id)}
              className={`
                ${navItem.isActive ? classes.active : classes.inActive}
                ${
                  type === "secondary"
                    ? classes.button
                    : type === "tertiary"
                    ? classes.tertiary
                    : classes.noButton
                }
                ${navItem.isBordered ? classes.bordered : ""}
              `}
            >
              {capitalizeEachWord(navItem.title)}
            </div>
          ))}
          <div
            className={classes.indicator}
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
        </div>
      </section>
    </Suspense>
  );
};

export default SectionsNav;
