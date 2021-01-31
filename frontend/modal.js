var modal = document.getElementById("myModal");

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