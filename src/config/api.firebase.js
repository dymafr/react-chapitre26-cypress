import * as axios from "axios";

const apiFirebase = axios.create({
  baseURL: "https://todo-r-c17.firebaseio.com/"
});

export function saveTodos(todos) {
  return apiFirebase.put("todos.json", todos);
}

export default apiFirebase;
