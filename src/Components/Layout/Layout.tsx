import Header from "../../Containers/Header/Header";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  notShowHeader?: boolean;
}

const Layout = ({ children, notShowHeader }: LayoutProps) => {
  return (
    <section className={classes.container}>
      {!notShowHeader && (
        <div className={classes.header}>
          <Header />
        </div>
      )}
      <div
        className={classes.body}
        style={notShowHeader ? { height: "100%" } : undefined}
      >
        {children}
      </div>
    </section>
  );
};

export default Layout;
