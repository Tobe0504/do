import React, { useContext, useState } from "react";
import Add from "../../Assets/Icons/Add";
import ArrowRight from "../../Assets/Icons/ArrowRight";
import Copy from "../../Assets/Icons/Copy";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { ToastContext } from "../../Context/ToastContext";
import { generateRandomQuote } from "../../HelperFunctions/generateRandomQuote";
import { inputChangeHandler } from "../../HelperFunctions/inputChangeHandler";
import ToastContainer from "../ToastContainer/ToastContainer";
import classes from "./CreateOrganizationForm.module.css";

type CreateOrganizationFormTypes = {
  onClose?: () => void;
};

const CreateOrganizationForm = ({ onClose }: CreateOrganizationFormTypes) => {
  //   States
  const [data, setData] = useState({
    hiveName: "",
  });

  // Hooks
  const { showToast } = useContext(ToastContext);

  return (
    <div className={classes.container}>
      <h3>Create your Hive 🐝</h3>

      <form>
        <Input
          label="Hive Name"
          placeholder="The Do Team 🐝"
          tip="Adding an emoji might make your hive look more interesting, who knows?"
          emojiObject={{
            setState: setData as any,
            isSimple: false,
            valueName: "hiveName",
          }}
          name="hiveName"
          onChange={(e) => inputChangeHandler(e, setData)}
          value={data?.hiveName}
        />

        <div>
          <h2>Invite teammates (optional)</h2>
          <Input type="email" placeholder="someone@example.com" />
          <Input type="email" placeholder="someone@example.com" />

          <div className={classes.butotonSection}>
            <Button
              type="secondary"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Add />
            </Button>

            <Button
              type="tertiary"
              onClick={(e) => {
                e.preventDefault();
                console.log("Pressed");
                showToast("Link has been copied to clipboard", 3000);
              }}
            >
              <Copy />
              <span>Copy invite link</span>
            </Button>
          </div>
        </div>

        <div className={classes.butotonSection}>
          <Button
            type="tertiary"
            onClick={(e) => {
              e.preventDefault();
              if (onClose) onClose();
            }}
          >
            <span>Cancel</span>
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <span>Create Organization</span>
            <ArrowRight />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrganizationForm;
