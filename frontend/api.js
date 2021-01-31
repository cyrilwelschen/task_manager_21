let url = 'http://127.0.0.1:8000/todos/';

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

async function getTodosFromApiFetch() {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        let todos = await response.json();
        todos.forEach(todo => {
            categories.push(todo.category);
            if (todo.hard_prio != 0) {
                hardTodos.push(todo);
            } else {
                softTodos.push(todo);
            }
        })
        categories = categories.filter(onlyUnique);
        constructSoftPrioCatCols(categories);
        addSoftPrioTodos(softTodos);
        addHardPrioTodos(hardTodos);
        setTodoClickListeners();
    } else {
        console.log("Error:")
        console.log(response);
    }
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


async function putCallToApi(todoDataDictionary, todoId) {
    let response = await fetch(url + `${todoId}/`, {
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

getTodosFromApiFetch();
putCallToApi(PUT_TEST_DATA, 1);