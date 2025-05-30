import Logout from "./Logout";
function Header() {
  return (
    <div className="relative mx-auto my-2 sm:mx-6 flex items-center justify-between">
      <div className="font-[Comic_Relief] font-bold text-2xl text-slate-500 text-left pl-4">
        Todolist
      </div>
      <Logout />
    </div>
  );
}

export default Header;
