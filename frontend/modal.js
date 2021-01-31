var modal = document.getElementById("myModal");

function fillModalFromTodo(todo) {
    for (const [key, val] of Object.entries(todo)) {
        let currentInput = document.getElementById(key);
        if (currentInput) {
            if (currentInput.type == "checkbox") {
                currentInput.checked = val;
            } else {
                currentInput.value = val;
            }
        } else {
            console.log(`Err: Input ${key} not found (from Cyril)`)
        }
    }
}

function openModalForNew() {
    modal.style.display = "block";
}

function openModalWithExistingTodo() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}