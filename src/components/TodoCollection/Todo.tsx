import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components";
import { useTodo } from "@/context/TodoContext";
import debounce from "lodash/debounce";

type TodoType = {
  id: string;
  title: string;
  expireDate: string;
  isDone: boolean;
};

function Todo({ id, title, expireDate, isDone }: TodoType) {
  const { ToggleIsDone, EditTodoTitle, DeleteTodo } = useTodo();
  const [todoTitle, setTodoTitle] = useState(title);
  const [date, setDate] = useState(new Date(expireDate));
  const [localIsDone, setLocalIsDone] = useState(isDone);
  const [isEditing, setIsEditing] = useState(false);

  const debouncedToggle = useRef(
    debounce((id: string) => {
      ToggleIsDone(id);
    }, 1000)
  ).current;

  const handleCheck = () => {
    setLocalIsDone(!localIsDone);
    debouncedToggle(id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleDelete = () => {
    DeleteTodo(id);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setIsEditing(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isEditing && todoTitle !== title) {
      debounce(() => {
        EditTodoTitle(id, todoTitle);
      }, 2000)();
    }
  }, [isEditing]);

  return (
    <div
      className="
      flex items-center justify-between gap:4 sm:gap-6 rounded-md px-4 sm:px-3 py-2 group hover:bg-gray-200 
      "
    >
      <div className="flex grow items-center gap-3">
        <Checkbox
          onCheckedChange={handleCheck}
          checked={localIsDone}
          className="rounded-full border-gray-400 focus-visible:ring-ring/0
        data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-white"
        />
        <input
          type="text"
          ref={inputRef}
          value={todoTitle}
          onChange={handleTitleChange}
          onClick={() => setIsEditing(true)}
          className={`w-full p-1 border-transparent shadow-none focus:outline-none focus:ring-0 focus:border-stone-400 
            ${isEditing ? "border-b" : ""}
            ${localIsDone ? "line-through text-gray-400" : ""}`}
        />
      </div>
      <div className="flex items-center gap-2">
        <DatePicker id={id} date={date} setDate={setDate} />
        <i
          onClick={handleDelete}
          className="fa-solid fa-xmark text-zinc-400 hover:text-black cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 lg:pb-0.5"
        ></i>
      </div>
    </div>
  );
}

export default Todo;
