import { Button } from "@/components/ui/button";
import google from "@/assets/google.svg";
import { loginWithOAuth } from "@/api/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/api/firebase";

function LoginForm() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
      } else console.log("尚未登入");
    });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Button
        onClick={() => loginWithOAuth("google")}
        className="rounded-sm w-[90%] max-w-[250px] pr-15 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-white hover:bg-slate-100 border border-zinc-300 overflow-hidden"
      >
        <img src={google} alt="google" className="max-w-[30px]" />
        <div className="font-bold text-zinc-600">Login with Google</div>
      </Button>
      <Button
        onClick={() => loginWithOAuth("github")}
        className="rounded-sm w-[90%] max-w-[250px] pr-12 my-2 h-10 flex items-center justify-center gap-6 cursor-pointer bg-neutral-800 overflow-hidden"
      >
        <i className="fa-brands fa-github"></i>
        <div className="font-bold">Login with GitHub</div>
      </Button>
    </div>
  );
}

export default LoginForm;
