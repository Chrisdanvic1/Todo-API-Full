import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function CreateTask() {
  const navigate = useNavigate();

  function handleSubmit(formValues) {
    console.log("New task submitted:", formValues);
    navigate("/");
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
