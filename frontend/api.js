let MAIN_URL = 'http://127.0.0.1:8000/todos/';

PUT_TEST_DATA = {
    "url": "http://127.0.0.1:8000/todos/1/",
    "description": "This is moth-f upd :-d",
    "category": "Cat1",
    "deadline": "2021-01-27",
    "creation_date": "2021-01-22T21:52:12.495425Z",
    "is_short_task": true,
    "is_jira": true,
    "soft_prio": 201,
    "hard_prio": 0
}

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

async function deleteTodo(todoId) {
    let response = await fetch(MAIN_URL + `${todoId}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        console.log("Successfully deleted todo")
    } else {
        console.log("Error while deleting");
        console.log(response);
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
        console.log("Error");
        console.log(response);
    }
}

async function getTodosFromApiFetch() {
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
        console.log("Error:")
        console.log(response);
    }
}

async function putCallToApi(todoDataDictionary, todoId) {
    let response = await fetch(MAIN_URL + `${todoId}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoDataDictionary),
    });
    if (!response.ok) {
        console.log("Put error");
        console.log(response);
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
        console.log(response);
    }
};

getTodosFromApiFetch();
//putCallToApi(PUT_TEST_DATA, 1);