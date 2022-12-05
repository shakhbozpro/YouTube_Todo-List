// Selectros
const $todoform = document.querySelector(".todo-form");
const $todoInput = document.querySelector(".todo-input");
const $todoBtn = document.querySelector(".todo-button");
const $todoList = document.querySelector(".todo-list");
const $filterOption = document.querySelector(".filter-todo");

// Event Listenrs
document.addEventListener("DOMContentLoaded", getTodos);
$todoform.addEventListener("submit", addTodo);
$todoList.addEventListener("click", deleteCheck);
$filterOption, addEventListener("click", filterTodo);

// Functions
function addTodo(evt) {
    // evt.preventDefault();
    // Get input value
    const todoInputValue = $todoInput.value.trim()

    // Todo LI
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo");

    // Todo P
    const todoText = document.createElement("p");
    todoText.innerText = todoInputValue;
    todoText.classList.add("todo-text");
    todoItem.appendChild(todoText);

    // SAVE TODO TO LOCALSTORAGE
    saveLocalTodos(todoInputValue);

    // CHECK MARK BUTTON
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add("complete-btn");
    todoItem.appendChild(completeBtn);

    // CHECK TRASH BUTTON
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoItem.appendChild(trashBtn);

    $todoInput.value = "";
}

function deleteCheck(evt) {
    const item = evt.target;

    // CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const itemParent = item.parentElement;
        itemParent.classList.toggle("completed");
    }

    // DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const itemParent = item.parentElement;
        // Animation
        itemParent.classList.add("fall");
        removeLocalTodos(itemParent);
        itemParent.addEventListener("transitionend", () => {
            itemParent.remove();
        })
    }
}

function filterTodo(evt) {
    const todos = $todoList.childNodes;
    todos.forEach((todo) => {
        switch (evt.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.unshift(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {
        // Todo LI
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo");

        // Todo P
        const todoText = document.createElement("p");
        todoText.innerText = todo;
        todoText.classList.add("todo-text");
        todoItem.appendChild(todoText);

        // CHECK MARK BUTTON
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.classList.add("complete-btn");
        todoItem.appendChild(completeBtn);

        // CHECK TRASH BUTTON
        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add("trash-btn");
        todoItem.appendChild(trashBtn);

        // APPEND TO LIST
        $todoList.appendChild(todoItem);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}