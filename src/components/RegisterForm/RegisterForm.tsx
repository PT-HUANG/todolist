import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupWithEmailPassword } from "@/api/firebase";
import { useState } from "react";
import { z } from "zod";

const registerSchema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "※輸入的密碼不一致",
    path: ["confirmPassword"],
  });

type zodErrorType = {
  error_email: string | null;
  error_password: string | null;
  error_confirmPassword: string | null;
};

function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [zodError, setZodError] = useState<zodErrorType>();

  const handleRegister = async () => {
    const result = registerSchema.safeParse({
      email,
      password,
      confirmPassword,
    });
    if (result.error) {
      const error_email =
        result.error.issues.find((e) => e.path.includes("email"))?.message ||
        null;
      const error_password =
        result.error.issues.find((e) => e.path.includes("password"))?.message ||
        null;
      const error_confirmPassword =
        result.error.issues.find((e) => e.path.includes("confirmPassword"))
          ?.message || null;
      setZodError({
        error_email,
        error_password,
        error_confirmPassword,
      });
      return;
    } else {
      const result = await signupWithEmailPassword(email, password);
      if (!result) {
        setZodError({
          error_email: "※此Email已經註冊過",
          error_password: "",
          error_confirmPassword: "",
        });
      }
    }
  };

  return (
    <>
      <div className="relative my-3 flex items-center justify-between">
        <div className="font-[Comic_Relief] font-bold text-2xl text-slate-800 text-left pl-4">
          註冊
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
          className="px-3 py-3 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <span className="text-base text-red-500 font-bold mt-1">
          {zodError?.error_email}
        </span>
        <span className="text-left text-lg mt-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          密碼
        </span>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-3 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <span className="text-base text-red-500 font-bold mt-1">
          {zodError?.error_password}
        </span>
        <span className="text-left text-lg mt-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          再次確認密碼
        </span>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-3 py-3 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <span className="text-base text-red-500 font-bold mt-1">
          {zodError?.error_confirmPassword}
        </span>
        <div className="my-2 p-4 bg-gray-100 rounded-md">
          我們會使用你的個人資料來支援你在本網站中的使用體驗、管理你的帳號存取權，以及用於隱私權政策中說明的其他用途。
        </div>
        <Button
          onClick={handleRegister}
          className="rounded-sm w-full py-6 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-green-700 hover:bg-green-600 overflow-hidden"
        >
          <div className="font-bold text-base text-white">註冊</div>
        </Button>
      </div>
    </>
  );
}

export default RegisterForm;
