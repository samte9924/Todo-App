import {
  todos,
  addTodo,
  loadTodos,
  getTodo,
  setTodo,
  deleteTodo,
} from "./data/todo.js";
import { v4 as uuidv4 } from "https://esm.sh/uuid";

loadTodos();
renderHomePage();
document.querySelector(".add-todo-button").addEventListener("click", () => {
  const nameInput = document.querySelector(".todo-name-input");
  const dateInput = document.querySelector(".todo-date-input");
  const priorityInput = document.querySelector(".todo-priority-input");

  let today;

  if (!nameInput.value) {
    alert("Inserire il nome dell'attività.");
    return;
  }
  if (!dateInput.value) {
    today = new Date().toISOString().slice(0, 10);
  }
  if (priorityInput.value === "0") {
    alert("Inserire una priorità.");
    return;
  }

  const uuid = uuidv4();

  const todo = {
    id: uuid,
    name: nameInput.value,
    date: dateInput.value || today,
    priority: priorityInput.value,
    checked: false,
  };
  addTodo(todo);

  nameInput.value = "";
  dateInput.value = "";
  priorityInput.value = "0";
  renderHomePage();
});

function renderHomePage() {
  let todosHtml = "";

  todos.forEach((todo) => {
    todosHtml += `
    <div class="todo-task-container priority-${todo.priority}">
      <div class="todo-task">
        <input type="checkbox" name="completed" class="todo-checkbox" 
        ${todo.checked ? "checked" : ""}
        data-todo-id="${todo.id}" />
        <div class="todo-info">
          <div class="todo-text js-text-${todo.id} 
            ${todo.checked ? "done" : ""}">${todo.name}
          </div>
          <div class="todo-date">
            ${todo.date}
          </div>
        </div>
      </div>
      <div class="todo-actions">
        <button class="edit-todo-button" data-todo-id="${todo.id}">
          <img
            src="/assets/pencil_white.png"
            alt="Add"
            class="edit-todo-image"
          />
        </button>
        <button class="delete-todo-button" data-todo-id="${todo.id}">
          <img
            src="/assets/trash_white.png"
            alt="Add"
            class="delete-todo-image"
          />
        </button>
      </div>
    </div>
    `;
  });
  document.querySelector(".todo-list-container").innerHTML = todosHtml;

  document.querySelectorAll(".todo-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const todoId = checkbox.dataset.todoId;
      const todoText = document.querySelector(`.js-text-${todoId}`);

      const todo = getTodo(todoId);
      todo.checked = !todo.checked;
      setTodo(todo);

      renderHomePage();
    });
  });

  document.querySelectorAll(".delete-todo-button").forEach((button) => {
    button.addEventListener("click", () => {
      const todoId = button.dataset.todoId;

      deleteTodo(todoId);

      renderHomePage();
    });
  });
}
