import { useEffect, useState } from "react";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import Logo from "../Logo/Logo";
import Onboarding1 from "../Onboarding1/Onboarding1";
import Onboarding2 from "../Onboarding2/Onboarding2";
import Onboarding3 from "../Onboarding3/Onboarding3";
import Onboarding4 from "../Onboarding4/Onboarding4";
import classes from "./Onboarding.module.css";

const Onboarding = () => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  //   States
  const [answers, setAnswers] = useState({
    whatToManage: "",
    vibe: "",
  });

  // Router
  const step = updateSearchParams("step", undefined, "get");

  //   Effects
  useEffect(() => {
    if (!step) {
      updateSearchParams("step", "1", "set");
    }
  }, [step]);

  return (
    <section className={classes.container}>
      <div className={classes.body}>
        <div className={classes.header}>
          <Logo />
        </div>
        {step === "2" ? (
          <Onboarding2 answers={answers} setAnswers={setAnswers} />
        ) : step === "3" ? (
          <Onboarding4 />
        ) : step === "4" ? (
          <Onboarding3 />
        ) : (
          <Onboarding1 answers={answers} setAnswers={setAnswers} />
        )}
      </div>
    </section>
  );
};

export default Onboarding;
