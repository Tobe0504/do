import { useContext } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import OnboardingLayout from "../../Components/OnboardingLayout/OnboardingLayout";
import { AuthUserContext } from "../../Context/AuthUserContext";
import Logo from "../Logo/Logo";
import classes from "../SignIn/SignIn.module.css";

const ConfirmUssr = () => {
  // Context
  const { otp, setOtp, loginDetails } = useContext(AuthUserContext);

  const inputHander = (e: any) => {
    setOtp(e.target.value);
  };

  return (
    <OnboardingLayout>
      <div className={classes.container}>
        <form className={classes.innerContainer}>
          <Logo />
          <h4>We need to confirm it's you! 🥸</h4>
          <p>
            We sent you an email on {loginDetails.email}. Please type the code
            here!
          </p>
          <Input
            label="OTP"
            placeholder="Eg. 12345"
            name="otp"
            onChange={inputHander}
            value={otp}
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
            disabled={!otp}
          >
            Confirm
          </Button>
          <span>
            Did not recieve an OTP? <span>Resend OTP</span>
          </span>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default ConfirmUssr;
