import Todo from "./todo";
import todoState from "./todoState";
import domFunctions from "./domFunctions";
import { format } from "date-fns";

export function listenForNewTodo() {
    // Add Task Modal
    const dialog = document.querySelector("dialog.add-todo")
    const addButtons = document.querySelectorAll('button.add');
    addButtons.forEach(button => button.addEventListener('click', () => {
        updateProjectDropdown()
        
        // Hide due date OR project input boxes
        const mainH1 = document.querySelector("main h1")
        const dueDateInput = document.getElementById("dueDate")
        const projInput = document.getElementById("project")
        
        if (mainH1.textContent === "Inbox") {
            dueDateInput.parentElement.style.display = "block"
            projInput.parentElement.style.display = "block"

            dueDateInput.value = ""
            projInput.value = "None"
        }
        else if (mainH1.textContent === "Today") {
            dueDateInput.value = format(new Date(), "yyyy-MM-dd")
            dueDateInput.parentElement.style.display = "none"
        }
        else {
            projInput.value = mainH1.textContent
            projInput.parentElement.style.display = "none"
        }
        
        dialog.showModal()
    }))

    // New task added through form submit
    const form = dialog.querySelector("form#todo-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const desc = document.getElementById("desc").value;
        const dueDate = document.getElementById("dueDate").value
        const priority = document.getElementById("priority").value
        const project = document.getElementById("project").value
        const todo = new Todo(
            document.getElementById("title").value,
            {
                desc: desc,
                dueDate: dueDate ? dueDate.split("-") : null,
                priority: priority.toLowerCase(),
                project: project === "None" ? "inbox" : project,
            })
        todoState.addTodo(todo, todo.project)
        domFunctions.displayTodo(todo)
        console.log(todoState.allLists)

        form.reset()
        dialog.close()
    })
}

function updateProjectDropdown() {
    const dropdown = document.querySelector("select#project");
    dropdown.innerHTML = ""

    const noneOption = document.createElement("option")
    noneOption.textContent = "None"
    dropdown.appendChild(noneOption)

    for (const proj in todoState.allLists) {
        if (proj != "inbox") {
            const option = document.createElement("option");
            option.textContent = proj
            dropdown.appendChild(option)
        }
    }
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
        if (!todoState.addProject(project)) {
            alert("A project with the same name already exists!")
            form.reset()
            return
        };
        console.log(todoState.allLists)

        domFunctions.displayProjectInSidebar(project)
        form.reset()
        dialog.close()
    })
}

export function listenForProjDel(delElement) {
    const dialog = document.querySelector("dialog.del-project");

    delElement.addEventListener("click", (e) => {
        e.stopPropagation();
        dialog.projElementToDelete = delElement.parentElement.parentElement;
        dialog.showModal();
    });

    const form = dialog.querySelector("form");
    if (!form.hasListener) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // e.submitter is the button that was clicked to submit the form
            const projElement = dialog.projElementToDelete;
            if (e.submitter && e.submitter.value === "yes" && projElement) {
                const projectName = projElement.querySelector("p").textContent;
                todoState.removeProject(projectName);
                domFunctions.removeProject(projElement);
                console.log(todoState.allLists);
            }

            form.reset();
            dialog.close();
            dialog.projElementToDelete = null;
        });
        form.hasListener = true;
    }
}

export function listenForDialogClose() {
    const closeBtns = document.querySelectorAll("span.cancel")

    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const dialog = btn.parentElement.parentElement
            dialog.close()
            const form = dialog.querySelector("form")
            form.reset()
        })
    })
}
