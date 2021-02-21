var modal = document.getElementById("myModal");

function setTodoIdOnModal(url) {
    const idDiv = document.getElementById('id-modal-div');
    idDiv.innerHTML = `Todo ID: ${url.split('/')[4]}`;
}

function getTodoIdFromModal(url) {
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
            if (apiKey == "url") { setTodoIdOnModal(val); continue };
            if (apiKey == "creation_date") { setModalCreatedDays(val); continue };
            console.log("API Key unknown: " + apiKey);
        }
    }
}

function getDataFromCurrentModal() {
    let dataDict = {};
    const inputs = getFormInputElements();
    for (formElement of inputs) {
        if (formElement.nodeName == "INPUT") {
            let key = formElement.id;
            if (formElement.type == "checkbox") {
                dataDict[key] = formElement.checked;
            } else if (formElement.type == "date") {
                dataDict[key] = (formElement.value == "") ? dataDict[key] = null : formElement.value;
            } else {
                dataDict[key] = formElement.value;
            }
        }
    }
    return dataDict;
}

function uncheckCheckboxInput(checkboxElement) {
    checkboxElement.checked = false;
}

function numberInputToZero(numberElement) {
    numberElement.value = 0;
}

function clearTextInput(inputElement) {
    inputElement.value = "";
}

function clearFormField(formElement) {
    if (formElement.type == "checkbox") { uncheckCheckboxInput(formElement) };
    if (formElement.type == "number") { numberInputToZero(formElement) };
    if (formElement.type == "text") { clearTextInput(formElement) };
}

function getFormInputElements() {
    return document.getElementById('modal-form').elements;
}

function clearModalFormFields() {
    const inputs = getFormInputElements();
    for (formElement of inputs) {
        if (formElement.nodeName == "INPUT") {
            clearFormField(formElement)
        }
    }
}

function openModalForNew() {
    clearModalFormFields();
    hideAutoSetModalFields();
    setModalButtonsForNew();
    showModal();
}


function hideAutoSetModalFields() {
    document.getElementById('id-modal-div').innerHTML = "";
    document.getElementById('created-modal-div').innerHTML = "";
}

function setModalButtonsForNew() {
    document.getElementById('modal-create-btn').style.display = "inline-block";
    document.getElementById('modal-put-btn').style.display = "none";
    document.getElementById('modal-delete-btn').style.display = "none";
}


function setModalButtonsForUpdate() {
    document.getElementById('modal-create-btn').style.display = "none";
    document.getElementById('modal-put-btn').style.display = "inline-block";
    document.getElementById('modal-delete-btn').style.display = "inline-block";
}

function closeModal() {
    modal.style.display = "none";
}

function showModal() {
    modal.style.display = "block";
}

function closeModalIfClickedOutside(event) {
    if (event.target == modal) {
        closeModal();
    }
}