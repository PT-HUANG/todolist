import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import google from "@/assets/google.svg";
import { loginWithOAuth } from "@/api/firebase";
import { useNavigate, Link } from "react-router-dom";
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
    <>
      <div className="relative my-2 flex items-center justify-between">
        <div className="font-[Comic_Relief] font-bold text-2xl text-slate-800 text-left pl-4">
          登入
        </div>
      </div>
      <div className="flex flex-col w-[90%] items-start max-w-[350px] mx-auto">
        <span className="text-left text-lg my-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          電子郵件
        </span>
        <Input
          type="email"
          className="px-3 py-3 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <span className="text-left text-lg my-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          密碼
        </span>
        <Input
          type="password"
          className="px-3 py-3 mb-2 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <Button className="rounded-sm w-full py-6 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-green-700 hover:bg-green-600 overflow-hidden">
          <div className="font-bold text-base text-white">登入</div>
        </Button>
        <Link
          to="/"
          className="w-full mx-auto mb-4 text-green-700 text-center hover:underline"
        >
          忘記密碼?
        </Link>
        <Button
          onClick={() => loginWithOAuth("google")}
          className="rounded-sm w-full py-6 pr-8 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-white hover:bg-slate-100 border border-zinc-300 overflow-hidden"
        >
          <img src={google} alt="google" className="max-w-[30px]" />
          <div className="font-bold text-base text-zinc-600">
            Login with Google
          </div>
        </Button>
        <Button
          onClick={() => loginWithOAuth("github")}
          className="rounded-sm w-full py-6 pr-6.5 my-1 h-10 flex items-center justify-center gap-4.5 cursor-pointer bg-neutral-800 overflow-hidden"
        >
          <i className="fa-brands fa-github text-xl"></i>
          <div className="font-bold text-base">Login with GitHub</div>
        </Button>
      </div>
    </>
  );
}

export default LoginForm;
