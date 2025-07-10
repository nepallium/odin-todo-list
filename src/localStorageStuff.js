// import todoState from "./todoState"

class StorageState {
    addTodo(todo) {
        const proj = localStorage.getItem(todo.project)
        if (proj) {
            localStorage.setItem(todo.project, [...proj, JSON.stringify(todo)])
        } else {
            localStorage.setItem(todo.project, [JSON.stringify(todo)])
        }
    }
}

const storageState = new StorageState()
export { storageState }

export function loadTodos() {
    let todos

    // todoState
}