"use strict";

// Selectors

const createTodo = document.getElementById("create-todo");

const todoList = document.querySelector(".todo-list");

const todoItem = document.querySelectorAll(".todo-item");

const todoText = document.querySelectorAll(".todo-text");

const removeButton = document.querySelectorAll(".remove-todo");

const counter = document.querySelector(".items-left");

const clearDone = document.querySelector(".clear-completed");

let todos = [];
let completed = [];
let active = [];

updateCounter();

//Event Handlers
createTodo.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && createTodo.value != "") {
    addTodo(createTodo.value);
    createTodo.value = "";
    updateCounter();
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target.name === "checkButton") {
    e.target.parentElement.nextElementSibling.classList.toggle("checked-text");
    e.target.parentElement.parentElement.classList.toggle("checked-item");
    if (
      e.target.parentElement.parentElement.classList.contains("checked-item")
    ) {
      completed.push(e.target.parentElement.parentElement);
    }
  }

  if (e.target.classList[0] === "remove-todo") {
    e.target.parentElement.remove();
    updateCounter();
  }
});

clearDone.addEventListener("click", () => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].classList.contains("checked-item")) {
      if (completed.includes(todos[i])) {
        todos[i].remove();
      }
    }
  }
  todos = todos.filter((el) => {
    return !completed.includes(el);
  });
  completed = [];
  updateCounter();
});

// Functions

function addTodo(todo) {
  let li = document.createElement("li");

  li.innerHTML = `
    <label class="task"><input type="checkbox" name="checkButton" class="todo-li" /><span class="checkmark"></span></label><p class="todo-text">${todo}</p><img class="remove-todo" src="./images/icon-cross.svg" alt="delete todo" />
    `;
  li.classList.add("item");
  li.classList.add("todo-item");
  todos.push(li);
  todoList.appendChild(li);
}

function updateCounter() {
  const count = todoList.childElementCount;

  counter.innerHTML = count;
}
