function setTodoClickListeners() {
    let allDrawnTodoDivs = document.getElementsByClassName("todo");
    [...allDrawnTodoDivs].forEach(todoDiv => {
        todoDiv.addEventListener('click', handleTodoClicked);
    })
};

function handleTodoClicked(event) {
    const todoId = event.target.id.split('-')[1];
    console.log(todoId);
    //fillModalFromId(todoId);
    //modal.style.display = "block";
};