function setTodoClickListeners() {
    let allDrawnTodoDivs = document.getElementsByClassName("todo");
    [...allDrawnTodoDivs].forEach(todoDiv => {
        todoDiv.addEventListener('click', handleTodoClicked);
    })
};

async function handleTodoClicked(event) {
    const todoId = event.currentTarget.id.split('-')[1];
    const todo = await getSingleTodoFromApi(todoId);
    fillModalFromTodo(todo);
    document.getElementById('modal-create-btn').style.display = "none";
    document.getElementById('modal-put-btn').style.display = "inline-block";
    document.getElementById('modal-delete-btn').style.display = "inline-block";
    modal.style.display = "block";
};

document.getElementById('modal-cancle-btn').addEventListener('click', ev => {
    ev.preventDefault();
    closeModal();
});

document.getElementById('modal-put-btn').addEventListener('click', ev => {
    ev.preventDefault();
    let newData = getDataFromCurrentModal();
    console.log(newData);
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