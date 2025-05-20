import { useEffect, useState } from "react";
import brush from "@/assets/brush.png";

function Firstview() {
  const [isFirstViewShow, setIsFirstViewShow] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<string>("opacity-100");
  const [subTitleOpacity, setSubTitleOpacity] = useState<string>("opacity-0");

  useEffect(() => {
    setTimeout(() => {
      setSubTitleOpacity("opacity-100");
    }, 800);
    setTimeout(() => {
      setOpacity("opacity-0");
    }, 2000);
    setTimeout(() => {
      setIsFirstViewShow(false);
    }, 2000);
  }, []);

  return (
    isFirstViewShow && (
      <div className={`${opacity} transition`}>
        <div className="w-full h-full overflow-hidden bg-amber-50 absolute z-999 top-0 left-0 pb-[100px] lg:pb-[300px] flex flex-col items-center justify-center">
          <div className="pl-2 text-gray-950 text-6xl font-bold font-[Rampart_One]">
            Todolist
          </div>
          <img
            src={brush}
            className="max-w-[500px] scale-y-65 relative left-[30px] rotate-358 brush-line-animate"
          />
          <div
            className={`${subTitleOpacity} transition text-lg font-[Comic_Relief]`}
          >
            Plan less. Do more.
          </div>
        </div>
      </div>
    )
  );
}

export default Firstview;
