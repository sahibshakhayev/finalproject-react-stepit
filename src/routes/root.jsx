import { Outlet, NavLink, useLoaderData,Form, redirect, useNavigation} from "react-router-dom";
import { getTasks, createTask } from "../tasks";
import {Done} from "../routes/task"

export async function action() {
  const task = await createTask();
  return redirect(`/tasks/${task.id}/edit`);
}

export async function loader() {
  const tasks = await getTasks();
  return { tasks};
}

export default function Root() {
    const { tasks } = useLoaderData();
    const navigation = useNavigation();
    return (
      <>
        <div id="sidebar">
          <h1>React Router Tasks</h1>
          <div>
            <Form method="post">
              <button type="submit">New Task</button>
            </Form>
          </div>
          <nav>
          {tasks.length ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                <NavLink
                    to={`tasks/${task.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {<Done task={task}/>}
                    {task.name ? (
                      <>
                        {task.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {task.done && <input type="checkbox" checked="false"/>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No tasks</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }>
        <Outlet />

        </div>
      </>
    );
  }