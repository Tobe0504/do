import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import OnboardingLayout from "../../Components/OnboardingLayout/OnboardingLayout";
import Logo from "../Logo/Logo";
import classes from "../SignIn/SignIn.module.css";

const SignUp = () => {
  return (
    <OnboardingLayout>
      <div className={classes.container}>
        <form className={classes.innerContainer}>
          <Logo />
          <h4>Hey there 👋</h4>
          <p>
            Today is a new day. It's your day. You shape it. <br />
            Sign up to start your doings
          </p>
          <Input label="Full name" placeholder="Doer" />
          <Input label="Email" placeholder="Example@email.com" type="email" />
          <Input
            label="Password"
            placeholder="At least 8 characters"
            type="password"
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Create an account
          </Button>
          <span>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </span>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default SignUp;
