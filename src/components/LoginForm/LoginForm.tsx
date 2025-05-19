import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResetDialog from "./ResetDialog";
import google from "@/assets/google.svg";
import { loginWithOAuth, loginWithEmailPassword } from "@/api/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/api/firebase";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "※請輸入有效的 Email" }),
  password: z
    .string()
    .min(8, { message: "※密碼至少 8 個字元" })
    .refine(
      (val) => /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val),
      {
        message: "※密碼需包含大小寫字母與數字",
      }
    ),
});

type zodErrorType = {
  error_email: string | null;
  error_password: string | null;
};

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [zodError, setZodError] = useState<zodErrorType>();
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
      } else console.log("尚未登入");
    });
  }, [navigate]);

  const handleLoginWithPassword = async () => {
    const result = loginSchema.safeParse({
      email,
      password,
    });
    if (result.error) {
      const error_email =
        result.error.issues.find((e) => e.path.includes("email"))?.message ||
        null;
      const error_password =
        result.error.issues.find((e) => e.path.includes("password"))?.message ||
        null;
      if (error_email) {
        setEmail("");
      }
      if (error_password) {
        setPassword("");
      }
      setZodError({
        error_email,
        error_password,
      });
      return;
    } else {
      const result = await loginWithEmailPassword(email, password);
      if (!result) {
        setZodError({
          error_email: "",
          error_password: "",
        });
        setEmail("");
        setPassword("");
        setLoginError("※登入失敗，請檢查帳號密碼是否正確");
      }
    }
  };

  const handleLoginWithOAuth = async (path: string) => {
    await loginWithOAuth(path);
  };

  return (
    <>
      <div className="relative my-2 flex flex-col pl-4">
        <div className="font-[Comic_Relief] font-bold text-2xl text-slate-800 text-left">
          登入
        </div>
        <div className="pt-2 text-base font-bold text-red-500">
          {loginError}
        </div>
      </div>
      <div className="flex flex-col w-[90%] items-start max-w-[350px] mx-auto">
        <span className="text-left text-lg my-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          電子郵件
        </span>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`px-3 py-3 w-full focus-visible:ring-ring/0 bg-gray-50 focus-visible:border-ring ${
            !email.length && zodError?.error_email
              ? "border-red-500 focus-visible:border-red-500"
              : "border-zinc-300"
          }`}
        />
        <span className="text-base text-red-500 font-bold mt-1">
          {!email.length && zodError?.error_email}
        </span>
        <span className="text-left text-lg my-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          密碼
        </span>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`px-3 py-3 w-full focus-visible:ring-ring/0 bg-gray-50 focus-visible:border-ring ${
            !password.length && zodError?.error_password
              ? "border-red-500 focus-visible:border-red-500"
              : "border-zinc-300"
          }`}
        />
        <span className="text-base text-red-500 font-bold mt-1">
          {!password.length && zodError?.error_password}
        </span>
        <Button
          onClick={handleLoginWithPassword}
          className="rounded-sm w-full py-6 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-green-700 hover:bg-green-600 overflow-hidden"
        >
          <div className="font-bold text-base text-white">登入</div>
        </Button>
        <ResetDialog />
        <Button
          onClick={() => handleLoginWithOAuth("google")}
          className="rounded-sm w-full py-6 pr-8 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-white hover:bg-slate-100 border border-zinc-300 overflow-hidden"
        >
          <img src={google} alt="google" className="max-w-[30px]" />
          <div className="font-bold text-base text-zinc-600">
            Login with Google
          </div>
        </Button>
        <Button
          onClick={() => handleLoginWithOAuth("github")}
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
