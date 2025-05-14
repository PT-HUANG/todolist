import { Button } from "../ui/button";
import google from "../../../public/google.svg";

function LoginForm() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Button className="rounded-sm w-[90%] max-w-[250px] pr-15 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-white hover:bg-slate-100 border border-zinc-300 overflow-hidden">
        <img src={google} alt="google" className="max-w-[30px]" />
        <div className="font-bold text-zinc-600">Login with Google</div>
      </Button>
      <Button className="rounded-sm w-[90%] max-w-[250px] pr-8 my-2 h-10 flex items-center justify-center gap-6 cursor-pointer bg-[#0866FF] hover:bg-[#0866FF] hover:opacity-90 overflow-hidden">
        <i className="fa-brands fa-facebook-f"></i>
        <div className="font-bold">Login with Facebook</div>
      </Button>
      <Button className="rounded-sm w-[90%] max-w-[250px] pr-12 my-2 h-10 flex items-center justify-center gap-6 cursor-pointer bg-neutral-800 overflow-hidden">
        <i className="fa-brands fa-github"></i>
        <div className="font-bold">Login with GitHub</div>
      </Button>
    </div>
  );
}

export default LoginForm;
