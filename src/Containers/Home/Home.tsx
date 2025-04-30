import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Layout from "../../Components/Layout/Layout";
import { getLocalStorage } from "../../HelperFunctions/decryptData";
import classes from "./Home.module.css";

const Home = () => {
  // Utils
  const doTypes = [
    {
      figure: "verb",
      meanings: [
        {
          meaning:
            "perform (an action, the precise nature of which is often unspecified).",
          example: '"very little work has been done in this field"',
        },
        {
          meaning: "achieve or complete.",
          example: '"very little work has been done in this field"',
        },
      ],
    },
  ];
  const user = getLocalStorage("do-user-state", "userState");

  // Router
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes["gradient-background"]}>
          <div className={`${classes.gradientSphere} ${classes.sphere1}`}></div>
          <div className={`${classes.gradientSphere} ${classes.sphere2}`}></div>
          <div className={`${classes.gradientSphere} ${classes.sphere3}`}></div>
          <div className={classes.gridOverlay}></div>
          <div
            className={classes.particlesContainer}
            id="particles-container"
          ></div>
        </div>
        <div className={classes.innerContainer}>
          <h4>
            do
            <sup>1</sup>
          </h4>
          <p>/du:/</p>

          {doTypes.map((type, i) => {
            return (
              <div className={classes.type} key={i}>
                <i>{type.figure}</i>
                <ol>
                  {type.meanings.map((data, j) => {
                    return (
                      <li key={j}>
                        <p>{data.meaning}</p>
                        <p>{data.example}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}

          <div className={classes.buttonSection}>
            <Button
              onClick={() => {
                navigate(user ? "/sign-in" : "/sign-up");
              }}
            >
              Start doing
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
