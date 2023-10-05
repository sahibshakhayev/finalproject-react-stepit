import { Form, useLoaderData, redirect, useNavigate} from "react-router-dom";
import { updateTask } from "../tasks";


export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateTask(params.taskId, updates);
    return redirect(`/tasks/${params.taskId}`);
  }

export default function EditContact() {
  const { task } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="task-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="Task Name"
          type="text"
          name="name"
          defaultValue={task.first}
        />
      </p>
      <label>
        <span>Notes</span>
        <textarea
          name="description"
          defaultValue={task.description}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button onClick={() => {
            navigate(-1);
          }} type="button">Cancel</button>
      </p>
    </Form>
  );
}