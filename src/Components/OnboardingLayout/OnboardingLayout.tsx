import classes from "./OnboardingLayout.module.css";
import loginImage from "../../Assets/Login Art.svg";
import Layout from "../Layout/Layout";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <Layout notShowHeader>
      <div className={classes.container}>
        <div>{children}</div>
        <div>
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </Layout>
  );
};

export default OnboardingLayout;
