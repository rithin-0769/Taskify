# 🚀 Taskify - Elegant Task Management

![Taskify Demo](https://i.imgur.com/JQh9G2T.png)  
*A beautiful to-do app with priorities, due dates, and productivity analytics*

## ✨ Features

- **Beautiful UI** with glassmorphism design & smooth animations
- **Priority System** (Color-coded: High/Medium/Low)
- **Due Dates** with overdue indicators 📅
- **Dark/Light Mode** (Automatically syncs with OS)
- **Confetti Celebrations** when completing tasks 🎉
- **Persistent Storage** (Tasks survive page refreshes)
- **Filtering** (All/Active/Completed tasks)
- **Task Statistics** (Completion analytics)

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Font Awesome](https://img.shields.io/badge/-Font_Awesome-528DD7?logo=fontawesome&logoColor=white)

## 🎨 Design Highlights

```css
/* Frosted glass effect */
.app-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

## 🚀 Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/taskify.git
   cd taskify
   ```

2. **Run locally**
   - Open `index.html` in browser, **or**
   - Use Live Server in VS Code

3. **Deploy**
   - Drag & drop to Netlify/Vercel, **or**
   - Enable GitHub Pages in repo settings

## 📸 UI Showcase

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light](https://i.imgur.com/abc123.jpg) | ![Dark](https://i.imgur.com/xyz456.jpg) |

## 🌟 Advanced Features

```javascript
// Confetti trigger on task completion
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#5b6abf', '#7986cb']
  });
}
```

## 📂 Project Structure

```
taskify/
├── index.html          # Main app interface
├── styles.css          # Glassmorphism styling
├── script.js           # Core functionality
├── assets/             # Icons & images
└── README.md           # You're here!
```
