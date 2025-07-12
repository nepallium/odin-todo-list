import "./reset.css";
import "./styles.css";
import domFunctions from "./domFunctions";
import { listenForNewProject, listenForNewTodo, listenForDialogClose } from "./modals";
import { inbox } from "./pages";
import { loadProjects, loadTodos } from "./localStorageStuff";

document.addEventListener("DOMContentLoaded", () => {
    loadProjects()
    loadTodos()
    inbox()
    
    listenForNewProject()
    listenForNewTodo()
    
    domFunctions.listenForPageChange()
    
    listenForDialogClose()
})
