import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className }: { className?: string }) {
  return (
    <>
      <div className="w-full h-full bg-neutral-800 opacity-80 absolute z-999 top-0 left-0 pb-[10%] flex items-center justify-center">
        <Loader2
          className={cn(
            "h-10 w-10 animate-spin text-muted-foreground",
            className
          )}
        />
        <div className="pl-2 text-muted-foreground text-3xl font-bold">
          Loading...
        </div>
      </div>
      <div className="w-full h-full bg-white absolute top-0 left-0"></div>
    </>
  );
}

export default Spinner;
