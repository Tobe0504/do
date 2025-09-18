import { Plus, Search } from "lucide-react";
import { useState } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import OrganozationListCard from "../../Components/OrganozationListCard/OrganozationListCard";
import { inputChangeHandler } from "../../HelperFunctions/inputChangeHandler";
import useUpdateSearchParams from "../../Hooks/useUpdateSearchParams";
import { projects } from "../../Utilities/dummyData";
import classes from "../Onboarding1/Onboarding1.module.css";
import { SmallLoader } from "../../Components/Loader/Loader";

const Onboarding4 = () => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  const organizations = [
    {
      name: "The Do Team 🐝",
      image: projects[0].members[0],
    },
    {
      name: "Hive Connect",
      image: projects[0].members[0],
    },
    {
      name: "Collab Crew",
      image: projects[0].members[0],
    },
  ];

  // States
  const [searchKey, setSearchKey] = useState("");

  return (
    <section className={classes.container}>
      <h1>Discover Your Hive. Connect. Collaborate. Create.</h1>

      <form className={classes.joinOrg}>
        <Input
          label="Hive Name"
          placeholder="The Do Team 🐝"
          name="hiveName"
          autoFocus
          onChange={(e) => inputChangeHandler(e, setSearchKey, true)}
          value={searchKey}
        />

        <Button
          type="secondary"
          onClick={(e) => {
            e.preventDefault();
          }}
          disabled={!searchKey}
        >
          <Search size={16} />
          Search
        </Button>

        <div className={classes.organizations}>
          <h4>Results for {searchKey} </h4>
          <p>
            Suggested teams help you join open organizations and gain hands-on
            experience with them
          </p>
          {/* <SmallLoader /> */}

          <OrganozationListCard {...organizations[0]} />
        </div>

        <div className={classes.organizations}>
          <h4>Suggested Hives</h4>
          <p>
            Hives may have similar names but must have a different domain.
            Please cross-check the domain
          </p>

          {organizations?.map((data) => {
            return <OrganozationListCard key={data?.name} {...data} />;
          })}
        </div>

        <div className={classes.butotonSection}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              updateSearchParams("step", "4", "set");
            }}
          >
            <Plus size={16} />
            <span>Create a Hive Instead</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Onboarding4;
