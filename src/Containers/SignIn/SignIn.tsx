import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Error from "../../Components/Error/Error";
import Input from "../../Components/Input/Input";
import OnboardingLayout from "../../Components/OnboardingLayout/OnboardingLayout";
import { AuthUserContext } from "../../Context/AuthUserContext";
import Logo from "../Logo/Logo";
import classes from "./SignIn.module.css";

const SignIn = () => {
  // Context
  const { loginDetails, setLoginDetails, signIn, error } =
    useContext(AuthUserContext);

  const inputHander = (e: any) => {
    setLoginDetails((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <OnboardingLayout>
      <div className={classes.container}>
        <form className={classes.innerContainer}>
          <Logo />
          <h4>Welcome Back 😼</h4>
          <p>
            Today is a new day. It's your day. You shape it. <br />
            Sign in to start your doings
          </p>
          <p>
            ...and sure, since we're totally offline, <br /> you are sure
            whatever is here, stays here🔒
          </p>
          {error && <Error type="error">{error}</Error>}
          <Input
            label="Email"
            placeholder="Example@email.com"
            type="email"
            name="email"
            onChange={inputHander}
            value={loginDetails.email}
          />
          <Input
            label="Password"
            placeholder="At least 8 characters"
            type="password"
            name="password"
            onChange={inputHander}
            value={loginDetails.password}
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            disabled={!loginDetails.email || !loginDetails.password}
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
