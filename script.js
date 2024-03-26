// Object to store tasks by category
const tasksByCategory = {};

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const categorySelect = document.getElementById('categorySelect');
    const category = categorySelect.value;

    if (taskText !== '') {
        const taskList = document.getElementById('taskLists');

        // Create task element
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.dataset.category = category;

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskElement.appendChild(checkbox);

        // Create task text
        const taskTextElement = document.createElement('div');
        taskTextElement.classList.add('task-text');
        taskTextElement.textContent = taskText;
        taskElement.appendChild(taskTextElement);

        // Create delete button
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('task-delete');
        deleteButton.textContent = '❌';
        deleteButton.onclick = function () {
            taskElement.remove();
        };
        taskElement.appendChild(deleteButton);

        // Append task element to task list
        taskList.appendChild(taskElement);

        // Store task in tasksByCategory object
        if (!tasksByCategory[category]) {
            tasksByCategory[category] = [];
        }
        tasksByCategory[category].push(taskText);

        // Clear input field
        taskInput.value = '';
    }
}

// Function to switch between categories
function switchCategory(category) {
    const taskList = document.getElementById('taskLists');
    taskList.innerHTML = ''; // Clear existing tasks

    if (tasksByCategory[category]) {
        tasksByCategory[category].forEach(taskText => {
            // Create task element
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.dataset.category = category;

            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            taskElement.appendChild(checkbox);

            // Create task text
            const taskTextElement = document.createElement('div');
            taskTextElement.classList.add('task-text');
            taskTextElement.textContent = taskText;
            taskElement.appendChild(taskTextElement);

            // Create delete button
            const deleteButton = document.createElement('span');
            deleteButton.classList.add('task-delete');
            deleteButton.textContent = '❌';
            deleteButton.onclick = function () {
                taskElement.remove();
            };
            taskElement.appendChild(deleteButton);

            // Append task element to task list
            taskList.appendChild(taskElement);
        });
    }
}

// Initialize with default category
switchCategory('general');

// Event listener for category select change
document.getElementById('categorySelect').addEventListener('change', function() {
    switchCategory(this.value);
});
