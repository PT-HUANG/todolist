import Todo from "./Todo";
import { useTodo } from "@/context/TodoContext";
import { useEffect } from "react";

function TodoCollection() {
  const { GetTodos, todos, selectedStatus } = useTodo();

  let filteredTodos = [];

  switch (selectedStatus) {
    case "all":
      filteredTodos = todos;
      break;
    case "not_done":
      filteredTodos = todos.filter((todo) => !todo.isDone);
      break;
    case "is_done":
      filteredTodos = todos.filter((todo) => todo.isDone);
      break;
    default:
      filteredTodos = todos;
      break;
  }

  useEffect(() => {
    GetTodos();
  }, [filteredTodos]);

  return (
    <div className="sm:px-4">
      {filteredTodos?.map((todo) => {
        const { id, title, expireDate, isDone } = todo;
        return (
          <Todo
            key={id}
            id={id}
            title={title}
            expireDate={expireDate}
            isDone={isDone}
          />
        );
      })}
    </div>
  );
}

export default TodoCollection;
