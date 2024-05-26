import { Route, Routes } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import AddTask from "./Containers/AddTask/AddTask";
import Dashboard from "./Containers/Dashboard/Dashboard";
import EditTask from "./Containers/EditTask/EditTask";
import Home from "./Containers/Home/Home";
import SignIn from "./Containers/SignIn/SignIn";
import SignUp from "./Containers/SignUp/SignUp";
import TaskPage from "./Containers/TaskPage/TaskPage";
import ViewTask from "./Containers/ViewTask/ViewTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<AddTask />} />
        <Route path="/view/:id" element={<ViewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/todos" element={<TaskPage />} />
      </Route>
    </Routes>
  );
}

export default App;
