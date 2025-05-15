// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
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
            `user_${path}`,
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