import { useState } from "react";
import { useTodo } from "@/context/TodoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function TodoInput() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const { AddTodo, handleSelect } = useTodo();

  const handleAddTodo = () => {
    const formatDate = date.toISOString();
    AddTodo(title, formatDate);
    setTitle("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const hasInput = title.trim() !== "";
    if (e.key === "Enter" && hasInput) {
      handleAddTodo();
    }
  };

  return (
    <div className="p-4 sm:px-6 flex flex-col gap-4 items-start justify-center sm:justify-between">
      <div className="flex gap-2 w-full">
        <Input
          placeholder="新增待辦事項"
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="max-w-[325px] focus-visible:ring-ring/0"
        />
        <div className="flex items-center rounded-md hover:bg-gray-200">
          <DatePicker id={null} date={date} setDate={setDate} />
        </div>
      </div>
      <div className="flex flex-wrap justify-between w-full sm:justify-between">
        <Button
          onClick={handleAddTodo}
          className="cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-md"
          disabled={!title.trim()}
        >
          加入清單
        </Button>
        <Select onValueChange={(value) => handleSelect(value)}>
          <SelectTrigger className="w-[110px] focus-visible:ring-ring/0">
            <SelectValue placeholder="選擇分類" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="not_done">未完成</SelectItem>
            <SelectItem value="is_done">已完成</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default TodoInput;
