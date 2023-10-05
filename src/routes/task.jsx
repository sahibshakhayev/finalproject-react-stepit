import { Form, useLoaderData } from "react-router-dom";
import { getTask } from "../tasks";

export async function loader({ params }) {
  const task = await getTask(params.taskId);
  return { task };
}


export default function Task() {
  const { task } = useLoaderData();


  

  return (
    <div id="task">

      <div>
        <h1>
          {task.name ? (
            <>
              {task.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          {/* <Favorite contact={contact} /> */}
        </h1>

        {task.description && <p>{task.description}</p>}

        {/* <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!window.confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div> */}
      </div>
    </div>
  );
}