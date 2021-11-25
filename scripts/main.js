'use strict';

// Selectors
const createTodo = document.getElementById('create-todo');
const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelectorAll('.todo-item');
const todoText = document.querySelectorAll('.todo-text');
const removeButton = document.querySelectorAll('.remove-todo');
const counter = document.querySelector('.items-left');
const clearDone = document.querySelector('.clear-completed');

const showAll = document.getElementById('all');
const showActive = document.getElementById('active');
const showCompleted = document.getElementById('completed');

// Lists Arrays
let todos = [];
let active = [];
let completed = [];

// Functions
const addTodo = function (todo) {
  const li = document.createElement('li');

  li.innerHTML = `
    <label class="task"><input type="checkbox" name="checkButton" class="todo-li" /><span class="checkmark"></span></label><p class="todo-text">${todo}</p><img class="remove-todo" src="./images/icon-cross.svg" alt="delete todo" />
    `;

  li.classList.add('item');
  li.classList.add('todo-item');

  if (showCompleted.checked) {
    li.style.display = 'none';
  }

  todos.push(li);
  active.push(li);
  todoList.appendChild(li);
};

const updateCounter = () => {
  const count = todoList.childElementCount;
  counter.innerHTML = count;
};

const renderCompleted = () => {
  todos.map(todo => {
    todo.classList.contains('checked-item')
      ? (todo.style.display = 'flex')
      : (todo.style.display = 'none');
  });
};

const renderActive = () => {
  active.map(todo => (todo.style.display = 'flex'));
  completed.map(todo => (todo.style.display = 'none'));
};

const renderAll = () => todos.map(todo => (todo.style.display = 'flex'));

//Event Handlers
createTodo.addEventListener('keydown', e => {
  if (!createTodo.value) return;

  if (e.key === 'Enter') {
    addTodo(createTodo.value);
    updateCounter();
    createTodo.value = '';
  }
});

todoList.addEventListener('click', e => {
  if (e.target.name === 'checkButton') {
    e.target.parentElement.nextElementSibling.classList.toggle('checked-text');
    e.target.parentElement.parentElement.classList.toggle('checked-item');
    if (
      e.target.parentElement.parentElement.classList.contains('checked-item')
    ) {
      completed.push(e.target.parentElement.parentElement);
    }
  }

  if (e.target.classList[0] === 'remove-todo') {
    e.target.parentElement.remove();
    updateCounter();
  }
});

clearDone.addEventListener('click', () => {
  todos.map(todo =>
    todo.classList.contains('checked-item') && completed.includes(todo)
      ? todo.remove()
      : ''
  );

  todos = todos.filter(el => !completed.includes(el));
  completed = [];
  updateCounter();
});

showCompleted.addEventListener('click', renderCompleted);
showActive.addEventListener('click', renderActive);
showAll.addEventListener('click', renderAll);
