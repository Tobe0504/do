import { Dispatch, SetStateAction } from "react";
import ArrowRight from "../../Assets/Icons/ArrowRight";
import Skip from "../../Assets/Icons/Skip";
import Button from "../../Components/Button/Button";
import GradientCard from "../../Components/GradientCard/GradientCard";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { onboardingAnswersType } from "../../Utilities/types";
import classes from "./Onboarding1.module.css";

type Onboarding1Types = {
  answers: onboardingAnswersType;
  setAnswers: Dispatch<SetStateAction<onboardingAnswersType>>;
};

const options = [
  "🧑‍💻 My personal tasks",
  "👯 My team’s projects",
  "🗓️ My goals and habits",
  "🧠 A mix of everything",
  "🐝 Just exploring (curious bee)",
];

const Onboarding1 = ({ answers, setAnswers }: Onboarding1Types) => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  // Router

  return (
    <section className={classes.container}>
      <h1>What are you looking to manage on Do?</h1>

      <div className={classes.options}>
        {options.map((data) => {
          return (
            <GradientCard
              onClick={() => {
                setAnswers((prevState) => {
                  return { ...prevState, whatToManage: data };
                });
              }}
              isActive={answers?.whatToManage === data}
              key={data}
            >
              {data}
            </GradientCard>
          );
        })}
      </div>

      <div className={classes.butotonSection}>
        <Button
          type="tertiary"
          onClick={(e) => {
            e.preventDefault();
            updateSearchParams("step", "3", "set");
          }}
        >
          <span>Skip for now</span>
          <Skip />
        </Button>

        <Button
          disabled={!answers?.whatToManage}
          type="secondary"
          onClick={() => {
            updateSearchParams("step", "2", "set");
          }}
        >
          <span>Continue</span>
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default Onboarding1;
