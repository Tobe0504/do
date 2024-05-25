import { Route, Routes } from "react-router-dom";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Home from "./Containers/Home/Home";
import SignIn from "./Containers/SignIn/SignIn";
import SignUp from "./Containers/SignUp/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
