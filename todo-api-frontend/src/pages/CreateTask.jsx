import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import api from "../api/service";
import Swal from "sweetalert2";

export default function CreateTask() {
  const navigate = useNavigate();

  async function handleSubmit(formValues) {
    try {
      const response = await api.post("/tasks", formValues);
      console.log(response);

      Swal.fire({
        icon: "success",
        title: "Created",
        text: "Task Created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `${err.message}`,
        timer: 1500,
        showConfirmButton: false,
      });
      // navigate("/");
    }
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <TaskForm
        heading="Create a new task"
        subheading="Add the details below to add it to your dashboard."
        submitLabel="Create Task"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
