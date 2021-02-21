function setTodoClickListeners() {
    drawnTodos = getAllHtmlElementsOfClassTodo();
    drawnTodos.forEach(todoDiv => {
        todoDiv.addEventListener('click', handleTodoClicked);
    })
};

function getAllHtmlElementsOfClassTodo() {
    let allDrawnTodoDivs = document.getElementsByClassName("todo");
    return [...allDrawnTodoDivs]
}


function getTodoIdFromClickEvent(event) {
    return event.currentTarget.id.split('-')[1];
}


async function handleTodoClicked(event) {
    const todoId = getTodoIdFromClickEvent(event);
    const todo = await getSingleTodoFromApi(todoId);
    fillModalFromTodo(todo);
    setModalButtonsForUpdate();
    showModal();
};

document.getElementById('modal-cancle-btn').addEventListener('click', ev => {
    ev.preventDefault();
    closeModal();
});

document.getElementById('modal-put-btn').addEventListener('click', ev => {
    ev.preventDefault();
    let newData = getDataFromCurrentModal();
    console.log(newData);
    putTodoToApi(newData, getTodoIdFromModal())
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
    deleteTodoInApi(getTodoIdFromModal());
    closeModal();
});

window.onclick = closeModalIfClickedOutside;