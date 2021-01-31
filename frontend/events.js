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

document.getElementById('modal-cancle-btn').addEventListener('click', ev => {
    ev.preventDefault();
    closeModal();
});

document.getElementById('modal-put-btn').addEventListener('click', ev => {
    ev.preventDefault();
    let newData = getDataFromCurrentModal();
    putTodoToApi(newData, getModalId())
    closeModal();
});

document.getElementById('modal-create-btn').addEventListener('click', ev => {
    ev.preventDefault();
    let newData = getDataFromCurrentModal();
    postTodoToApi(newData);
    closeModal();
});

document.getElementById('modal-delete-btn').addEventListener('click', ev => {
    ev.preventDefault();
    deleteTodoInApi(getModalId());
    closeModal();
});