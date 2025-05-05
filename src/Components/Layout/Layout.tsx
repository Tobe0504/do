import DefaultHeader from "../../Containers/DefaultHeader/DefaultHeader";
import Header from "../../Containers/Header/Header";
import OrganizationHeader from "../../Headers/OrganizationHeader/OrganizationHeader";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  notShowHeader?: boolean;
  className?: string;
}

const Layout = ({ children, notShowHeader, className }: LayoutProps) => {
  return (
    <section className={classes.container}>
      {!notShowHeader && (
        <div className={classes.header}>
          <Header />
        </div>
      )}
      <div
        className={`${classes.body} ${className}`}
        style={notShowHeader ? { height: "100%" } : undefined}
      >
        {children}
      </div>
    </section>
  );
};

export default Layout;
