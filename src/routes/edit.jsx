import { Form, useLoaderData, redirect, useNavigate} from "react-router-dom";
import { updateTask } from "../tasks";
import { useState } from "react";


export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateTask(params.taskId, updates);
    return redirect(`/tasks/${params.taskId}`);
  }

export default function EditTask() {
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
          defaultValue={task.name}
        />
      </p>
      <label>
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={task.description}
          rows={6}
        />
      </label>

      <label>
        <span>Done</span>
        <input
          name="done"
         type="checkbox"
          defaultChecked= {task.done}
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