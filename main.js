let enterTaskFiled = document.querySelector('.enter-task input');
let addTaskBtn = document.querySelector('.enter-task button');
let tasksDiv = document.querySelector('.all-tasks');
let taskObj;

let tasksArray;
if (localStorage.Tasks != null) {
    tasksArray = JSON.parse(localStorage.getItem('Tasks'));
} else {
    tasksArray =[];
}
// localStorage.clear();

addTaskBtn.onclick = () => {
    if (enterTaskFiled.value != "") {
        taskObj = {
            taskSubject: enterTaskFiled.value,
            taskStatus: false,
        }
        tasksArray.push(taskObj);
        localStorage.setItem('Tasks', JSON.stringify(tasksArray));
        enterTaskFiled.value = "";
        tasksData();
    }
}

tasksData();
function tasksData() {
    let countTask = 0;
    let tasks = "";
    tasksArray.forEach((e) => {
        countTask++;
        if (e.taskStatus == false) {
            tasks += `
            <div class="task">
                <p>${e.taskSubject}</p>
                <button class="done-btn" data-task="${countTask - 1}">Done</button>
                <button class="del-btn" data-task="${countTask - 1}">Delete</button>
            </div>`
        } else {
            tasks += `
            <div class="task done">
                <p class="done">${e.taskSubject}</p>
                <button class="done-btn" data-task="${countTask - 1}">Done</button>
                <button class="del-btn" data-task="${countTask - 1}">Delete</button>
            </div>`
        }

    });
    tasksDiv.innerHTML = tasks;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('done-btn')) {
        tasksArray[+e.target.dataset.task].taskStatus = true;
    } else if (e.target.classList.contains('del-btn')) {
        tasksArray.splice(+e.target.dataset.task, 1);
        localStorage.setItem('Tasks', JSON.stringify(tasksArray));
    }
    tasksData();
})