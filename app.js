const input = document.getElementById('input');
const addBtn = document.getElementById('Addbtn');
const taskList = document.getElementById('task-list');
const pendingBtn = document.getElementById('pendding-task');
const allBtn = document.getElementById('all-task');
const completeBtn = document.getElementById('complete-task');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.add(task.completed ? 'completed' : 'pending');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      tasks = tasks.filter(t => t !== task);
      renderTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
  
}
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    input.value = '';
    renderTasks();
   
  }
});

pendingBtn.addEventListener('click', () => renderTasks('pending'));
allBtn.addEventListener('click', () => renderTasks('all'));
completeBtn.addEventListener('click', () => renderTasks('completed'));
