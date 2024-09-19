import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import OnboardingLayout from "../../Components/OnboardingLayout/OnboardingLayout";
import { AuthUserContext } from "../../Context/AuthUserContext";
import Logo from "../Logo/Logo";
import classes from "../SignIn/SignIn.module.css";

const SignUp = () => {
  // Context
  const { loginDetails, setLoginDetails, signUp } = useContext(AuthUserContext);

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
          <h4>Hey there 👋</h4>
          <p>
            Today is a new day. It's your day. You shape it. <br />
            Sign up to start your doings
          </p>
          <Input
            label="First name"
            placeholder="John"
            name="firstname"
            onChange={inputHander}
            value={loginDetails.firstname}
          />

          <Input
            label="Last name"
            placeholder="Doe"
            name="lastname"
            onChange={inputHander}
            value={loginDetails.lastname}
          />

          <Input
            label="Email"
            placeholder="example@email.com"
            type="email"
            name="email"
            onChange={inputHander}
            value={loginDetails.email}
          />
          <Input
            label="Password"
            placeholder="at least 8 characters"
            type="password"
            name="password"
            onChange={inputHander}
            value={loginDetails.password}
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
            disabled={
              !loginDetails.email ||
              !loginDetails.firstname ||
              !loginDetails.lastname ||
              !loginDetails.password
            }
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
