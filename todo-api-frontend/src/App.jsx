import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside <Routes> so it stays visible on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-task" element={<CreateTask />} />
        {/* :id is a route param — EditTask reads it with useParams() */}
        <Route path="/edit-task/:id" element={<EditTask />} />
        {/* Catch-all route for any unmatched URL */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
