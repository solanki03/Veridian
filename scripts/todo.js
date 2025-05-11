// get the tasks from localStorage
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("todoTasks")) || [];
}

// save the tasks in localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

const openBtn = document.getElementById("todoBtn");
const todoPanel = document.getElementById("todoPanel");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// toggle the visibility
openBtn.addEventListener("click", () => {
    todoPanel.classList.toggle("hidden");
});

// add the tasks to the DOM
function addTaskToDOM(taskText, isCompleted = false, save = true) {
    const list = document.createElement("li");

    list.innerHTML = `
        <label class="todo-item">
            <input type="checkbox" class="todo-radio" ${isCompleted ? 'checked' : ''}/>
            <span class="todo-text ${isCompleted ? 'completed' : ''}">${taskText}</span>
        </label>
        <span class="delete-task" title="Delete Task">
            <i class="ri-close-fill"></i>
        </span>
    `;

    const checkbox = list.querySelector(".todo-radio");
    const taskName = list.querySelector(".todo-text");
    const deleteBtn = list.querySelector(".delete-task");

    checkbox.addEventListener("change", () => {
        taskName.classList.toggle("completed", checkbox.checked);
        updateTaskInStorage(taskText, checkbox.checked);
    });

    deleteBtn.addEventListener("click", () => {
        list.remove();
        deleteTaskFromStorage(taskText);
    });

    document.getElementById("todoList").appendChild(list);

    if (save) {
        const tasks = getTasksFromStorage();
        tasks.push({ text: taskText, completed: isCompleted });
        saveTasksToStorage(tasks);
    }
}

// add new tasks to the task list
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = todoInput.value.trim();
    if (task) {
        addTaskToDOM(task);
        todoInput.value = "";
    }
});

// update the tasks to the localStorage
function updateTaskInStorage(taskText, isCompleted) {
    const tasks = getTasksFromStorage();
    const updated = tasks.map(task =>
        task.text === taskText ? { ...task, completed: isCompleted } : task
    );
    saveTasksToStorage(updated);
}

// delete the tasks from the localStorage
function deleteTaskFromStorage(taskText) {
    const tasks = getTasksFromStorage();
    const updated = tasks.filter(task => task.text !== taskText);
    saveTasksToStorage(updated);
}

// load tasks on the page
window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = getTasksFromStorage();
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed, false));
});
