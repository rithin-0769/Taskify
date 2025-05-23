document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add task
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = '';
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = 'task';
        li.setAttribute('data-id', task.id);

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn"><i class="fas fa-check"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;

        li.querySelector('.complete-btn').addEventListener('click', toggleComplete);
        li.querySelector('.delete-btn').addEventListener('click', deleteTask);

        taskList.appendChild(li);
    }

    function toggleComplete(e) {
        const li = e.target.closest('li');
        li.classList.toggle('completed');
        updateTaskStatus(li.getAttribute('data-id'), li.classList.contains('completed'));
    }

    function deleteTask(e) {
        const li = e.target.closest('li');
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            removeTaskFromStorage(li.getAttribute('data-id'));
        }, 300);
    }

    // LocalStorage Functions
    function saveTask(task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromStorage() {
        return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    }

    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => addTaskToDOM(task));
    }

    function updateTaskStatus(id, completed) {
        const tasks = getTasksFromStorage();
        const task = tasks.find(task => task.id == id);
        if (task) task.completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromStorage(id) {
        let tasks = getTasksFromStorage();
        tasks = tasks.filter(task => task.id != id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
