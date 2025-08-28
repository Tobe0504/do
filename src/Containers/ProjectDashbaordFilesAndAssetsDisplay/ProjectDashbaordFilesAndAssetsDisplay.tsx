import Input from "../../Components/Input/Input";
import Banner from "../Banner/Banner";
import FileDisplayComponent from "../FileDisplayComponent/FileDisplayComponent";
import classes from "./ProjectDashbaordFilesAndAssetsDisplay.module.css";

const ProjectDashbaordFilesAndAssetsDisplay = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Input type="search" placeholder="Search by file name or tags" />
      </div>
      <Banner
        text="This is the right time!"
        bgImage="https://res.cloudinary.com/dryjxk5jw/image/upload/v1756223749/Wallpaper_2024___Sanatsal_resimler_Arkaplan_r3efua.jpg"
      />
      <div className={classes.files}>
        <FileDisplayComponent name="Logo.png" type="image" />
        <FileDisplayComponent name="Demo.pdf" type="video" />
        <FileDisplayComponent name="Notes.pdf" type="file" />
        <FileDisplayComponent name="Proposal.pdf" type="file" />
        <FileDisplayComponent name="Style guide" type="audio" />
        <FileDisplayComponent name="Logo" type="image" />
        <FileDisplayComponent name="Style guide" type="audio" />
        <FileDisplayComponent name="Notes" type="file" />
        <FileDisplayComponent name="Demo" type="video" />
        <FileDisplayComponent name="Proposal" type="file" />
      </div>
    </div>
  );
};

export default ProjectDashbaordFilesAndAssetsDisplay;
