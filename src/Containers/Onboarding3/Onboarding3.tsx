import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Add from "../../Assets/Icons/Add";
import ArrowRight from "../../Assets/Icons/ArrowRight";
import Skip from "../../Assets/Icons/Skip";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { inputChangeHandler } from "../../HelperFunctions/inputChangeHandler";
import { routes } from "../../Utilities/routes";
import classes from "../Onboarding1/Onboarding1.module.css";

const Onboarding3 = () => {
  // Router
  const navigate = useNavigate();

  //   States
  const [data, setData] = useState({
    hiveName: "",
  });

  return (
    <section className={classes.container}>
      <h1>Want to create a Hive to collaborate with your squad?</h1>

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
          <Input type="email" placeholder="someone@example.com" />
          <Button
            type="secondary"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Add />
          </Button>
        </div>

        <div className={classes.butotonSection}>
          <Button
            type="tertiary"
            onClick={(e) => {
              e.preventDefault();
              navigate(routes.DASHBOARD);
            }}
          >
            <span>Skip for now</span>
            <Skip />
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(routes.DASHBOARD);
            }}
          >
            <span>Start adding Dos</span>
            <ArrowRight />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Onboarding3;
