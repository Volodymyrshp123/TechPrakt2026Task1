import './style.css'

// Ініціалізація трекера завдань
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Завдання зберігаються в локальному сховищі
const STORAGE_KEY = 'tasks';

// Завантажити завдання з локального сховища
function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  return savedTasks ? JSON.parse(savedTasks) : [];
}

// Зберегти завдання в локальне сховище
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Відобразити усі завдання
function renderTasks() {
  let tasks = loadTasks();
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.index = index;
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(index);
    });
    
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    
    // При кліку на завдання - позначити як виконане/невиконане
    li.addEventListener('click', () => {
      toggleTaskCompletion(index);
    });
    
    taskList.appendChild(li);
  });
}

// Додати нове завдання
function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText === '') {
    alert('Будь ласка, введіть завдання!');
    return;
  }
  
  let tasks = loadTasks();
  tasks.push({
    text: taskText,
    completed: false
  });
  
  saveTasks(tasks);
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

// Позначити завдання як виконане/невиконане
function toggleTaskCompletion(index) {
  let tasks = loadTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

// Видалити завдання
function deleteTask(index) {
  let tasks = loadTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

// Обробники подій
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Завантажити завдання при завантаженні сторінки
renderTasks();
