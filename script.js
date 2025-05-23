:root {
    --primary-color: #6c5ce7;
    --bg-color: #ffffff;
    --text-color: #333333;
    --task-bg: #f9f9f9;
    --border-color: #dddddd;
}

.dark-mode {
    --primary-color: #a29bfe;
    --bg-color: #222222;
    --text-color: #f1f1f1;
    --task-bg: #333333;
    --border-color: #444444;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background 0.3s, color 0.3s;
}

body {
    background: var(--bg-color);
    color: var(--text-color);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 600px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.controls {
    display: flex;
    gap: 10px;
}

#themeToggle {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 1.2rem;
    cursor: pointer;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

#taskInput {
    flex: 1;
    min-width: 200px;
    padding: 10px;
    border: 2px solid var(--border-color);
    border-radius: 5px;
    background: var(--bg-color);
    color: var(--text-color);
}

#dueDate, #prioritySelect, #filterSelect {
    padding: 10px;
    border: 2px solid var(--border-color);
    border-radius: 5px;
    background: var(--bg-color);
    color: var(--text-color);
}

#addBtn {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
}

#taskList {
    list-style: none;
}

.task {
    background: var(--task-bg);
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
}

.task-header {
    display: flex;
    justify-content: space-between;
}

.task-title {
    flex: 1;
}

.task.priority-low {
    border-left: 4px solid #00b894;
}

.task.priority-medium {
    border-left: 4px solid #fdcb6e;
}

.task.priority-high {
    border-left: 4px solid #ff7675;
}

.task-info {
    display: flex;
    gap: 15px;
    font-size: 0.9rem;
    color: #777;
}

.dark-mode .task-info {
    color: #aaa;
}

.task-actions {
    display: flex;
    gap: 10px;
}

.task-actions button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.complete-btn {
    color: #00b894;
}

.delete-btn {
    color: #ff7675;
}

.task.completed {
    opacity: 0.7;
}

.task.completed .task-title {
    text-decoration: line-through;
}

#confetti {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
}
