// Variables

var createTodo = document.getElementById("create-todo");

var todoList = document.querySelector(".todo-list");

var todoItem = document.querySelectorAll(".todo-item");

var checkButton = document.querySelectorAll(".todo-li");

var todoText = document.querySelectorAll(".todo-text");

//Event Handlers
createTodo.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && createTodo.value != "") {
    addTodo(createTodo.value);
    createTodo.value = "";
  }
});

// Functions

function addTodo(todo) {
  let li = document.createElement("li");

  li.innerHTML = `
    <label class="task"><input type="checkbox" name="checkButton" class="todo-li" /><span class="checkmark"></span></label><p class="todo-text">${todo}</p><img src="/images/icon-cross.svg" alt="delete todo" />
    `;
  li.classList.add("todo-item");
  li.classList.add("item");
  todoList.appendChild(li);
}

todoList.addEventListener("click", (e) => {
  if (e.target.name === "checkButton") {
    e.target.parentElement.nextElementSibling.classList.toggle("checked-text");
  }
});
