import domFunctions from "./domFunctions"
import Todo from "./todo"
import todoState from "./todoState"

class StorageState {
    addTodo(todo) {
        const proj = localStorage.getItem(todo.project)
        let todos = []
        
        if (proj) {
            todos = JSON.parse(proj)
        }
        
        todos.push(JSON.stringify(todo))
        localStorage.setItem(todo.project, JSON.stringify(todos))
    }

    removeTodo(todo) {
        console.log("yay")
        const proj = localStorage.getItem(todo.project)

        let todos = []
        
        if (proj) {
            todos = JSON.parse(proj)
        }

        todos.splice(todos.indexOf(todo), 1)
        console.log(todos)
        localStorage.setItem(todo.project, JSON.stringify(todos))
    }

    addProject(project) {
        localStorage.setItem(project, JSON.stringify([]))
    }

    removeProject(project) {
        localStorage.removeItem(project)
    }
}

const storageState = new StorageState()
export { storageState }

export function loadTodos() {
    for (let i = 0; i < localStorage.length; i++) {
        const project = localStorage.key(i);
        let todos = localStorage.getItem(project);
        
        if (!todos) {
            continue
        }

        todos = JSON.parse(todos)
        
        todoState.addProject(project)
        
        for (let todo of todos) {
            todo = JSON.parse(todo)
            todoState.allLists[project].push(new Todo(todo.title, {...todo}))
        }
    }
}

export function loadProjects() {
    for (let i = 0; i < localStorage.length; i++) {
        const project = localStorage.key(i);
        
        todoState.allLists[project] = []
        if (project !== "inbox") {
            domFunctions.displayProjectInSidebar(project)
        }
    }
    
}
