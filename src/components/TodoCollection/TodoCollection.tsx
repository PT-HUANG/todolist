import Todo from "./Todo";
import { useTodo } from "@/context/TodoContext";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/api/firebase";

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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        GetTodos();
      }
    });
  }, [todos.length]);

  return (
    <div className="sm:px-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-stone-300">
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
