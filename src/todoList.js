import Todo from "./todo"

export default class TodoList {
    constructor(name) {
        this.list = []
        this.name = name
    }

    add() {
        // Modal for adding

        const todo = new Todo("clean", {priority: "high", dueDate: "July 16th", desc: "clean up ya filthy pig"})
        this.list.push(todo)
        this.list.push(new Todo("walk", {dueDate: "July 16th", desc: "step grind"}))
    }
}