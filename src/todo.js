import todoState from "./state"
import DOMStuff from "./domFunctions"

export default class Todo {
    constructor(title, options={}) {
        this.title = title
        this.desc = options.desc || ""
        this.dueDate = options.dueDate || ""
        this.priority = options.priority || ""
        this.project = options.project || "inbox"
        this.isDone = false
    }
}


