import { Add, Check, FilterAlt, Sort } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Button from "../../Components/Button/Button";
import DeleteModalBody from "../../Components/DeleteModalBody/DeleteModalBody";
import Modal from "../../Components/Modal/Modal";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { activeToggler } from "../../HelperFunctions/activeTogglerr";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { searchParamKeys, searchParamValues } from "../../Utilities/constants";
import { projects } from "../../Utilities/dummyData";
import { genericModalsTypes, optionsType } from "../../Utilities/types";
import CreateProjectModalBody from "../CreateProjectMldaBody/CreateProjectModalBody";
import ProjectFilterModalBody from "../ProjectFilterModalBody/ProjectFilterModalBody";
import classes from "./OrganizationListsProjects.module.css";

const OrganizationListsProjects = () => {
  // States
  const [showOptions, setShowOptions] = useState<genericModalsTypes>({
    sort: false,
    filter: false,
    delete: false,
  });
  const [sortOptions, setSortOptions] = useState([
    {
      title: "Alphabetically",
      isActive: false,
    },
    {
      title: "By creation date",
      isActive: false,
    },
    {
      title: "By last updated",
      isActive: false,
    },
    {
      title: "By priority",
      isActive: false,
    },
    {
      title: "By deadline",
      isActive: false,
    },
  ]);

  // Refs
  const optionsRef = useRef<null | HTMLDivElement>(null);

  // Hooks
  const { updateSearchParams, updateConcurrentSearchParams } =
    useUpdateSearchParams();

  const feature = updateSearchParams(
    searchParamKeys.ORGANIZATIONS.FEATURE,
    undefined,
    "get"
  );
  const modal = updateSearchParams(
    searchParamKeys.ORGANIZATIONS.MODAL,
    undefined,
    "get"
  );

  //Utils
  const options: optionsType[] = [
    {
      title: "Edit project details",
      action: () => {
        updateConcurrentSearchParams({
          feature: {
            method: "set",
            value: searchParamValues.ORGANIZATIONS.KEY,
          },
          modal: {
            method: "set",
            value: searchParamValues.ORGANIZATIONS.EDIT,
          },
        });
      },
    },
    {
      title: "Archive project",
      action: () => {
        updateConcurrentSearchParams({
          feature: {
            method: "set",
            value: searchParamValues.ORGANIZATIONS.KEY,
          },
          modal: {
            method: "set",
            value: searchParamValues.ORGANIZATIONS.EDIT,
          },
        });
      },
    },
    {
      title: "Duplicate project",
      action: () => {
        updateConcurrentSearchParams({
          feature: {
            method: "set",
            value: searchParamValues.ORGANIZATIONS.KEY,
          },
          modal: {
            method: "set",
            value: searchParamValues.ORGANIZATIONS.EDIT,
          },
        });
      },
    },
    {
      title: "Delete this project",
      action() {
        setModalTrue(setShowOptions, "delete");
      },
    },
  ];

  // Effects
  useEffect(() => {
    const handleCloseOptions = (e: any) => {
      if (optionsRef?.current && !optionsRef?.current?.contains(e.target)) {
        setAllModalsFalse(setShowOptions);
      }
    };

    document?.addEventListener("mousedown", handleCloseOptions);

    return () => {
      document?.removeEventListener("mousedown", handleCloseOptions);
    };
  }, []);

  return (
    <>
      {showOptions?.filter && (
        <Modal
          body={<ProjectFilterModalBody />}
          onClose={() => setAllModalsFalse(setShowOptions)}
        />
      )}

      {feature === searchParamKeys?.ORGANIZATIONS?.KEY &&
        modal === searchParamKeys?.ORGANIZATIONS?.CREATE && (
          <Modal
            body={
              <CreateProjectModalBody
                onClose={() =>
                  updateConcurrentSearchParams({
                    feature: { method: "delete", value: undefined },
                    modal: { method: "delete", value: undefined },
                  })
                }
              />
            }
            onClose={() =>
              updateConcurrentSearchParams({
                feature: { method: "delete", value: undefined },
                modal: { method: "delete", value: undefined },
              })
            }
          />
        )}

      {feature === searchParamKeys?.ORGANIZATIONS?.KEY &&
        modal === searchParamValues?.ORGANIZATIONS?.EDIT && (
          <Modal
            body={
              <CreateProjectModalBody
                isEdit
                onClose={() =>
                  updateConcurrentSearchParams({
                    feature: { method: "delete", value: undefined },
                    modal: { method: "delete", value: undefined },
                  })
                }
              />
            }
            onClose={() =>
              updateConcurrentSearchParams({
                feature: { method: "delete", value: undefined },
                modal: { method: "delete", value: undefined },
              })
            }
          />
        )}

      {showOptions?.delete && (
        <Modal
          body={
            <DeleteModalBody
              title="Wave Goodbye to This Project! 👋"
              caption="Ready to send this project to the great Kanban beyond? Don’t worry, it’s just a click away from a well-deserved rest! 😄"
              onClose={() => {
                setAllModalsFalse(setShowOptions);
              }}
            />
          }
          isLight={true}
          onClose={() => setAllModalsFalse(setShowOptions)}
        />
      )}

      <section className={classes.outerContainer}>
        <div className={classes.header}>
          <div className={classes.input}>
            <input
              placeholder="Search by project name, tag, or member assigned"
              type="search"
            />
          </div>

          <div>
            <Sort
              height={12}
              width={10}
              onClick={() => {
                setModalTrue(setShowOptions, "sort");
              }}
            />
            {showOptions?.sort && (
              <div className={classes.options} ref={optionsRef}>
                {sortOptions?.map((data, i) => {
                  return (
                    <div
                      key={data?.title}
                      onClick={() => [
                        activeToggler(i, sortOptions, setSortOptions),
                      ]}
                    >
                      <span>{data?.title}</span>
                      {data?.isActive && <Check />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div
            onClick={() => {
              setModalTrue(setShowOptions, "filter");
            }}
          >
            <FilterAlt />
          </div>
          <Button
            onClick={() => {
              updateConcurrentSearchParams({
                feature: {
                  method: "set",
                  value: searchParamValues.ORGANIZATIONS.KEY,
                },
                modal: {
                  method: "set",
                  value: searchParamValues.ORGANIZATIONS.CREATE,
                },
              });
            }}
            type="secondary"
          >
            <Add />
            <span>Create a project</span>
          </Button>
        </div>
        <div className={classes.container}>
          {projects.map((data, i) => {
            return <ProjectCard {...data} key={i} options={options} />;
          })}
        </div>
      </section>
    </>
  );
};

export default OrganizationListsProjects;
