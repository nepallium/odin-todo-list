import "./reset.css";
import "./styles.css";
import todoState from "./todoState";
import Todo from "./todo";
import domFunctions from "./domFunctions";
import { listenForNewProject, listenForNewTodo, listenForDialogClose } from "./modals";
import { inbox } from "./pages";


// Test: Add some todos
todoState.addTodo(new Todo("clean", {priority: "high", dueDate: new Date(2025, 6, 15), desc: "clean up ya filthy pig"}))
todoState.addTodo(new Todo("walk", {dueDate: new Date(2025, 6, 15), desc: "step grind"}))
todoState.addTodo(new Todo("today", {dueDate: new Date(), desc: "step grind"}))

// Display inbox on load
inbox()

listenForNewProject()
listenForNewTodo()

domFunctions.listenForPageChange()

listenForDialogClose()