import { Dispatch, SetStateAction } from "react";
import ArrowRight from "../../Assets/Icons/ArrowRight";
import Button from "../../Components/Button/Button";
import GradientCard from "../../Components/GradientCard/GradientCard";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { onboardingAnswersType } from "../../Utilities/types";
import classes from "../Onboarding1/Onboarding1.module.css";

type Onboarding2Types = {
  answers: onboardingAnswersType;
  setAnswers: Dispatch<SetStateAction<onboardingAnswersType>>;
};

const options = [
  "🌞 Calm & Focused",
  "🎉 Fun & Energetic",
  "🧘 Minimal & Clear",
  "🌈 Vibrant & Colorful",
];

const Onboarding2 = ({ answers, setAnswers }: Onboarding2Types) => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  return (
    <section className={classes.container}>
      <h1>Pick a vibe for your space!</h1>

      <div className={classes.options}>
        {options.map((data) => {
          return (
            <GradientCard
              onClick={() => {
                setAnswers((prevState) => {
                  return { ...prevState, vibe: data };
                });
              }}
              isActive={answers?.vibe === data}
              key={data}
            >
              {data}
            </GradientCard>
          );
        })}
      </div>

      <Button
        disabled={!answers?.vibe}
        type="secondary"
        onClick={() => {
          updateSearchParams("step", "3", "set");
        }}
      >
        <span>Continue</span>
        <ArrowRight />
      </Button>
    </section>
  );
};

export default Onboarding2;
