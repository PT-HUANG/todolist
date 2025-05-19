import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase";

// 目前因為 React 版本的問題
// React 18 並不接受 ref as a prop 的傳遞方式，所以會報錯
// 但如果升級到 React 19 會導致選擇日期的 react-day-picker 出現樣式的問題(2025/5/14 官方尚未修復)
// 折衷考量之下決定暫時先不管登出按鈕按下後出現的錯誤訊息，以不影響使用者體驗的情況為優先

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user_firebase");
      navigate("/login");
    } catch (error) {
      console.error("登出失敗:", error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user_firebase");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="mr-4 sm:mr-0 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer">
        登出
      </AlertDialogTrigger>
      <AlertDialogContent className="top-[30%]">
        <AlertDialogHeader>
          <AlertDialogTitle>確定要登出嗎?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="cursor-pointer">
            確定
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Logout;
