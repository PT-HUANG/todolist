import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "@/api/firebase";
import { Spinner } from "@/components";

const registerSchema = z
  .object({
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
  error_password: string | null;
  error_confirmPassword: string | null;
};

function ResetForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [zodError, setZodError] = useState<zodErrorType>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const actionCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!actionCode) {
      navigate("/");
      return;
    }
  }, [navigate, actionCode]);

  const handleResetPassword = async () => {
    const result = registerSchema.safeParse({
      password,
      confirmPassword,
    });
    if (result.error) {
      const error_password =
        result.error.issues.find((e) => e.path.includes("password"))?.message ||
        null;
      const error_confirmPassword =
        result.error.issues.find((e) => e.path.includes("confirmPassword"))
          ?.message || null;
      setZodError({
        error_password,
        error_confirmPassword,
      });
      return;
    } else {
      if (actionCode) {
        await resetPassword(actionCode, password);
        setIsLoading(true);
        setPassword("");
        setConfirmPassword("");
      }
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="relative my-3 flex items-center justify-between">
        <div className="font-[Comic_Relief] font-bold text-2xl text-slate-800 text-left pl-4">
          更新密碼
        </div>
      </div>
      <div className="flex flex-col w-[90%] items-start max-w-[350px] mx-auto">
        <span className="text-left text-lg mt-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          新密碼
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
          再次確認新密碼
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
        <Button
          onClick={handleResetPassword}
          className="rounded-sm w-full py-6 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-green-700 hover:bg-green-600 overflow-hidden"
        >
          <div className="font-bold text-base text-white">確認</div>
        </Button>
      </div>
    </>
  );
}

export default ResetForm;
