let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = 'all') {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <strong>${task.title}</strong> (${task.priority}) <br>
      ${task.description || ''}<br>
      Due: ${task.dueDate ? new Date(task.dueDate).toLocaleString() : 'None'}<br>
      <button onclick="toggleComplete(${index})">✔</button>
      <button onclick="deleteTask(${index})">🗑</button>
    `;
    taskList.appendChild(li);
  });
}

document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  tasks.push({ title, description, dueDate, priority, completed: false });
  saveTasks();
  renderTasks();
  this.reset();
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

// Initial rendering
renderTasks();
