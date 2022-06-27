var params = new URLSearchParams(window.location.search);
if (params.get("id")) {
}
// FUNCION ID´S OPERATION
var getIdOperation = function () {
    if (lstorage.operations.length > 0) {
        var lastItem = lstorage.operations[lstorage.operations.length - 1];
        return lastItem.id + 1;
    }
    else {
        return 1;
    }
};
//FUNCION CARGAR SELECT DE CATEGORIES
var selectCatOperations = document.getElementById("selectCategoriesOp");
if (selectCatOperations)
    loadForm(selectCatOperations);
// FUNCION CARGA OPERACIONES A LS
var formOperation = document.getElementById("form-operation");
var lstorage = getStorage();
var createOperation = function (e) {
    e.preventDefault();
    var form = e.target;
    var getCategory = function (selectCat) {
        for (var _i = 0, _a = lstorage.categories; _i < _a.length; _i++) {
            var Category = _a[_i];
            if (parseInt(selectCat) === Category.id) {
                return Category;
            }
        }
    };
    var descriptionOP = form.descriptionOp.value;
    var categoriesOP = getCategory(form.selectCategoriesOp.value);
    var dateOP = form.dateOp.value;
    var amountOP = parseInt(form.amountOp.value);
    var typeOP = form.selectType.value;
    var newOp = {
        id: getIdOperation(),
        description: descriptionOP,
        category: categoriesOP,
        date: dateOP,
        amount: amountOP,
        type: typeOP
    };
    console.log(newOp);
    lstorage.operations.push(newOp);
    localStorage.setItem("ahorradas-data", JSON.stringify(lstorage));
};
if (formOperation)
    formOperation.addEventListener("submit", createOperation);
