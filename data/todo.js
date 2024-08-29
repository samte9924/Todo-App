export let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

export function loadTodos() {
  todos = JSON.parse(localStorage.getItem("todos", todos)) || [];
}

export function addTodo(todo) {
  todos.push(todo);
  saveToLocalStorage();
}

export function getTodo(todoId) {
  let matchingTodo;
  todos.forEach((todo) => {
    if (todo.id === todoId) {
      matchingTodo = todo;
    }
  });
  return matchingTodo;
}

export function setTodo(newTodo) {
  todos.forEach((todo) => {
    if (todo.id === newTodo.id) {
      return newTodo;
    }
  });
  saveToLocalStorage();
}

export function deleteTodo(todoId) {}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
