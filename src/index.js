import "./reset.css";
import "./styles.css";
import TodoList from "./todoList";
import Inbox from "./inbox"
import todoState from "./state";
import Todo from "./todo";
import domFunctions from "./domFunctions";


// Test: Add some todos
todoState.addTodo(new Todo("clean", {priority: "high", dueDate: "July 16th", desc: "clean up ya filthy pig"}))
todoState.addTodo(new Todo("walk", {dueDate: "July 16th", desc: "step grind"}))

// Display inbox on load
Inbox()


// Add Task Modal
const dialog = document.querySelector("dialog.addTodo")
const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
    dialog.showModal()
})

// New task added through form submit
const form = dialog.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const todo = new Todo(
        document.getElementById("title").value,
        {
            desc: document.getElementById("desc").value,
            dueDate: document.getElementById("dueDate").value,
            priority: document.getElementById("priority").value.toLowerCase(),
            project: document.getElementById("project").value,
        })
    todoState.addTodo(todo, todo.project)
    domFunctions.displayTodo(todo)
    console.log(todoState.allLists)

    form.reset()
    dialog.close()
})
