import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import api from "../api/service";
import Swal from "sweetalert2";
import Loader from "../components/Loader.jsx";

export default function Home() {
  // UI-only state for the search box and filter dropdown.
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");

        console.log(response.data);
        console.log(response.data.data.tasks);

        setTasks(response.data.data.tasks);
      } catch (err) {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: "Oops... Cannot connect to backend",
            text: err.response.status,
          });
          console.error(err.response);
          console.error(err.response.data);
        } else {
          console.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const navigate = useNavigate();

  if (loading) {
    return <Loader message="Loading tasks..." />;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.isCompleted) ||
      (statusFilter === "pending" && !task.isCompleted);

    return matchesSearch && matchesStatus;
  });

  function handleEdit(taskId) {
    navigate(`/edit-task/${taskId}`);
  }

  async function handleDelete(taskId) {
    const result = await Swal.fire({
      title: "Delete Task?",
      text: "You won't be able to undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/tasks/${taskId}`);

      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Task deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete task.",
      });

      console.error(err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Page heading + primary action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredTasks.length} task{filteredTasks.length !== 1 && "s"} found
          </p>
        </div>

        {/* Hidden on mobile since we show a floating/full-width button below the filters instead */}
        <div className="hidden sm:block ">
          <Button
            to="/create-task"
            variant="primary"
            icon={<FiPlus className="w-4 h-4" />}
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* Search + filter controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search input (UI only — doesn't call any API) */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm
                       placeholder:text-gray-400 outline-none transition-colors duration-150
                       focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Filter dropdown (UI only) */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700
                     outline-none transition-colors duration-150 cursor-pointer
                     focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        {/* Create Task button — full width on mobile, next to search on desktop */}
        <div className="sm:hidden">
          <Button
            to="/create-task"
            variant="primary"
            fullWidth
            icon={<FiPlus className="w-4 h-4" />}
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* Task grid, or empty state if nothing matches */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100">
          <EmptyState
            title="No matching tasks"
            message="Try adjusting your search or filter, or create a new task."
          />
        </div>
      )}
    </div>
  );
}
