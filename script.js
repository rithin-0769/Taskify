document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        taskInput: document.getElementById('taskInput'),
        dueDate: document.getElementById('dueDate'),
        prioritySelect: document.getElementById('prioritySelect'),
        addBtn: document.getElementById('addBtn'),
        taskList: document.getElementById('taskList'),
        themeToggle: document.getElementById('themeToggle'),
        filterSelect: document.getElementById('filterSelect'),
        taskCount: document.getElementById('taskCount'),
        completedCount: document.getElementById('completedCount')
    };

    // Initialize
    elements.dueDate.valueAsDate = new Date();
    updateTaskCounters();

    // Theme Toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Event Listeners
    elements.addBtn.addEventListener('click', addTask);
    elements.taskInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());
    elements.filterSelect.addEventListener('change', filterTasks);

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        elements.themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    function addTask() {
        const taskText = elements.taskInput.value.trim();
        if (!taskText) return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            dueDate: elements.dueDate.value,
            priority: elements.prioritySelect.value,
            createdAt: new Date().toISOString()
        };

        addTaskToDOM(task);
        saveTask(task);
        elements.taskInput.value = '';
        elements.taskInput.focus();
        updateTaskCounters();
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = `task priority-${task.priority}`;
        li.dataset.id = task.id;
        li.dataset.completed = task.completed;
        li.dataset.priority = task.priority;

        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const dueDateStr = dueDate ? dueDate.toLocaleDateString() : 'No date';
        const timeDiff = dueDate ? dueDate - new Date() : null;
        const isOverdue = timeDiff && timeDiff < 0 && !task.completed;

        li.innerHTML = `
            <div class="task-header">
                <span class="task-title">${task.text}</span>
                <div class="task-actions">
                    <button class="complete-btn" aria-label="Complete task">
                        <i class="fas fa-${task.completed ? 'check-circle' : 'check'}"></i>
                    </button>
                    <button class="delete-btn" aria-label="Delete task">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="task-info">
                <span class="${isOverdue ? 'overdue' : ''}">
                    <i class="far fa-calendar-alt"></i> ${dueDateStr}
                    ${isOverdue ? ' (Overdue)' : ''}
                </span>
                <span>
                    <i class="fas fa-flag" style="color: ${
                        task.priority === 'high' ? '#ff7675' : 
                        task.priority === 'medium' ? '#fdcb6e' : '#00b894'
                    }"></i> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
            </div>
        `;

        if (task.completed) li.classList.add('completed');
        if (isOverdue) li.classList.add('overdue-task');

        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            const isCompleted = li.classList.contains('completed');
            li.dataset.completed = isCompleted;
            li.querySelector('.complete-btn i').className = `fas fa-${isCompleted ? 'check-circle' : 'check'}`;
            
            if (isCompleted) {
                triggerConfetti();
                li.classList.remove('overdue-task');
            }
            
            updateTaskStatus(task.id, isCompleted);
            updateTaskCounters();
            filterTasks();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.classList.add('fade-out');
            setTimeout(() => {
                li.remove();
                removeTaskFromStorage(task.id);
                updateTaskCounters();
            }, 300);
        });

        taskList.appendChild(li);
        updateTaskCounters();
    }

    function updateTaskCounters() {
        const tasks = getTasksFromStorage();
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        
        elements.taskCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
        elements.completedCount.textContent = `${completed} completed`;
    }

    function filterTasks() {
        const filterValue = elements.filterSelect.value;
        document.querySelectorAll('#taskList li').forEach(li => {
            const isCompleted = li.dataset.completed === 'true';
            li.style.display = 
                filterValue === 'all' ? 'flex' :
                filterValue === 'active' ? (isCompleted ? 'none' : 'flex') :
                isCompleted ? 'flex' : 'none';
        });
    }

    function triggerConfetti() {
        confetti({
            particleCount: 80,
            spread: 55,
            origin: { y: 0.6 },
            colors: ['#5b6abf', '#7986cb', '#a5b1fc', '#d1d9ff'],
            scalar: 0.8
        });
    }

    // Storage Functions
    function getTasksFromStorage() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    function saveTask(task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskStatus(id, completed) {
        const tasks = getTasksFromStorage();
        const task = tasks.find(t => t.id == id);
        if (task) task.completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromStorage(id) {
        const tasks = getTasksFromStorage().filter(t => t.id != id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial Load
    getTasksFromStorage().forEach(addTaskToDOM);
    filterTasks();
});
