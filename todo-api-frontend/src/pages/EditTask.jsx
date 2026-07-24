/**
 * EditTask.jsx
 * ------------------------------------------------------------
 * Page for editing an existing task. Reuses the same <TaskForm />
 * component as CreateTask.jsx, but passes initial values to
 * prefill the fields, and a different heading/button label.
 *
 * ---------------------------------------------------------
 * BACKEND INTEGRATION POINT
 * The `id` from the URL (e.g. /edit-task/3) tells you WHICH task
 * to load and update. Right now we just use placeholder values
 * instead of fetching the real task, e.g.:
 *
 *   const { id } = useParams();
 *   const [task, setTask] = useState(null);
 *   useEffect(() => {
 *     fetch(`/api/tasks/${id}`).then(res => res.json()).then(setTask);
 *   }, [id]);
 * ---------------------------------------------------------
 */

import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams(); // task id from the URL, e.g. "3"

  // Placeholder values standing in for a fetched task.
  // Replace with real data fetched using the `id` above.
  const placeholderTask = {
    title: "Design the landing page hero section",
    dueDate: "2026-07-28",
  };

  function handleSubmit(formValues) {
    // formValues = { title, dueDate }
    //
    // ---------------------------------------------------------
    // BACKEND INTEGRATION POINT
    // Send the updated values to your Express API here, e.g.:
    //   await axios.put(`/api/tasks/${id}`, formValues)
    // ---------------------------------------------------------
    console.log(`Task ${id} updated:`, formValues);

    navigate("/");
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <TaskForm
        heading="Edit task"
        subheading="Update the details below and save your changes."
        submitLabel="Update Task"
        initialTitle={placeholderTask.title}
        initialDueDate={placeholderTask.dueDate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
