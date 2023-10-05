import { Outlet, NavLink, useLoaderData,Form, redirect, useNavigation} from "react-router-dom";
import { getTasks, createTask } from "../tasks";
import { useEffect, useState } from "react";
import FilterButtons from '../filter'
import { async } from "q";

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
    const [filter, setFilter] = useState("all");
    const[taskList, setTasks] = useState(tasks);

    const  filterTasks = () => {
      
      switch (filter) {
        case "done":
          return  taskList.filter((task) => task.done);
        case "undone":
          return taskList.filter((task) => !task.done);
        default:
          return taskList;
      }

    };


    return (
      <>
        <div id="sidebar">
          <h1>React Router Tasks</h1>
          <div>
            <Form method="post">
              <button type="submit">New Task</button>
            </Form>
            <FilterButtons setTasks={setTasks} filter={filter} setFilter={setFilter}/>
          </div>
          <nav>
          {filterTasks().length ? (
            <ul>
              {filterTasks().map((task) => (
                <li key={task.id}>
                <input type="checkbox" checked={task.done == 'on' ? 'on' : 'off'}></input>
                <div>
          <Form action={'tasks/'+task.id + '/edit'}>
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action={'tasks/'+task.id + '/destroy'}
            onSubmit={(event) => {
              if (!window.confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
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
                 
                    {task.name ? (
                      <>
                        {task.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
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