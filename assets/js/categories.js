var lstorage = getStorage();

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
    var tbody = tableCategories.querySelector('tbody');

    tbody.innerHTML = "";

    lstorage.categories.forEach(function (category) {
        var tr = document.createElement('tr');

        // Celda texto
        var tdText = document.createElement('td');
        tdText.appendChild(document.createTextNode(category.name));

        // Celda eliminar
        var tdDelete = document.createElement('td');
        // Botón eliminar
        var btnDelete = document.createElement('button')
        btnDelete.classList.add('color-a');
        btnDelete.dataset.id = category.id;

        // Icono Eliminar
        var iconTrash = document.createElement('i');
        iconTrash.classList.add("fa-solid");
        iconTrash.classList.add("fa-trash-can");
        // para que al clieckear el boton, no se tome el evento del icono.
        iconTrash.setAttribute('style', 'pointer-events: none;')

        btnDelete.addEventListener('click', deleteCategory);

        btnDelete.appendChild(iconTrash);
        tdDelete.appendChild(btnDelete);

        tr.appendChild(tdText);
        tr.appendChild(tdDelete);
        tbody.appendChild(tr);
    });
};
// FUNCION CREAR CATEGORIAS

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

var formCategory = document.getElementById('form-category');
formCategory.addEventListener('submit', createCategory);


//FUNCION ELIMINAR CATEGORIA

var deleteCategory = function (e) {
    e.stopPropagation()
    console.log(e.target, e.target.dataset.id)
    var idCategory = e.target.dataset.id;
    var lstorage = getStorage();
    var updatedStorage = lstorage.categories.filter(function (item) { return item.id != idCategory; });

    console.log(updatedStorage);
    localStorage.setItem('ahorradas-data', JSON.stringify({ ...lstorage, categories: updatedStorage }));
    loadCategoriesTable();
};


// Función inicial. Acá va todo lo que se ejecuta al cargar por primera vez.
const initApp = () => {
    loadCategoriesTable();
}

initApp()