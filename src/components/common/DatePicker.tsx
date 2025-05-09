import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker() {
  const [date, setDate] = useState<Date>(new Date());
  const isExpired = new Date().setHours(0, 0, 0, 0) > date.setHours(0, 0, 0, 0);

  return (
    <Popover>
      <PopoverTrigger className="flex items-center px-2">
        <CalendarIcon className="mr-2 h-4 w-4 text-zinc-500" />
        <span
          className={`hidden sm:inline text-sm font-[Comic_Relief] 
            ${isExpired ? "text-red-400" : "text-zinc-500"} `}
        >
          {format(date, "yyyy-MM-dd")}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
