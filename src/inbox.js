import todoState from "./state";
import domFunctions from "./domFunctions";

export default function inbox() {
    const h1 = document.querySelector("main h1")
    h1.textContent = "Inbox";

    todoState.allLists["inbox"].forEach(todo => domFunctions.displayTodo(todo))
}