const form = document.querySelector(`#form`),
    inputNode = document.querySelector(`#taskInput`),
    tasksList = document.querySelector(`#tasksList`),
    emptyList = document.querySelector(`#emptyList`);


let tasks = [];

if (localStorage.getItem(`tasks`)) {
    tasks = JSON.parse(localStorage.getItem(`tasks`));
}

tasks.forEach(task => {
    renderTask(task);
});

checkEmptyList();


form.addEventListener(`submit`, addTask);

tasksList.addEventListener(`click`, deleteTask);

tasksList.addEventListener(`click`, doneTask);

function addTask(event) {
    event.preventDefault();

    const valueInput = inputNode.value;
    // console.log(valueInput)

    const newTask = {
        id: Date.now(),
        text: valueInput,
        done: false
    }

    tasks.push(newTask)

    console.log(tasks)

    renderTask(newTask);

    inputNode.value = ``;
    inputNode.focus();

    checkEmptyList()

    saveToLocalStorage()
};

function deleteTask(event) {
    if (event.target.dataset.action !== `delete`) return;

    const parenNode = event.target.closest(`.list-group-item`);

    const id = parenNode.id;


    // const index = tasks.findIndex(function (task) {
    //     return task.id === +id
    // })

    // tasks.splice(index, 1);

    tasks = tasks.filter(function (task) {
        return task.id !== +id;
    })
    console.log(tasks)

    parenNode.remove()

    checkEmptyList()

    saveToLocalStorage()
}

function doneTask(event) {
    if (event.target.dataset.action == `done`) {
        const parenNode = event.target.closest(`.list-group-item`);
        const doneNode = parenNode.querySelector(`span`);
        doneNode.classList.toggle(`task-title--done`);

        const id = parenNode.id;

        const task = tasks.find(function (task) {
            if (task.id === +id) {
                return true;
            }
        })
        task.done = !task.done

        saveToLocalStorage()
    }
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListElement = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>`;
        tasksList.insertAdjacentHTML(`afterbegin`, emptyListElement);

    } else if (tasks.length > 0) {
        const emptyListEl = document.querySelector(`#emptyList`);
        emptyListEl ? emptyListEl.remove() : null; 
    }
}

function saveToLocalStorage() {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskItem = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`;
    // console.log(tasksListNode)
    tasksList.insertAdjacentHTML('beforeend', taskItem)
}