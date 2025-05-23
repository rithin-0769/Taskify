document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const prioritySelect = document.getElementById('prioritySelect');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const themeToggle = document.getElementById('themeToggle');
    const filterSelect = document.getElementById('filterSelect');

    // Set default due date to today
    dueDate.valueAsDate = new Date();

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Load saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Load tasks
    loadTasks();

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    filterSelect.addEventListener('change', filterTasks);

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            dueDate: dueDate.value,
            priority: prioritySelect.value
        };

        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = '';
        taskInput.focus();
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = `task priority-${task.priority}`;
        li.setAttribute('data-id', task.id);
        li.setAttribute('data-completed', task.completed);

        const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date';

        li.innerHTML = `
            <div class="task-header">
                <span class="task-title">${task.text}</span>
                <div class="task-actions">
                    <button class="complete-btn"><i class="fas fa-check"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="task-info">
                <span>Due: ${dueDateFormatted}</span>
                <span>Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            </div>
        `;

        if (task.completed) {
            li.classList.add('completed');
        }

        li.querySelector('.complete-btn').addEventListener('click', toggleComplete);
        li.querySelector('.delete-btn').addEventListener('click', deleteTask);

        taskList.appendChild(li);
    }

    function toggleComplete(e) {
        const li = e.target.closest('li');
        li.classList.toggle('completed');
        const isCompleted = li.classList.contains('completed');
        li.setAttribute('data-completed', isCompleted);
        
        // Trigger confetti if task was just completed
        if (isCompleted) {
            triggerConfetti();
        }

        updateTaskStatus(li.getAttribute('data-id'), isCompleted);
        filterTasks(); // Reapply filters after status change
    }

    function deleteTask(e) {
        const li = e.target.closest('li');
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
            removeTaskFromStorage(li.getAttribute('data-id'));
        }, 300);
    }

    function filterTasks() {
        const filterValue = filterSelect.value;
        const tasks = document.querySelectorAll('#taskList li');

        tasks.forEach(task => {
            const isCompleted = task.getAttribute('data-completed') === 'true';
            
            switch(filterValue) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'active':
                    task.style.display = isCompleted ? 'none' : 'flex';
                    break;
                case 'completed':
                    task.style.display = isCompleted ? 'flex' : 'none';
                    break;
            }
        });
    }

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
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
        filterTasks();
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
