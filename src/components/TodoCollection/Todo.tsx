import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components";
function Todo({ title, isDone }: { title: string; isDone: boolean }) {
  const [todo, SetTodo] = useState(title);
  const [isEdit, SetIsEdit] = useState(false);
  const [isDoneStatus, setIsDoneStauts] = useState(isDone);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        SetIsEdit(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        SetIsEdit(false);
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

  return (
    <div
      className="
      relative flex items-center justify-between gap:4 sm:gap-6 rounded-md px-4 py-2 group hover:bg-gray-200 
      "
    >
      <div className="flex grow items-center gap-3">
        <Checkbox
          onCheckedChange={() => setIsDoneStauts(!isDoneStatus)}
          checked={isDoneStatus}
          className="rounded-full border-gray-400 focus-visible:ring-ring/0
        data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-white"
        />
        <input
          type="text"
          ref={inputRef}
          value={todo}
          onChange={(e) => {
            SetTodo(e.target.value);
          }}
          onClick={() => {
            SetIsEdit(true);
          }}
          className={`w-full p-1 border-transparent shadow-none focus:outline-none focus:ring-0 focus:border-stone-400 
            ${isEdit ? "border-b" : ""}
            ${isDoneStatus ? "line-through text-gray-400" : ""}`}
        />
      </div>
      <div className="flex items-center gap-2">
        <DatePicker />
        <i className="fa-solid fa-xmark text-zinc-400 hover:text-black cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 lg:pb-0.5"></i>
      </div>
    </div>
  );
}

export default Todo;
