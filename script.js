// Global variable to store tasks categorized by their respective categories
let tasksByCategory = {
    general: [],
    work: [],
    personal: []
    // Add more categories as needed
};

// Function to save tasks to Local Storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasksByCategory', JSON.stringify(tasksByCategory));
}

// Function to load tasks from Local Storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasksByCategory');
    if (storedTasks) {
        tasksByCategory = JSON.parse(storedTasks);
    }
}

// Function to delete a task
function deleteTask(task, category) {
    const index = tasksByCategory[category].indexOf(task);
    if (index !== -1) {
        tasksByCategory[category].splice(index, 1); // Remove task from array
        saveTasksToLocalStorage(); // Save updated tasks to Local Storage
        displayTasks(tasksByCategory[category], category); // Update displayed tasks
    }
}

// Function to display tasks for the selected category
function displayTasks(tasks, category) {
    const taskListContainer = document.getElementById('taskLists');
    taskListContainer.innerHTML = ''; // Clear existing tasks

    // Create table element
    const table = document.createElement('table');
    table.classList.add('task-table');

    // Create table header row
    const headerRow = document.createElement('tr');
    const headers = ['Task', 'Due Date', 'Reminder', 'Actions']; // Added 'Actions' header
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Add tasks to table rows
    tasks.forEach((task, index) => { // Added index parameter
        const row = document.createElement('tr');

        // Task text
        const taskCell = document.createElement('td');
        taskCell.textContent = task.text;
        row.appendChild(taskCell);

        // Due date
        const dueDateCell = document.createElement('td');
        dueDateCell.textContent = task.dueDate;
        row.appendChild(dueDateCell);

        // Reminder date
        const reminderCell = document.createElement('td');
        reminderCell.textContent = task.reminderDate;
        row.appendChild(reminderCell);

        // Check task status
        const currentTime = new Date().getTime();
        const dueDateTime = new Date(task.dueDate).getTime();
        const reminderTime = new Date(task.reminderDate).getTime();

        if (dueDateTime <= currentTime) {
            row.classList.add('expired');
        } else if (dueDateTime - currentTime < 7 * 24 * 60 * 60 * 1000) { // Less than 7 days from current date
            row.classList.add('near-deadline');
        } else {
            row.classList.add('active');
        }

        // Actions (checkbox and delete button)
        const actionsCell = document.createElement('td');
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        actionsCell.appendChild(checkbox);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteTask(task, category); // Pass task and category
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        // Add row to the table
        table.appendChild(row);
    });

    // Append the table to the container
    taskListContainer.appendChild(table);
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dueDateInput = document.getElementById('dueDate');
    const dueDate = dueDateInput.value;
    const reminderDateInput = document.getElementById('reminderDate');
    const reminderDate = reminderDateInput.value;
    const categorySelect = document.getElementById('categorySelect');
    const category = categorySelect.value;

     if (taskText !== '') {
        const task = {
            text: taskText,
            dueDate: dueDate,
            reminderDate: reminderDate
        };

        // Add the task to the selected category
        tasksByCategory[category].push(task);

        // Save updated tasks to Local Storage
        saveTasksToLocalStorage();

        // Update the displayed tasks
        displayTasks(tasksByCategory[category], category);

        // Clear input fields
        taskInput.value = '';
        dueDateInput.value = '';
        reminderDateInput.value = '';
    }
}

// Function to sort tasks based on the selected sorting option
function sortTasks(option, category) {
    switch (option) {
        case 'dueDate':
            tasksByCategory[category].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
        default:
            // No sorting needed
            break;
    }
    // Display sorted tasks
    displayTasks(tasksByCategory[category], category);
}

// Event listener for sort select change
document.getElementById('sortSelect').addEventListener('change', function() {
    const categorySelect = document.getElementById('categorySelect');
    const category = categorySelect.value;
    const sortOption = this.value;
    sortTasks(sortOption, category);
});

// Add an event listener to the task input field to detect 'Enter' key press
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    // Check if the 'Enter' key is pressed
    if (event.key === 'Enter') {
        addTask(); // Call addTask() function to add the task
    }
});

// Event listener for category select change
document.getElementById('categorySelect').addEventListener('change', function() {
    const category = this.value;
    displayTasks(tasksByCategory[category], category);
});

// Load tasks from Local Storage when the page is loaded
window.addEventListener('load', function() {
    loadTasksFromLocalStorage();
    const categorySelect = document.getElementById('categorySelect');
    const category = categorySelect.value;
    displayTasks(tasksByCategory[category], category);
});
