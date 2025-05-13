import { useState, useContext, createContext } from "react";
import type { ReactNode } from "react";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/api/json-server";

// const dummyData = [
//   {
//     id: 1,
//     title: "Learn react-router",
//     expireDate: "2025-05-13T12:00:00.000Z",
//     isDone: true,
//   },
//   {
//     id: 2,
//     title: "Learn to create custom hooks",
//     expireDate: "2025-05-13T12:00:00.000Z",
//     isDone: false,
//   },
//   {
//     id: 3,
//     title: "Learn to use context",
//     expireDate: "2025-05-13T12:00:00.000Z",
//     isDone: true,
//   },
//   {
//     id: 4,
//     title: "Learn to implement auth",
//     expireDate: "2025-05-13T12:00:00.000Z",
//     isDone: false,
//   },
// ];

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
    const todos = await fetchTodos();
    setTodos(todos);
  };

  const AddTodo: AddTodoType = async (title, expireDate) => {
    const id = Math.floor(Math.random() * 1000000).toString();
    const newTodo = { id, title, expireDate, isDone: false };
    await createTodo(newTodo);
    const nextTodos = [...todos, newTodo];
    setTodos(nextTodos);
  };

  const ToggleIsDone: ToggleIsDoneType = async (id) => {
    const toToggle = todos.find((todo) => todo.id === id);
    if (!toToggle) return;
    const newTodo = { ...toToggle, isDone: !toToggle.isDone };
    await updateTodo(newTodo);
  };

  const EditTodoTitle: EditTodoTitleType = async (id, newTitle) => {
    const toEdit = todos.find((todo) => todo.id === id);
    if (!toEdit) return;
    const newTodo = { ...toEdit, title: newTitle };
    await updateTodo(newTodo);
  };

  const EditExpireDate: EditExpireDateType = (id, newDate) => {
    const toEdit = todos.find((todo) => todo.id === id);
    if (!toEdit) return;
    const newTodo = { ...toEdit, expireDate: newDate };
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        return newTodo;
      } else return todo;
    });
    setTodos(nextTodos);
  };

  const DeleteTodo: DeleteTodoType = async (id) => {
    const nextTodos = todos.filter((todo) => todo.id !== id);
    await deleteTodo(id);
    setTodos(nextTodos);
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
