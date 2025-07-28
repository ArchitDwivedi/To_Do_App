let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let cnt = 0; // Add this at the top

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task_list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        // Create delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.style.marginLeft = '15px';
        delBtn.className = 'delete_btn';

        // Delete task on click
        delBtn.addEventListener('click', function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

document.getElementById('add_btn').addEventListener('click', function () {
    const input = document.querySelector('#add_task input[type="text"]');
    const value = input.value.trim();
    if (value) {
        tasks.push(value);
        // Do NOT sort here
        renderTasks();
        saveTasks();
        input.value = '';
    }
});

document.getElementById('view_btn').addEventListener('click', function () {
    document.getElementById('task_list_container').style.display = 'block';
    renderTasks();
});
document.getElementById('view_btn').addEventListener('click', function () {
    cnt++;
    const container = document.getElementById('task_list_container');
    if (cnt % 2 === 1) {
        container.style.display = 'block';
        renderTasks();
    } else {
        container.style.display = 'none';
    }
});