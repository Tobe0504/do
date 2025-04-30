import OnboardingLayout from "../../Components/OnboardingLayout/OnboardingLayout";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import classes from "../SignIn/SignIn.module.css";
import Logo from "../Logo/Logo";
import { routes } from "../../Utilities/routes";
import { Link, useNavigate } from "react-router-dom";
import Arrowback from "../../SvgIcons/Arrowback";

const ForgotPassword = () => {
  // Router
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <div className={classes.container}>
        <form className={classes.innerContainer}>
          <Logo />
          <h4>Lost something? 🤔</h4>
          <p>
            No worries, we'll help you find your way back. <br />
            Enter your email and we'll send you the magic link.
          </p>
          <p>your info stays safe with us. Always. 🔒</p>
          <Input
            label="Email"
            placeholder="example@email.com"
            type="email"
            name="email"
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(routes.RESET_PASSWORD);
            }}
          >
            Send Email
          </Button>
          <span>
            <Arrowback fill="#e63e21" />
            <Link to={routes.SIGN_IN}>Back To Login? </Link>
          </span>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default ForgotPassword;
