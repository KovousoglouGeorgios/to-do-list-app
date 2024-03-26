// Function to sort tasks by date added
function sortByDateAdded(category) {
    if (tasksByCategory[category]) {
        tasksByCategory[category].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    }
}

// Function to sort tasks by date due
function sortByDateDue(category) {
    if (tasksByCategory[category]) {
        tasksByCategory[category].sort((a, b) => {
            if (!a.dateDue && !b.dateDue) return 0;
            if (!a.dateDue) return 1;
            if (!b.dateDue) return -1;
            return new Date(a.dateDue) - new Date(b.dateDue);
        });
    }
}

// Function to sort tasks by completion status
function sortByCompletionStatus(category) {
    if (tasksByCategory[category]) {
        tasksByCategory[category].sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;
            return 0;
        });
    }
}

// Function to switch between sorting options
function switchSortOption(option, category) {
    const taskList = document.getElementById('taskLists');
    taskList.innerHTML = ''; // Clear existing tasks

    switch (option) {
        case 'dateAdded':
            sortByDateAdded(category);
            break;
        case 'dateDue':
            sortByDateDue(category);
            break;
        case 'completionStatus':
            sortByCompletionStatus(category);
            break;
        default:
            return;
    }

    // Display sorted tasks
    switchCategory(category);
}

// Event listener for sort select change
document.getElementById('sortSelect').addEventListener('change', function() {
    const categorySelect = document.getElementById('categorySelect');
    const category = categorySelect.value;
    switchSortOption(this.value, category);
});

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const categorySelect = document.getElementById('categorySelect');
    const category = categorySelect.value;
    const addedDate = document.getElementById('addedDate').value;
    const dueDate = document.getElementById('dueDate').value;
    const completionStatus = document.getElementById('completionStatus').value;

    if (taskText !== '') {
        const taskList = document.getElementById('taskLists');

        // Create task object
        const task = {
            text: taskText,
            addedDate: new Date(addedDate), // Parse date string into Date object
            dueDate: new Date(dueDate), // Parse date string into Date object
            completed: completionStatus === 'complete'
        };

        // Store task in tasksByCategory object
        if (!tasksByCategory[category]) {
            tasksByCategory[category] = [];
        }
        tasksByCategory[category].push(task);

        // Sort tasks after adding
        switchSortOption(document.getElementById('sortSelect').value, category);

        // Update Local Storage
        updateLocalStorage();

        // Clear input fields
        taskInput.value = '';
        document.getElementById('addedDate').value = '';
        document.getElementById('dueDate').value = '';
        document.getElementById('completionStatus').value = 'incomplete';
    }
}
