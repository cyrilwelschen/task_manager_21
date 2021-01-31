var modal = document.getElementById("myModal");

function setModalId(url) {
    const idDiv = document.getElementById('id-modal-div');
    idDiv.innerHTML = `Todo ID: ${url.split('/')[4]}`;
}

function setModalCreatedDays(jsDateString) {
    const dateDiv = document.getElementById('created-modal-div');
    dateDiv.innerHTML = `Creation Date: ${jsDateString.split('T')[0]}`
}

function fillModalFromTodo(todo) {
    for (const [apiKey, val] of Object.entries(todo)) {
        let currentInput = document.getElementById(apiKey);
        if (currentInput) {
            if (currentInput.type == "checkbox") {
                currentInput.checked = val;
            } else {
                currentInput.value = val;
            }
        } else {
            if (apiKey == "url") { setModalId(val); continue };
            if (apiKey == "creation_date") { setModalCreatedDays(val); continue };
            console.log("API Key unknown: " + apiKey);
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