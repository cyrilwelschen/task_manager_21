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
    const sortedTodos = sortTodosFromPrio(todos, "soft_prio");
    sortedTodos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.innerHTML = todo.description;
        todoDiv.title = JSON.stringify(todo, null, 2);
        todoDiv.setAttribute('id', `todo-${getTodoIdFromUrl(todo.url)}`);
        const catDiv = document.getElementById(todo.category);
        catDiv.appendChild(todoDiv);
    })
}

function sortTodosFromPrio(todos, prio) {
    if (prio == "hard_prio") {
        return todos.sort((a, b) => (a.hard_prio > b.hard_prio) ? -1 : 1);
    }
    return todos.sort((a, b) => (a.soft_prio > b.soft_prio) ? -1 : 1);
}

function addHardPrioTodos(todos) {
    const sortedTodos = sortTodosFromPrio(todos, "hard_prio");
    sortedTodos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo hp-todo';
        todoDiv.innerHTML = todo.description;
        todoDiv.title = JSON.stringify(todo, null, 2);
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