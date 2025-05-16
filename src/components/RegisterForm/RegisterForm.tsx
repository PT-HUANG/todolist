import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function RegisterForm() {
  return (
    <>
      <div className="relative my-2 flex items-center justify-between">
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
          className="px-3 py-3 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <span className="text-left text-lg my-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          密碼
        </span>
        <Input
          type="password"
          className="px-3 py-3 mb-2 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <span className="text-left text-lg my-2 after:relative after:left-0.5 after:bottom-1.5 after:text-sm  after:text-red-500 after:content-['*']">
          再次確認密碼
        </span>
        <Input
          type="password"
          className="px-3 py-3 mb-2 w-full focus-visible:ring-ring/0 bg-gray-50 border-zinc-300"
        />
        <div className="my-2 p-4 bg-gray-100 rounded-md">
          我們會使用你的個人資料來支援你在本網站中的使用體驗、管理你的帳號存取權，以及用於隱私權政策中說明的其他用途。
        </div>
        <Button className="rounded-sm w-full py-6 my-2 h-10 flex items-center justify-center gap-3 cursor-pointer bg-green-700 hover:bg-green-600 overflow-hidden">
          <div className="font-bold text-base text-white">註冊</div>
        </Button>
      </div>
    </>
  );
}

export default RegisterForm;
