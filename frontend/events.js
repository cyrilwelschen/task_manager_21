function setTodoClickListeners() {
    let allDrawnTodoDivs = document.getElementsByClassName("todo");
    [...allDrawnTodoDivs].forEach(todoDiv => {
        todoDiv.addEventListener('click', handleTodoClicked);
    })
};

async function handleTodoClicked(event) {
    const todoId = event.target.id.split('-')[1];
    const todo = await getSingleTodoFromApi(todoId);
    fillModalFromTodo(todo);
    modal.style.display = "block";
};