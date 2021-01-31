var modal = document.getElementById("myModal");

function setModalId(url) {
    const idDiv = document.getElementById('id-modal-div');
    idDiv.innerHTML = `Todo ID: ${url.split('/')[4]}`;
}

function getModalId(url) {
    const idDiv = document.getElementById('id-modal-div');
    return idDiv.innerHTML.split(" ")[2]
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

function getDataFromCurrentModal() {
    let dataDict = {};
    const inputs = document.getElementById('modal-form').elements;
    for (formElement of inputs) {
        if (formElement.nodeName == "INPUT") {
            let key = formElement.id;
            if (formElement.type == "checkbox") {
                dataDict[key] = formElement.checked;
            } else {
                dataDict[key] = formElement.value;
            }
        }
    }
    return dataDict;
}

function openModalForNew() {
    const inputs = document.getElementById('modal-form').elements;
    for (formElement of inputs) {
        if (formElement.nodeName == "INPUT") {
            if (formElement.type == "checkbox") {
                formElement.checked = false;
            } else {
                formElement.value = "";
            }
        }
    }
    document.getElementById('id-modal-div').innerHTML = "";
    document.getElementById('created-modal-div').innerHTML = "";
    document.getElementById('modal-create-btn').style.display = "inline-block";
    document.getElementById('modal-put-btn').style.display = "none";
    document.getElementById('modal-delete-btn').style.display = "none";
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}