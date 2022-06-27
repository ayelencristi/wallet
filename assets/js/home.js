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
/////////////////
// FUNCIÓN CARGAR TABLA DE OPERACIONES
var tableOperations = document.getElementById("operations");
var lstorage = getStorage();
var loadOperationTable = function () {
    // lstorage.operations.forEach((operation) => {
    for (var _i = 0, _a = lstorage.operations; _i < _a.length; _i++) {
        var operation = _a[_i];
        var tr = document.createElement("tr");
        var tdDescription = document.createElement("td");
        var tdCategory = document.createElement("td");
        var tdDate = document.createElement("td");
        var tdAmount = document.createElement("td");
        var tdAction = document.createElement("td");
        var editAction = document.createElement("a");
        var deleteAction = document.createElement("button");
        tdDescription.appendChild(document.createTextNode(operation.description));
        tdCategory.appendChild(document.createTextNode(operation.category.name));
        tdDate.appendChild(document.createTextNode(operation.date));
        tdAmount.appendChild(document.createTextNode(operation.amount));
        tdAction.appendChild(editAction);
        tdAction.appendChild(deleteAction);
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
        // })
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
// SUMAR GANANCIAS  = RECORRER LSTORAGE DE OP, IDENTIFICAR GANANCIAS Y GASTOS Y HACER TOTAL
// concatena en vez de hacer suma de números y los gastos también los suma en vez de restarlos, lo dejo comentado, descomentar para probarlo...
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
