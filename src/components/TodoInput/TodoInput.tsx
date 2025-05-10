import { useState } from "react";
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
  const [content, setContent] = useState("");

  return (
    <div className="p-4 sm:px-6 flex flex-col gap-4 items-start justify-center sm:justify-between">
      <div className="flex gap-2 w-full">
        <Input
          placeholder="新增待辦事項"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-w-[300px] focus-visible:ring-ring/0"
        />
        <div className="flex items-center rounded-md hover:bg-gray-200">
          <DatePicker />
        </div>
      </div>
      <div className="flex gap-4 w-full sm:justify-between">
        <Button
          className="cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-md"
          disabled={!content.trim()}
        >
          加入清單
        </Button>
        <Select>
          <SelectTrigger className="w-[110px] focus-visible:ring-ring/0">
            <SelectValue placeholder="選擇分類" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="undone">未完成</SelectItem>
            <SelectItem value="done">已完成</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default TodoInput;
