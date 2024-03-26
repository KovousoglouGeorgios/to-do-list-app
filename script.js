// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get task text and remove leading/trailing whitespace
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add a delete button to each task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.onclick = function () {
            li.remove();
        };

        // Append the delete button to the task
        li.appendChild(deleteButton);

        // Append the task to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}
