// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  let currentFilter = 'all';

  function update() {
    const items = todoList.querySelectorAll('li');
    let uncompleted = 0;

    items.forEach(li => {
      const done = li.classList.contains('completed');
      if (!done) uncompleted++;

      if (currentFilter === 'active' && done) {
        li.style.display = 'none';
      } else if (currentFilter === 'done' && !done) {
        li.style.display = 'none';
      } else {
        li.style.display = 'flex';
      }
    });

    counter.textContent = `${uncompleted} item(s) left`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();

    if (!text) {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    li.innerHTML = `<span class="item-text">${text}</span><button class="delete-btn">Delete</button>`;
    todoList.appendChild(li);

    input.value = '';
    update();
  });

  todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }
    update();
  });

  document.getElementById('filter-all').addEventListener('click', () => {
    currentFilter = 'all';
    update();
  });

  document.getElementById('filter-active').addEventListener('click', () => {
    currentFilter = 'active';
    update();
  });

  document.getElementById('filter-done').addEventListener('click', () => {
    currentFilter = 'done';
    update();
  });
});