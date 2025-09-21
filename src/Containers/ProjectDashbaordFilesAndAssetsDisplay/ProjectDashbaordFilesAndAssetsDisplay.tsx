import { Ellipsis, Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../../Components/Button/Button";
import DeleteModalBody from "../../Components/DeleteModalBody/DeleteModalBody";
import Input from "../../Components/Input/Input";
import Modal from "../../Components/Modal/Modal";
import {
  setAllModalsFalse,
  setModalTrue,
} from "../../HelperFunctions/modalHandlers";
import { useClipboard } from "../../Hooks/useClipboard";
import { projects } from "../../Utilities/dummyData";
import { genericModalsTypes } from "../../Utilities/types";
import Banner from "../Banner/Banner";
import FileDisplayComponent from "../FileDisplayComponent/FileDisplayComponent";
import classes from "./ProjectDashbaordFilesAndAssetsDisplay.module.css";

const tableHeader = ["File Name", "Uploaded By", "Upload Date", "Linked Task"];

const ProjectDashbaordFilesAndAssetsDisplay = () => {
  // States
  const [optionId, setOptionId] = useState<null | string>(null);
  const [modals, setModals] = useState<genericModalsTypes>({ delete: false });

  // Custom Hoooks
  const { copy } = useClipboard();

  // Utils
  const options = [
    {
      title: "Copy File Link",
      onClick: () => {
        copy("https://do-tobe.vercel.app");
      },
    },
    {
      title: "Delete File",
      onClick: (i: number) => {
        setModalTrue(setModals, "delete");
      },
    },
  ];

  // Ref
  const optionsRef = useRef<null | HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    const handleClearOptions = (e: any) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setOptionId(null);
      }
    };

    document.addEventListener("mousedown", handleClearOptions);

    return () => {
      document.removeEventListener("mousedown", handleClearOptions);
    };
  }, []);

  return (
    <>
      {modals.delete && (
        <Modal
          onClose={() => setAllModalsFalse(setModals)}
          body={
            <DeleteModalBody
              title="Delete File?"
              caption="Once deleted, these files cannot be recovered. Please confirm to continue."
              onClose={() => setAllModalsFalse(setModals)}
            />
          }
        />
      )}
      <div className={classes.container}>
        <div className={classes.header}>
          <Input type="search" placeholder="Search by file name or tags" />
        </div>
        <Banner
          text="This is the right time!"
          bgImage="https://res.cloudinary.com/dryjxk5jw/image/upload/v1756223749/Wallpaper_2024___Sanatsal_resimler_Arkaplan_r3efua.jpg"
        />

        <h4 className={classes.headertext}>Recent Uploads</h4>
        <div className={classes.files}>
          <FileDisplayComponent name="Logo.png" type="image" />
          <FileDisplayComponent name="Demo.pdf" type="video" />
          <FileDisplayComponent name="Notes.pdf" type="file" />
          <FileDisplayComponent name="Proposal.pdf" type="file" />
          <FileDisplayComponent name="Style guide" type="audio" />
        </div>

        <h4 className={classes.headertext}>All Files</h4>

        <div className={classes.tableHeader}>
          {tableHeader?.map((data) => {
            return <div key={data}>{data}</div>;
          })}
        </div>

        <div className={classes.tableBodyContainer}>
          {[...Array(10)].map((data, i) => {
            return (
              <div className={classes.tableBody}>
                <div>
                  <Image size={20} color="#e63e21" />
                  <div>
                    <span>Q4-Market-Analysis</span>
                    <span>2.8 MB, PDF</span>
                  </div>
                </div>

                <div>
                  <img src={projects[0].members[0]} alt="Ezimorah Tobenna" />
                  <div>
                    <span>Ezimorah Tobenna</span>
                    <span>Project Manager</span>
                  </div>
                </div>

                <div>Oct 10, 2024</div>
                <div>
                  <span>Market Analysis</span>
                  <Button
                    type="tertiary"
                    onClick={() => {
                      setOptionId(String(i));
                    }}
                  >
                    <Ellipsis size={16} strokeWidth={2} />
                  </Button>

                  {(optionId as string) === String(i) && (
                    <div className={classes.options} ref={optionsRef}>
                      {options.map((option) => {
                        return (
                          <div
                            onClick={() => option.onClick(i)}
                            key={option.title}
                          >
                            {option.title}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectDashbaordFilesAndAssetsDisplay;
