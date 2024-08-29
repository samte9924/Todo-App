export let todos = JSON.parse(localStorage.getItem("todos")) || [];

export function loadTodos() {
  todos = JSON.parse(localStorage.getItem("todos", todos)) || [];
}

export function addTodo(todo) {
  todos.push(todo);
  saveToLocalStorage();
}

export function getTodo(todoId) {
  return todos.find((todo) => todo.id === todoId);
}

export function setTodo(newTodo) {
  const index = todos.findIndex((todo) => todo.id === newTodo.id);
  if (index !== -1) {
    todos[index] = newTodo;
    saveToLocalStorage();
  }
}

export function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);

  saveToLocalStorage();
}

export function selectAll() {
  todos.forEach((todo) => {
    todo.checked = true;
  });
  saveToLocalStorage();
}

export function unselectAll() {
  todos.forEach((todo) => {
    todo.checked = false;
  });
  saveToLocalStorage();
}

export function deleteChecked() {
  todos = todos.filter((todo) => !todo.checked);
  saveToLocalStorage();
}

export function orderByDate() {
  todos.sort((todoA, todoB) => new Date(todoA.date) - new Date(todoB.date));
  saveToLocalStorage();
}

export function orderByName() {
  todos.sort((todoA, todoB) => todoA.name.localeCompare(todoB.name));
  saveToLocalStorage();
}

export function orderByPriority() {
  todos.sort((todoA, todoB) => new Date(todoA.date) - new Date(todoB.date));
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
