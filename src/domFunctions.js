import todoState from "./state"
import Todo from "./todo"

class DOM {
    displayAddTodoModal() {
        const dialog = document.querySelector("dialog.addTodo")
        dialog.showModal()
    }

    displayTodo(todo) {
        const section = document.querySelector("section.todoList")

        const todoElement = document.createElement("li")
        todoElement.className = "todo"

        const btn = document.createElement("button")
        btn.className = todo.priority

        // Deletion logic
        btn.addEventListener("click", () => {
            if (todoState.removeTodo(todo, todo.project)) {
                this.removeTodo(todoElement)
            }
        })

        todoElement.appendChild(btn)

        const infoContainer = document.createElement("div")
        infoContainer.className = "container"

        const title = document.createElement("p")
        title.className = "title"
        title.textContent = todo.title
        infoContainer.appendChild(title)
        
        if (todo.desc) {
            const desc = document.createElement("p")
            desc.classList = "desc"
            desc.textContent = todo.desc
            infoContainer.appendChild(desc)
        }
        
        if (todo.dueDate) {
            const date = document.createElement("p")
            date.classList = "date"
            date.textContent = todo.dueDate
            infoContainer.appendChild(date)
        }

        todoElement.appendChild(infoContainer)
        section.appendChild(todoElement)
    }

    removeTodo(todoElement) {
        if (todoElement && todoElement.parentNode) {
            todoElement.parentNode.removeChild(todoElement)
        }
    }
}

const domFunctions = new DOM()

export default domFunctions