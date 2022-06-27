const params = new URLSearchParams(window.location.search);

if (params.get("id")) {
}

// FUNCION ID´S OPERATION

var getIdOperation = () => {
	if (lstorage.operations.length > 0) {
		const lastItem = lstorage.operations[lstorage.operations.length - 1];
		return lastItem.id + 1;
	} else {
		return 1;
	}
};

//FUNCION CARGAR SELECT DE CATEGORIES

const selectCatOperations = document.getElementById("selectCategoriesOp");

if (selectCatOperations) loadForm(selectCatOperations);

// FUNCION CARGA OPERACIONES A LS

const formOperation = document.getElementById("form-operation");

let lstorage: LocalStorage = getStorage();

const createOperation = (e) => {
	e.preventDefault();

	const form = e.target;

	const getCategory = (selectCat) => {
		for (const Category of lstorage.categories) {
			if (parseInt(selectCat) === Category.id) {
				return Category;
			}
		}
	};

	const descriptionOP: string = form.descriptionOp.value;
	const categoriesOP: Category = getCategory(form.selectCategoriesOp.value);
	const dateOP: string = form.dateOp.value;
	const amountOP: number = parseInt(form.amountOp.value);
	const typeOP: string = form.selectType.value;

	const newOp: Operation = {
		id: getIdOperation(),
		description: descriptionOP,
		category: categoriesOP,
		date: dateOP,
		amount: amountOP,
		type: typeOP,
	};
	console.log(newOp);
	lstorage.operations.push(newOp);
	localStorage.setItem("ahorradas-data", JSON.stringify(lstorage));
};
if (formOperation) formOperation.addEventListener("submit", createOperation);
