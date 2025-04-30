import OnboardingLayout from "../../Components/OnboardingLayout/OnboardingLayout";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import classes from "../SignIn/SignIn.module.css";
import Logo from "../Logo/Logo";
import { routes } from "../../Utilities/routes";
import { Link } from "react-router-dom";
import Arrowback from "../../SvgIcons/Arrowback";

const ResetPassword = () => {
  return (
    <OnboardingLayout>
      <div className={classes.container}>
        <form className={classes.innerContainer}>
          <Logo />
          <h4>Fresh start! 🌟</h4>
          <p>
            Set a new password and step back into your world. <br />
            Make it something only you would know. 😉
          </p>
          <p>your secrets are safe here. 🔒</p>
          <Input label="New Password" placeholder="*******" type="password" />
          <Input
            label="Confirm New Password"
            placeholder="*******"
            type="password"
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Reset password
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

export default ResetPassword;
