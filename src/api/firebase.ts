// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4FuAlwSVGXKTzFt3CCoe2RvJfhW8bFio",
  authDomain: "todolist-cd951.firebaseapp.com",
  projectId: "todolist-cd951",
  storageBucket: "todolist-cd951.firebasestorage.app",
  messagingSenderId: "339215811281",
  appId: "1:339215811281:web:8b564cb4627a9473357bf0",
  measurementId: "G-5D2H0V89GJ",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const auth = getAuth(app);

// OAuth 登入功能
export const loginWithOAuth = async (path: string) => {
  let provider;
  switch (path) {
    case "google":
      provider = new GoogleAuthProvider();
      break;
    case "github":
      provider = new GithubAuthProvider();
      break;
    default:
      throw new Error("Unknown provider: " + path);
  }

  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result)
    // const token = credential?.accessToken
    const user = result.user;
    localStorage.setItem(
      "user_firebase",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      })
    );
    console.log("登入成功：", user);
    window.location.href = "/";
  } catch (error: any) {
    console.error("登入失敗：", error.message);
  }
};

// 註冊功能
export const signupWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    localStorage.setItem(
      "user_firebase",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      })
    );
    console.log("登入成功：", user);
    window.location.href = "/";
  } catch (error: any) {
    console.error("註冊失敗：", error.message);
    return false;
  }
};

// Email密碼登入功能
export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    localStorage.setItem(
      "user_firebase",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      })
    );
    console.log("登入成功：", user);
    window.location.href = "/";
  } catch (error: any) {
    console.error("登入失敗：", error.message);
    return false;
  }
};

// 透過Email傳送重新設定密碼連結
export const resetPasswordWithEmail = async (email: string) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error("重設密碼Email寄送失敗", error.message);
    return false;
  }
};

// 驗證oobcode
export const resetPassword = async (
  actionCode: string,
  newPassword: string
) => {
  const auth = getAuth();
  try {
    await verifyPasswordResetCode(auth, actionCode);
    try {
      const result = await confirmPasswordReset(auth, actionCode, newPassword);
      return result;
    } catch (error) {
      console.error("密碼更新錯誤，請檢查Firebase設定", error);
    }
  } catch (error) {
    console.error("Action Code錯誤，請檢查Firebase設定", error);
  }
};
