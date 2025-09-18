import {
  Copy,
  Eye,
  EyeClosed,
  EyeOff,
  PencilLine,
  Save,
  VenetianMask,
} from "lucide-react";
import { useState } from "react";
import Button from "../../Components/Button/Button";
import MembersList from "../../Components/MembersList";
import { activeToggler } from "../../HelperFunctions/activeTogglerr";
import { useClipboard } from "../../Hooks/useClipboard";
import { projects } from "../../Utilities/dummyData";
import classes from "./ProjectDashboardSecrets.module.css";

const secretHeaders = [
  "Secret title",
  "Date Added ",
  "Value",
  "Visible",
  "Members assigned",
];

const secretBody = [
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
  {
    title: "Test",
    value: "Thisisatestsecret",
    date: "28th August, 3035",
    isActive: false,
  },
];

const ProjectDashboardSecrets = () => {
  // States
  const [tableData, setTableData] = useState(secretBody);
  const [edit, setEdit] = useState(false);

  //   Custom hooks
  const { copy } = useClipboard();

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h4>Secrets</h4>

        <Button
          type="secondary"
          onClick={() => setEdit((prevState) => !prevState)}
        >
          {!edit ? (
            <>
              <PencilLine size={16} />
              <span>Edit</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save</span>
            </>
          )}
        </Button>

        <Button type="secondary">
          <VenetianMask size={16} />
          <span>Create Secret</span>
        </Button>
      </div>

      <div className={classes.tableHeader}>
        {secretHeaders?.map((data) => {
          return <div key={data}>{data}</div>;
        })}
      </div>

      <div className={classes.tableBodyContainer}>
        {tableData?.map((data, i) => {
          return (
            <div key={i} className={classes.tableBody}>
              <div>
                <input
                  value={data?.title?.toUpperCase()}
                  name="title"
                  readOnly={!edit}
                  className={`${
                    edit ? "outline-1 outline-[#1b1b1b]" : "outline-none"
                  } flex  bg-transparent text-white-100 text-[14px] min-w-10 w-full truncate`}
                  type="text"
                  onChange={(e) => {
                    setTableData((prevState) => {
                      const updatedState = [...prevState];
                      updatedState[i as number][e.target.name as "title"] =
                        e.target.value?.toUpperCase();
                      return updatedState;
                    });
                  }}
                />
              </div>
              <div>{data?.date}</div>
              <div className="flex items-center gap-4">
                <input
                  value={data?.value}
                  name="value"
                  readOnly={!edit}
                  className=" flex-1 border-none outline-none bg-transparent text-white-100 text-[14px]"
                  type={data?.isActive ? "text" : "password"}
                  onChange={(e) => {
                    setTableData((prevState) => {
                      const updatedState = [...prevState];
                      updatedState[i as number][e.target.name as "value"] =
                        e.target.value;

                      return updatedState;
                    });
                  }}
                />
                <Button type="tertiary" onClick={() => copy(data?.value)}>
                  <Copy size={16} />
                </Button>
              </div>

              <div>
                <Button
                  type="tertiary"
                  onClick={() => activeToggler(i, tableData, setTableData)}
                >
                  {data?.isActive ? <EyeOff size={20} /> : <Eye size={20} />}
                  {data?.isActive ? "Hide" : "Show"}
                </Button>
              </div>
              <div>
                <MembersList members={projects?.[0]?.members} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectDashboardSecrets;
