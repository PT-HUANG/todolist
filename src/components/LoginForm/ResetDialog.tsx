import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useState, forwardRef, useRef } from "react";
import { z } from "zod";
import { resetPasswordWithEmail } from "@/api/firebase";

const resetSchema = z.object({
  email: z.string().email({ message: "※請輸入有效的 Email" }),
});

type zodErrorType = {
  error_email: string | null;
};

const CloseButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>((props, ref) => (
  <DialogClose asChild>
    <button ref={ref} {...props} />
  </DialogClose>
));

CloseButton.displayName = "CloseButton";

function ResetDialog() {
  const [email, setEmail] = useState<string>("");
  const [zodError, setZodError] = useState<zodErrorType>();
  const [success, setSuccess] = useState<boolean | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async () => {
    const result = resetSchema.safeParse({
      email,
    });
    if (result.error) {
      setSuccess(false);
      const error_email =
        result.error.issues.find((e) => e.path.includes("email"))?.message ||
        null;
      setZodError({
        error_email,
      });
      return;
    } else {
      setZodError({
        error_email: "",
      });
      await resetPasswordWithEmail(email);
      setSuccess(true);
      setTimeout(() => {
        closeRef.current?.click();
        setSuccess(false);
        setEmail("");
      }, 2000);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="mx-auto text-green-700 cursor-pointer hover:underline">
        忘記密碼?
      </DialogTrigger>
      <DialogContent className="top-[40%] gap-2">
        <DialogHeader>
          <DialogTitle className="text-xl mb-2 pl-1">重新設定密碼</DialogTitle>
          <DialogDescription>
            <div className="text-base text-gray-900 bg-gray-100 rounded-md p-4">
              忘記您的密碼？請輸入電子郵件。您將會在電子郵件信箱中收到重設密碼的連結。
            </div>
            <div className="my-3 pl-1 text-left text-gray-900 text-lg after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
              電子郵件
            </div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] focus-visible:ring-ring/0"
            />
            {success && (
              <div className="bg-gray-200 rounded-lg text-base text-gray-900 font-bold mt-3 p-6">
                ✅ 已送出重設密碼的電子郵件
              </div>
            )}
            <div className="text-base text-red-500 font-bold mt-3 pl-1">
              {zodError?.error_email}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            onClick={handleSubmit}
            className="rounded-sm py-4 h-10 flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 overflow-hidden font-bold text-base text-stone-800"
          >
            重設密碼
          </Button>
          <CloseButton ref={closeRef} className="hidden" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResetDialog;
