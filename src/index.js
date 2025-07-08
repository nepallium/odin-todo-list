import "./reset.css";
import "./styles.css";
import TodoList from "./todoList";
import Inbox from "./inbox"
import todoState from "./state";
import Todo from "./todo";
import domFunctions from "./domFunctions";
import { listenForNewProject, listenForNewTodo } from "./modals";


// Test: Add some todos
todoState.addTodo(new Todo("clean", {priority: "high", dueDate: "July 16th", desc: "clean up ya filthy pig"}))
todoState.addTodo(new Todo("walk", {dueDate: "July 16th", desc: "step grind"}))

// Display inbox on load
Inbox()

listenForNewProject()
listenForNewTodo()
