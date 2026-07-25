import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import api from "../api/service";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";

export default function EditTask() {
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.data.tasks);
    }
    load();
  }, [id]);

  async function handleSubmit(formValues) {
    const result = await Swal.fire({
      title: "Update Task?",
      // text: "You won't be able to undo this action.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;
    try {
      await api.patch(`/tasks/${id}`, formValues);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Task Updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
      console.log(`Task ${id} updated:`, formValues);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancel() {
    navigate("/");
  }

  if (!task) {
    return <Loader message={"Loading task..."} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <TaskForm
        heading="Edit task"
        subheading="Update the details below and save your changes."
        submitLabel="Update Task"
        initialTitle={task.title}
        initialDateForCompletion={task.dateForCompletion.split("T")[0]}
        initialCompleted={task.completed}
        showCompleted={true}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
