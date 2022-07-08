var getID = function () {
    if (lstorage.categories.length > 0) {
        var lastItem = lstorage.categories[lstorage.categories.length - 1];
        return lastItem.id + 1;
    }
    else {
        return 1;
    }
};
var refresh = function () {
    document.location.reload(false);
};
// CARGAR TABLA CATEGORÍAS
var loadCategoriesTable = function () {
    var lstorage = getStorage();
    var tableCategories = document.getElementById('table-categories');
    var tbody = tableCategories.getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";
    lstorage.categories.forEach(function (category) {
        var tr = document.createElement('tr');
        var tdCategory = document.createElement('td');
        var tdDelete = document.createElement('a');
        // var aDelete = document.createElement("a");
        tdDelete.classList.add('color-a');
        tdDelete.dataset.id = category.id;
        tdCategory.appendChild(document.createTextNode(category.name));
        var iconTrash = tdDelete.appendChild(document.createElement('i'));
        iconTrash.classList.add("fa-solid")
        iconTrash.classList.add("fa-trash-can")
        // tdDelete.appendChild(aDelete);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDelete);
        tbody.appendChild(tr);
    });
};
loadCategoriesTable();
// FUNCION CREAR CATEGORIAS
var formCategory = document.getElementById('form-category');
var lstorage = getStorage();
var createCategory = function (e) {
    e.preventDefault();
    var form = e.target;
    var newCategoryName = form.name.value;
    var newCategory = {
        id: getID(),
        name: newCategoryName
    };
    lstorage.categories.push(newCategory);
    localStorage.setItem('ahorradas-data', JSON.stringify(lstorage));
    loadCategoriesTable();
    refresh();
};
formCategory.addEventListener('submit', createCategory);


//FUNCION ELIMINAR CATEGORIA

var deleteCategory = function (e) {
    var idCategory = e.target.dataset.id;
    var lstorage = getStorage();
    var updatedStorage = lstorage.categories.filter(function (item) { return item.id != idCategory; });
    localStorage.setItem('ahorradas-data', JSON.stringify({ ...lstorage, categories: updatedStorage }));
    loadCategoriesTable();
};
addEventListener('click', deleteCategory);