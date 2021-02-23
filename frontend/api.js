// let MAIN_URL = 'http://127.0.0.1:8000/todos/';
let MAIN_URL = 'https://shrouded-earth-93825.herokuapp.com/todos/';

let categories = [];
let softTodos = [];
let hardTodos = [];

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function categoriesTodos(todos) {
    todos.forEach(todo => {
        categories.push(todo.category);
        if (todo.hard_prio != 0) {
            hardTodos.push(todo);
        } else {
            softTodos.push(todo);
        }
    })
    categories = categories.filter(onlyUnique);
}

async function deleteTodoInApi(todoId) {
    let response = await fetch(MAIN_URL + `${todoId}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log("Deleting error");
    }
}

async function getSingleTodoFromApi(todoId) {
    let response = await fetch(MAIN_URL + `${todoId}/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const todo = await response.json();
        return todo
    } else {
        console.log("Get single error");
    }
}

async function getAllTodosFromApi() {
    let response = await fetch(MAIN_URL, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const todos = await response.json();
        categoriesTodos(todos);
        constructSoftPrioCatCols(categories);
        addSoftPrioTodos(softTodos);
        addHardPrioTodos(hardTodos);
        setTodoClickListeners();
    } else {
        console.log("Get all error")
    }
}

async function putTodoToApi(todoDataDictionary, todoId) {
    let response = await fetch(MAIN_URL + `${todoId}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoDataDictionary),
    });
    if (!response.ok) {
        console.log("Put error");
        console.log(todoDataDictionary);
        console.log(JSON.stringify(todoDataDictionary));
    }
};

async function postTodoToApi(todoDataDictionary) {
    let response = await fetch(MAIN_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoDataDictionary),
    });
    if (!response.ok) {
        console.log("Post error");
        console.log(todoDataDictionary);
        console.log(JSON.stringify(todoDataDictionary));
    }
};

getAllTodosFromApi();