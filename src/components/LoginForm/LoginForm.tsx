import { Button } from "@/components/ui/button";
import google from "@/assets/google.svg";
import { loginWithOAuth, auth } from "@/api/firebase";
import { getRedirectResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        console.log("🔁 getRedirectResult:", result);

        if (result && result.user) {
          const user = result.user;
          localStorage.setItem(
            "user_firebase",
            JSON.stringify({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
            })
          );
          navigate("/"); // 導回主頁
        }
      } catch (error: any) {
        console.error("處理 redirect 登入錯誤：", error.message);
      }
    };

    handleRedirectResult();
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
