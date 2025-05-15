import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { auth } from "./firebase";

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
const db = getFirestore(app);

type addTodoType = (title: string, expireDate: string) => Promise<void>;
type getTodosType = () => Promise<any[] | undefined>
type resultType = { id: string, title: string, expireDate: string, isDone: boolean }[]
type updateTodoType = (id: string, title: string, expireDate: string, isDone: boolean) => Promise<void>
type deleteTodoType = (id: string) => Promise<void>

// 新增資料功能 CREATE
export const addTodo: addTodoType = async (title, expireDate) => {
    const uid = auth.currentUser?.uid
    if (!uid) throw new Error("User not logged in");
    try {
        const docRef = doc(collection(db, "todo"));
        const newTodo = {
            id: docRef.id,
            uid,
            title,
            expireDate,
            isDone: false,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
        };
        await setDoc(docRef, newTodo);
        console.log("新增資料成功")
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

// 讀取資料功能 READ
export const getTodos: getTodosType = async () => {
    const uid = auth.currentUser?.uid
    try {
        const q = query(collection(db, "todo"), where("uid", "==", uid), orderBy("created_at", "asc"))
        const querySnapshot = await getDocs(q)
        const result: resultType = []
        querySnapshot.forEach((doc) => {
            const { id, title, expireDate, isDone } = doc.data()
            result.push({ id, title, expireDate, isDone })
        });
        return result
    } catch (error) {
        console.error("Error getting todos: ", error);
    }
}

// 更新資料功能 UPDATE
export const updateTodo: updateTodoType = async (id, title, expireDate, isDone) => {
    const uid = auth.currentUser?.uid
    if (!uid) throw new Error("User not logged in");
    try {
        const updateRef = doc(db, "todo", id);
        await updateDoc(updateRef, {
            title,
            expireDate,
            isDone
        });
        console.log("更新資料成功")
    } catch (error) {
        console.error("Error updating todos: ", error);
    }
}

// 刪除資料功能 DELETE
export const deleteTodo: deleteTodoType = async (id) => {
    const uid = auth.currentUser?.uid
    if (!uid) throw new Error("User not logged in");
    try {
        const deleteRef = doc(db, "todo", id);
        await deleteDoc(deleteRef);
        console.log("刪除資料成功")
    } catch (error) {
        console.error("Error updating todos: ", error);
    }
}