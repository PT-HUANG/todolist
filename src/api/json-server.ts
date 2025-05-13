import axios from 'axios'

const baseURL = "http://localhost:5000/todos"

export const fetchTodos = async () => {
  try {
    const { data } = await axios.get(baseURL)
    return data
  } catch (error) {
    console.error("[Get Todos failed]", error)
  }
}

export const createTodo = async (payload: {
  id: string;
  title: string;
  expireDate: string;
  isDone: boolean;
}) => {
  try {
    const res = await axios.post(baseURL, payload)
    return res
  } catch (error) {
    console.error("[Add Todo failed]", error)
  }
}

export const updateTodo = async (payload: {
  id: string;
  title: string;
  expireDate: string;
  isDone: boolean;
}) => {
  try {
    const res = await axios.put(`${baseURL}/${String(payload.id)}`, payload);
    console.log("更新成功")
    return res
  } catch (error) {
    console.error("[Add Todo failed]", error)
  }
}

export const deleteTodo = async (id: string) => {
  try {
    const res = await axios.delete(`${baseURL}/${id}`);
    console.log("刪除成功")
    return res
  } catch (error) {
    console.error("[Delete Todo failed]", error)
  }
}