import Canvas from "../../Components/Canvas/Canvas";
import DashboardLayout from "../../Components/DashboardLayout/DashboardLayout";

const ThinkSpaceCanvas = () => {
  return (
    <DashboardLayout noHeader openSidenav={false}>
      <Canvas />
    </DashboardLayout>
  );
};

export default ThinkSpaceCanvas;
