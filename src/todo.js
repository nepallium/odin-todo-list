export default class Todo {
    constructor(title, options={}) {
        this.title = title
        this.desc = options.desc || ""
        this.dueDate = options.dueDate ? new Date(options.dueDate) : null
        this.priority = options.priority || ""
        this.project = options.project || "inbox"
        this.isDone = false
    }
}


