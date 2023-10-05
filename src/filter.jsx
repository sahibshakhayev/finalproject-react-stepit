import {getTasks} from './tasks';

function FilterButtons({ filter, setFilter, setTasks }) {
    return (
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={async () => setFilter("all") && setTasks(await getTasks())}
        >
          Показать все
        </button>
        <button
          className={filter === "done" ? "active" : ""}
          onClick={async () => setFilter("done") && setTasks(await getTasks()) }
        >
          Показать проделанные
        </button>
        <button
          className={filter === "undone" ? "active" : ""}
          onClick={async () => setFilter("undone") && setTasks(await getTasks()) }
        >
          Показать несделанные
        </button>
      </div>
    );

}

export default FilterButtons;