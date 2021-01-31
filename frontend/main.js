function constructSoftPrioCatCols(categories) {
    var softPrioGrid = document.getElementById('soft-prio-grid');
    categories.forEach(category => {
        var container = document.createElement('div');
        container.className = "cat-col";
        container.setAttribute("id", category);
        var label = document.createElement('div');
        label.className = "cat-header";
        label.innerHTML = category;
        container.appendChild(label);
        softPrioGrid.appendChild(container);
    });
}

function addSoftPrioTodos(todos) {
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.innerHTML = todo.description;
        todoDiv.setAttribute('id', `todo-${getTodoIdFromUrl(todo.url)}`);
        const catDiv = document.getElementById(todo.category);
        catDiv.appendChild(todoDiv);
    })
}

function addHardPrioTodos(todos) {
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo hp-todo';
        todoDiv.innerHTML = todo.description;
        todoDiv.setAttribute('id', `todo-${getTodoIdFromUrl(todo.url)}`);
        const catDiv = document.getElementById('hard-prio-grid');
        catDiv.appendChild(todoDiv);
    })
}

function getTodoIdFromUrl(todoUrl) {
    const ulrStringBitsArray = todoUrl.split('?')[0].split('/');
    const iD = ulrStringBitsArray[ulrStringBitsArray.length - 2];
    return iD
}