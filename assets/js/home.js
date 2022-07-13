// FUNCION CARGAR OPTIONS SELECT CATEGORIES
var selectCategories = document.getElementById("select-categories");
var loadForm = function (s) {
    var lstorage = getStorage();
    console.log(s);
    // const selectCategories = document.getElementById('select-categories');
    for (var _i = 0, _a = lstorage.categories; _i < _a.length; _i++) {
        var category = _a[_i];
        var elem = document.createElement("option");
        elem.innerText = category.name;
        elem.value = category.id.toString();
        s.appendChild(elem);
    }
};
if (selectCategories)
    loadForm(selectCategories);

// MODAL INICIO SESION
const exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', event => {

    const button = event.relatedTarget

    // const recipient = button.getAttribute('data-bs-whatever')

    const modalTitle = exampleModal.querySelector('.modal-title')
    const modalBodyInput = exampleModal.querySelector('.modal-body input')

    modalTitle.innerHTML = `Inicio de sesión <i class="fa-solid fa-user-clock">`
    // modalBodyInput.value = recipient
})

//FUNCION INCIO DE SESION
const user = 'Ayelen';
const password = '1234';
let btnForgetPass = document.getElementById('btnForgetPass');
let btnEnterUser = document.getElementById('btnEnterUser');
let btnUser = document.getElementById('btnUser');
let inputUser = document.getElementById('userName');
let inputPass = document.getElementById('userPass');

let login = function (e) {
    e.preventDefault()
    let userName = inputUser.value
    let userPass = inputPass.value
    if (userName === user && userPass === password) {
        btnUser.innerHTML = `<i class="fa-solid fa-user"></i></i> ${userName}`
        btnEnterUser.setAttribute('data-bs-dismiss', 'modal');
    }
    else {
        let modalBody = document.getElementById('modalBody');
        console.log(modalBody)
        let errorMessage = document.createElement('p');
        errorMessage.innerText = `Usuario y/o contraseña incorrectos. Intente de nuevo`
        errorMessage.style.color = 'red';
        modalBody.appendChild(errorMessage);
        const modalTitle = exampleModal.querySelector('.modal-title')
        modalTitle.innerHTML = `Inicio de sesión <i class="fa-solid fa-user-xmark"></i>`
    }
}
btnEnterUser.addEventListener('click', login)

/////////////////
// FUNCIÓN CARGAR TABLA DE OPERACIONES
var loadOperationTable = function () {
    var lstorage = getStorage();
    var tableOperations = document.getElementById("operations");
    var tbody = tableOperations.getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";
    for (var _i = 0, _a = lstorage.operations; _i < _a.length; _i++) {
        var operation = _a[_i];
        var tr = document.createElement("tr");
        var tdDescription = document.createElement("td");
        var tdCategory = document.createElement("td");
        var tdDate = document.createElement("td");
        var tdAmount = document.createElement("td");
        var tdAction = document.createElement("td");
        tdAction.style.display = 'flex';
        tdAction.style.justifyContent = 'center'
        // var deleteAction = document.createElement("a");
        var deleteBtn = document.createElement('button');
        deleteBtn.classList.add('color-a')
        deleteBtn.dataset.id = operation.id;
        var iconTrash = document.createElement('i');
        iconTrash.classList.add("fa-solid")
        iconTrash.classList.add("fa-trash-can")
        iconTrash.setAttribute('style', 'pointer-events: none;');

        deleteBtn.addEventListener('click', deleteOperation);

        tdDescription.appendChild(document.createTextNode(operation.description));
        tdCategory.appendChild(document.createTextNode(operation.category.name));
        tdDate.appendChild(document.createTextNode(operation.date));
        tdAmount.appendChild(document.createTextNode(operation.amount));
        deleteBtn.appendChild(iconTrash);
        tdAction.appendChild(deleteBtn);
        tr.appendChild(tdDescription);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDate);
        tr.appendChild(tdAmount);
        tr.appendChild(tdAction);
        if (tableOperations) {
            var tbody = tableOperations.getElementsByTagName("tbody");
            if (tbody) {
                var tbodyItem = tbody[0];
                tbodyItem.appendChild(tr);
            }
        }
    }
};
loadOperationTable();

// FUNCION MOSTRAR/OCULTAR TABLA DE OPERACIONES
var divImgHome = document.getElementById("div-img-home");
var divTableOperations = document.getElementById("div-table-operations");
var showTableOperation = function () {
    var lstorage = getStorage();
    if (lstorage.operations.length >= 1) {
        divImgHome.classList.add("d-none");
        divTableOperations.classList.remove("d-none");
    }
};
showTableOperation();
// FUNCION OPERACIONES BALANCE
var divGain = document.getElementById("div-gain");
var divExpense = document.getElementById("div-expense");
var divTotal = document.getElementById("div-total");
var balance = function () {
    var lstorage = getStorage();
    var totalGains = 0;
    var totalExpense = 0;
    var total = 0;
    for (var _i = 0, _a = lstorage.operations; _i < _a.length; _i++) {
        var operation = _a[_i];
        if (operation.type === "ganancia") {
            totalGains = totalGains + operation.amount;
        }
        else if (operation.type === "gasto") {
            totalExpense = totalExpense + operation.amount;
        }
    }
    total = totalGains - totalExpense;
    divGain.innerHTML = totalGains.toString();
    divExpense.innerHTML = totalExpense.toString();
    if (total < 0) {
        divTotal.innerHTML = "" + total;
    }
    else {
        divTotal.innerHTML = "" + total;
    }
};
if (divGain && divExpense && divTotal)
    balance();

// FUNCION ELIMINAR OPERACION

var deleteOperation = function (e) {
    e.stopPropagation()
    var idOperation = e.target.dataset.id;
    var lstorage = getStorage();
    var updatedStorage = lstorage.operations.filter(function (item) { return item.id != idOperation; });

    localStorage.setItem('ahorradas-data', JSON.stringify({ ...lstorage, operations: updatedStorage }));
    loadOperationTable();
};

const initApp = () => {
    loadOperationTable();
    balance();
}

initApp()