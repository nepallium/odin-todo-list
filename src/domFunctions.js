import todoState from "./todoState"
import Todo from "./todo"
import { showProject, inbox, today } from "./pages";
import { format } from "date-fns";
import { listenForProjDel } from "./modals";

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
        
        // console.log(todo.dueDate)
        if (todo.dueDate) {
            const date = document.createElement("p")
            date.classList = "date"
            date.textContent = format(new Date(todo.dueDate), "P")
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

    displayProjectInSidebar(project) {
        const projectList = document.querySelector("ul.proj-list")

        const projElement = document.createElement("li")
        projElement.classList.add("proj")
        projElement.classList.add("page")
        const p = document.createElement("p")
        p.textContent = project
        projElement.appendChild(p)

        const options = document.createElement("div")
        // edit button
        const edit = document.createElement("span")
        edit.classList.add("material-symbols-outlined")
        edit.classList.add("edit")
        edit.textContent = "edit"
        options.appendChild(edit)

        // delete button
        const del = document.createElement("span")
        del.classList.add("material-symbols-outlined")
        del.classList.add("delete")
        del.textContent = "delete"
        listenForProjDel(del)
        options.appendChild(del)

        projElement.appendChild(options)
        projectList.appendChild(projElement)

        // event listener
        this.listenForProjectPage(projElement)
    }

    listenForProjectPage(projElement) {
        projElement.addEventListener("click", () => {
            const todoListSection = document.querySelector("section.todoList")
            todoListSection.innerHTML = ""
            showProject(projElement.querySelector("p").textContent)
        })
    }

    listenForPageChange() {
        const todoListSection = document.querySelector("section.todoList");

        // Map class names to functions
        const pageMap = {
            inbox: inbox,
            today: today,
            // Add more mappings as needed
        };

        // Select all page elements
        const pages = document.querySelectorAll("li.page");

        pages.forEach(page => {
            page.addEventListener("click", () => {
                todoListSection.innerHTML = "";
                // Find which function to call based on class
                for (const key in pageMap) {
                    if (page.classList.contains(key)) {
                        pageMap[key]();
                        return;
                    }
                }
                // If it's a project page, handle separately
                // will be used when using localStorage (?)
                if (page.classList.contains("proj")) {
                    showProject(page.querySelector("p").textContent)
                }
            });
        });
    }

    removeProject(projElement) {
        projElement.remove()
    }
}

const domFunctions = new DOM()

export default domFunctions