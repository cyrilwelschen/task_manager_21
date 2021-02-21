var modal = document.getElementById("myModal");

function setTodoIdOnModal(url) {
    const idDiv = document.getElementById('id-modal-div');
    idDiv.innerHTML = `Todo ID: ${url.split('/')[4]}`;
}

function getTodoIdFromModal(url) {
    const idDiv = document.getElementById('id-modal-div');
    return idDiv.innerHTML.split(" ")[2]
}

function setModalCreationDayDiv(jsDateString) {
    const dateDiv = document.getElementById('created-modal-div');
    dateDiv.innerHTML = `Creation Date: ${jsDateString.split('T')[0]}`
}

function setModalInputField(inputField, value) {
    if (inputField.type == "checkbox") {
        inputField.checked = value;
    } else {
        inputField.value = value;
    }
}

function setModalAdditionalInfoDiv(apiKey, value) {
    if (apiKey == "url") { setTodoIdOnModal(value) };
    if (apiKey == "creation_date") { setModalCreationDayDiv(value) };
}

function fillModalFromTodo(todo) {
    for (const [apiKey, val] of Object.entries(todo)) {
        let currentInput = document.getElementById(apiKey);
        (currentInput) ? setModalInputField(currentInput, val): setModalAdditionalInfoDiv(apiKey, val);
    }
}

function getCurrentValueOfInputField(formElement) {
    if (formElement.type == "checkbox") { return formElement.checked };
    if (formElement.type == "date") { return (formElement.value == "") ? null : formElement.value };
    return formElement.value;
}

function getDataFromCurrentModal() {
    let dataDict = {};
    const inputs = getFormInputElements();
    for (formElement of inputs) {
        if (formElement.nodeName == "INPUT") {
            dataDict[formElement.id] = getCurrentValueOfInputField(formElement);
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