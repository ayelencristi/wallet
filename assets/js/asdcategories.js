var getID = function () {
	if (lstorage.categories.length > 0) {
		var lastItem = lstorage.categories[lstorage.categories.length - 1];
		return lastItem.id + 1;
	} else {
		return 1;
	}
};
var refresh = function () {
	document.location.reload(false);
};
// CARGAR TABLA CATEGORÍAS
var loadCategoriesTable = function () {
	var lstorage = getStorage();
	var tableCategories = document.getElementById("table-categories");
	// tableCategories.innerHTML = "";
	lstorage.categories.forEach(function (category) {
		var tr = document.createElement("tr");
		var tdCategory = document.createElement("td");
		var tdEdit = document.createElement("a");
		var tdDelete = document.createElement("a");
		tdCategory.appendChild(document.createTextNode(category.name));
		tdEdit.appendChild(document.createTextNode("Editar"));
		tdDelete.appendChild(document.createTextNode("Eliminar"));
		tdEdit.setAttribute(
			"onclick",
			'location.href="./categories-edit.html?id=' + category.id + '"'
		);
		tdDelete.dataset.id = category.id;
		tdDelete.setAttribute("class", "tdDelete");
		tr.appendChild(tdCategory);
		tr.appendChild(tdEdit);
		tr.appendChild(tdDelete);
		var tbody = tableCategories.getElementsByTagName("tbody")[0];
		tbody.appendChild(tr);
		// tdDelete.addEventListener('onclick', deleteCategory);
	});
};
loadCategoriesTable();
// FUNCION CREAR CATEGORIAS
var formCategory = document.getElementById("form-category");
var lstorage = getStorage();
var createCategory = function (e) {
	e.preventDefault();
	var form = e.target;
	var newCategoryName = form.name.value;
	var newCategory = {
		id: getID(),
		name: newCategoryName,
	};
	lstorage.categories.push(newCategory);
	localStorage.setItem("ahorradas-data", JSON.stringify(lstorage));
	loadCategoriesTable();
	refresh();
};
formCategory.addEventListener("submit", createCategory);
// FUNCION ELIMINAR / EDITAR CATEGORIAS
// const btnDeleteCat = document.getElementsByClassName('tdDelete');
// const deleteCategory = (e) => {
// 	const idToDelete = e.target.dataset.category;
// 	const storageAux = getStorage();
// 	let categoryNameToDelete;
// 	for (let i = 0; i < storageAux.categories.length; i++) {
// 		if (storageAux.categories[i].id == idToDelete) {
// 			categoryNameToDelete = storageAux.categories[i].name;
// 			storageAux.categories.splice(i, 1);
// 			break;
//         }
//     }
// }
// btnDeleteCat.addEventListener("click", deleteCategory);
// const deleteCategory = (e) => {
//     const idCategory = e.target.dataset.id;
//     let lstorage: LocalStorage = getStorage();
//     let updatedStorage = lstorage.categories.filter(item => item.id != idCategory);
//     localStorage.setItem('ahorradas-data', JSON.stringify({...lstorage, categories: updatedStorage}));
//     loadCategoriesTable();
