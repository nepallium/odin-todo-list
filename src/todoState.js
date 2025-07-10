import { storageState } from "./localStorageStuff"

class TodoState {
    constructor() {
        this.allLists = {
            inbox: []
        }
    }

    addTodo(todo, list = "inbox") {
        this.allLists[list].push(todo)
        storageState.addTodo(todo)
    }

    removeTodo(todo, list = "inbox") {
        if (list in this.allLists) {
            const index = this.allLists[list].indexOf(todo)
            if (index !== - 1) {
                this.allLists[list].splice(index, 1)
                
                //
                console.log(todoState.allLists)
                
                return true
            }
        }
        //
        console.log(todoState.allLists)

        return false
    }

    addProject(name) {
        if (name in this.allLists) {
            return false
        }
        this.allLists[name] = []
        return true
    }

    removeProject(name) {
        if (name in this.allLists) {
            delete this.allLists[name]
            return true
        }
        return false
    }
}

const todoState = new TodoState()

export default todoState