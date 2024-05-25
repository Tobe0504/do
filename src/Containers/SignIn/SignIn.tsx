import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import OnboardingLayout from "../../Components/OnboardingLayout/OnboardingLayout";
import Logo from "../Logo/Logo";
import classes from "./SignIn.module.css";

const SignIn = () => {
  // Router
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <div className={classes.container}>
        <form className={classes.innerContainer}>
          <Logo />
          <h4>Welcome Back 👋</h4>
          <p>
            Today is a new day. It's your day. You shape it. <br />
            Sign in to start your doings
          </p>
          <Input label="Email" placeholder="Example@email.com" type="email" />
          <Input
            label="Password"
            placeholder="At least 8 characters"
            type="password"
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            Sign in
          </Button>
          <span>
            Don't you have an account? <Link to="/sign-up">Sign up</Link>
          </span>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default SignIn;
