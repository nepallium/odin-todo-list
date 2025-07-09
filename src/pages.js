import todoState from "./todoState";
import domFunctions from "./domFunctions";

const h1 = document.querySelector("main h1")
export function inbox() {
    h1.textContent = "Inbox";

    if (todoState.allLists["inbox"].length > 0) {
        todoState.allLists["inbox"].forEach(todo => domFunctions.displayTodo(todo))
    }
    else {
        notifyEmpty()
    }

}

export function today() {
    h1.textContent = "Today";

    const todayDate = new Date()
    for (const proj in todoState.allLists) {
        todoState.allLists[proj]
        .filter(todo => todo.dueDate)
        .filter(todo => 
            todo.dueDate.getDate() === todayDate.getDate() &&
            todo.dueDate.getMonth() === todayDate.getMonth() &&
            todo.dueDate.getFullYear() === todayDate.getFullYear()
        )
        .forEach(todo => {
            domFunctions.displayTodo(todo)
        });
    }

    if (!document.querySelector("section.todoList").hasChildNodes) {
        notifyEmpty()
    }
}

export function showProject(projName) {
    h1.textContent = projName

    console.log(todoState.allLists[projName])
    if (todoState.allLists[projName].length > 0) {
        todoState.allLists[projName].forEach(todo => domFunctions.displayTodo(todo))
    } else {
        notifyEmpty()
    }
}

function notifyEmpty() {
    const notif = document.createElement("p")
    notif.className = "empty-notif"
    notif.textContent = "You're all set!"
    
    document.querySelector("section.todoList").appendChild(notif)
}