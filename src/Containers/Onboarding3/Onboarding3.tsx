import { Trash2, UserPlus } from "lucide-react";
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
  const [emails, setEmails] = useState(["", ""]);

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
          autoFocus
        />

        <div className={classes.emails}>
          <h2>Invite teammates (optional)</h2>
          {emails?.map((email, i) => (
            <div key={i} className={classes?.email}>
              <Input
                type="email"
                placeholder="someone@example.com"
                value={email}
                onChange={(event) => {
                  setEmails((prev) => {
                    const updated = [...prev];
                    updated[i] = (event.target as any)?.value;
                    return updated;
                  });
                }}
              />
              {email && (
                <Trash2
                  size={20}
                  color="#780606"
                  className="cursor-pointer"
                  onClick={() => {
                    setEmails((prev) => prev.filter((_, idx) => idx !== i));
                  }}
                />
              )}
            </div>
          ))}

          <Button
            type="secondary"
            onClick={(e) => {
              e.preventDefault();
              setEmails((prevState) => [...prevState, ""]);
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
            <UserPlus size={16} />
            <span>Invite All</span>
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(routes.DASHBOARD);
            }}
          >
            <span>Start Doing</span>
            <ArrowRight />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Onboarding3;
