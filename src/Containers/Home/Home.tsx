import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Layout from "../../Components/Layout/Layout";
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
  const user = localStorage.getItem("do-user-state");

  // Router
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={classes.container}>
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
