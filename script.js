document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('newTaskInput');
    const taskDateTimeInput = document.getElementById('taskDateTime');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const recordList = document.getElementById('recordList');
    const taskSection = document.getElementById('taskSection');
    const recordSection = document.getElementById('recordSection');
    const showTasksButton = document.getElementById('showTasks');
    const showRecordsButton = document.getElementById('showRecords');

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function saveRecords(records) {
        localStorage.setItem('records', JSON.stringify(records));
    }

    function getRecords() {
        const records = localStorage.getItem('records');
        return records ? JSON.parse(records) : [];
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = `${task.text} (Due: ${task.dateTime})`;
            li.addEventListener('click', () => {
                removeTask(index);
            });
            taskList.appendChild(li);
        });
    }

    function renderRecords() {
        recordList.innerHTML = '';
        const records = getRecords();
        records.forEach(record => {
            const li = document.createElement('li');
            li.textContent = record;
            recordList.appendChild(li);
        });
    }

    function addTask() {
        const task = taskInput.value;
        const dateTime = taskDateTimeInput.value;
        if (task && dateTime) {
            const tasks = getTasks();
            tasks.push({ text: task, dateTime: dateTime });
            saveTasks(tasks);
            renderTasks();
            taskInput.value = '';
            taskDateTimeInput.value = '';
        }
    }

    function removeTask(index) {
        const tasks = getTasks();
        const removedTask = tasks.splice(index, 1);
        saveTasks(tasks);

        const records = getRecords();
        records.push(removedTask[0].text);
        saveRecords(records);
        renderTasks();
        renderRecords();
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    showTasksButton.addEventListener('click', () => {
        taskSection.style.display = 'block';
        recordSection.style.display = 'none';
    });

    showRecordsButton.addEventListener('click', () => {
        taskSection.style.display = 'none';
        recordSection.style.display = 'block';
    });

    renderTasks();
    renderRecords();
});
