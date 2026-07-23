import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskListPage from "./pages/TaskListPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/edit/:id" element={<EditTaskPage />} />
      </Routes>
    </div>
  );
}
