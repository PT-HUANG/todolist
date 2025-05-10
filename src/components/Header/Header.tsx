import UserInfo from "./UserInfo";
function Header() {
  return (
    <div className="relative mx-2 sm:mx-6">
      <div className="font-[Comic_Relief] text-2xl text-slate-500 font-bold text-center my-2">
        Todolist
      </div>
      <UserInfo />
    </div>
  );
}

export default Header;
