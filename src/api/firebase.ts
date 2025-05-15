// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWSldCwevG8vqbRPDZEUNuLTzxdURrWM4",
  authDomain: "todolist-auth-11d8c.firebaseapp.com",
  projectId: "todolist-auth-11d8c",
  storageBucket: "todolist-auth-11d8c.firebasestorage.app",
  messagingSenderId: "803063598797",
  appId: "1:803063598797:web:3bcab609ca3584949ea384",
  measurementId: "G-9166NZQPG8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export const loginWithOAuth = async (path: string) => {
  let provider;
  switch (path) {
    case "google":
      provider = new GoogleAuthProvider();
      break;
    case "facebook":
      provider = new FacebookAuthProvider();
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
      "user_google",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      })
    );
    console.log("登入成功：", user);
  } catch (error: any) {
    console.error("登入失敗：", error.message);
  }
};
