import { useState, useContext, createContext } from "react";
import type { ReactNode } from "react";
import { addTodo, getTodos, updateTodo, deleteTodo } from "@/api/firestore";

// variable type
type TodoType = {
  id: string;
  title: string;
  expireDate: string;
  isDone: boolean;
};

type StatusType = null | string;

// function type
type HandleSelectType = (value: string) => void;
type AddTodoType = (title: string, expireDate: string) => void;
type GetTodosType = () => void;
type ToggleIsDoneType = (id: string) => void;
type EditTodoTitleType = (id: string, newTitle: string) => void;
type EditExpireDateType = (id: string, newDate: string) => void;
type DeleteTodoType = (id: string) => void;

// context type
type TodoContextType = {
  todos: TodoType[];
  selectedStatus: StatusType;
  handleSelect: HandleSelectType;
  AddTodo: AddTodoType;
  GetTodos: GetTodosType;
  ToggleIsDone: ToggleIsDoneType;
  EditTodoTitle: EditTodoTitleType;
  EditExpireDate: EditExpireDateType;
  DeleteTodo: DeleteTodoType;
};

// context provider type
type TodoProviderProps = {
  children: ReactNode;
};

const TodoContext = createContext<TodoContextType>({
  todos: [],
  selectedStatus: null,
  handleSelect: () => {},
  AddTodo: () => {},
  GetTodos: () => {},
  ToggleIsDone: () => {},
  EditTodoTitle: () => {},
  EditExpireDate: () => {},
  DeleteTodo: () => {},
});

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(null);

  const handleSelect = (value: string) => {
    setSelectedStatus(value);
  };

  const GetTodos = async () => {
    const todos = await getTodos();
    if (todos) {
      setTodos(todos);
    }
  };

  const AddTodo: AddTodoType = async (title, expireDate) => {
    await addTodo(title, expireDate);
    GetTodos();
  };

  const ToggleIsDone: ToggleIsDoneType = async (editid) => {
    const toToggle = todos?.find((todo) => todo.id === editid);
    if (!toToggle) return;
    toToggle["isDone"] = !toToggle.isDone;
    const { id, title, expireDate, isDone } = toToggle;
    await updateTodo(id, title, expireDate, isDone);
    GetTodos();
  };

  const EditTodoTitle: EditTodoTitleType = async (editid, newTitle) => {
    const toEdit = todos?.find((todo) => todo.id === editid);
    if (!toEdit) return;
    toEdit["title"] = newTitle;
    const { id, title, expireDate, isDone } = toEdit;
    await updateTodo(id, title, expireDate, isDone);
    GetTodos();
  };

  const EditExpireDate: EditExpireDateType = async (editid, newDate) => {
    const toEdit = todos?.find((todo) => todo.id === editid);
    if (!toEdit) return;
    toEdit["expireDate"] = newDate;
    const { id, title, expireDate, isDone } = toEdit;
    await updateTodo(id, title, expireDate, isDone);
    GetTodos();
  };

  const DeleteTodo: DeleteTodoType = async (id) => {
    await deleteTodo(id);
    GetTodos();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        selectedStatus,
        handleSelect,
        AddTodo,
        GetTodos,
        ToggleIsDone,
        EditTodoTitle,
        EditExpireDate,
        DeleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
