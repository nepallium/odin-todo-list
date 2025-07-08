import Todo from "./todo";
import todoState from "./state";
import domFunctions from "./domFunctions";

export function listenForNewTodo() {
    // Add Task Modal
    const dialog = document.querySelector("dialog.add-todo")
    const addButton = document.querySelector('.add');
    addButton.addEventListener('click', () => {
        dialog.showModal()
    })

    // New task added through form submit
    const form = dialog.querySelector("form#todo-form")
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
}

export function listenForNewProject() {
    const dialog = document.querySelector("dialog.add-project")
    const addButton = document.querySelector('button.add-project');
    addButton.addEventListener('click', () => {
        dialog.showModal()
    })

    // New project through form submit
    const form = dialog.querySelector("form#project-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const project = document.getElementById("proj-name").value;
        todoState.addProject(project);
        console.log(todoState.allLists)

        form.reset()
        dialog.close()
    })
}
