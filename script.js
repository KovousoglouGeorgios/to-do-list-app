// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskLists');

        // Create task element
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

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

        // Clear input field
        taskInput.value = '';
    }
}
