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

function sortTodosFromPrio(todos, prio) {
    if (prio == "hard_prio") {
        return todos.sort((a, b) => (a.hard_prio > b.hard_prio) ? -1 : 1);
    }
    return todos.sort((a, b) => (a.soft_prio > b.soft_prio) ? -1 : 1);
}

function createAndAddStandardEl(classes, value, parent) {
    const newEl = document.createElement('div');
    newEl.classList.add(...classes);
    newEl.innerHTML = value;
    parent.appendChild(newEl);
}

function dayTextFromDate(todoDate) {
    const dateDiff = new Date(todoDate) - new Date();
    const days = Math.floor(dateDiff / (60 * 60 * 1000 * 24));
    return `${days}d`;
}

function addSoftPrioTodos(todos) {
    addPrioTodos(todos, "soft")
}

function addHardPrioTodos(todos) {
    addPrioTodos(todos, "hard")
}

function addPrioTodos(todos, prioType) {
    const sortedTodos = sortTodosFromPrio(todos, `${prioType}_prio`);
    sortedTodos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.title = JSON.stringify(todo, null, 2);
        todoDiv.setAttribute('id', `todo-${getTodoIdFromUrl(todo.url)}`);
        const baseCl = ["inline-indicator"];
        createAndAddStandardEl(['todo-text'], todo.description, todoDiv);
        if (todo.deadline) { createAndAddStandardEl(baseCl.concat('days'), dayTextFromDate(todo.deadline), todoDiv) };
        if (todo.is_jira) { createAndAddStandardEl(baseCl.concat('jira'), "J", todoDiv) };
        if (todo.is_short_task) { createAndAddStandardEl(baseCl.concat('short'), "S", todoDiv) };
        const prioNumber = (prioType == "hard") ? todo.hard_prio : todo.soft_prio;
        createAndAddStandardEl(baseCl.concat('prio'), prioNumber, todoDiv);
        const parentElId = (prioType == "hard") ? 'hard-prio-grid' : todo.category
        let catDiv = document.getElementById(parentElId);
        catDiv.appendChild(todoDiv);
    })
}

function getTodoIdFromUrl(todoUrl) {
    const ulrStringBitsArray = todoUrl.split('?')[0].split('/');
    const iD = ulrStringBitsArray[ulrStringBitsArray.length - 2];
    return iD
}