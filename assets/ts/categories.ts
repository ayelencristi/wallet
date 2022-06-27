let getID = () =>{ 
    if(lstorage.categories.length > 0){
        const lastItem = lstorage.categories[lstorage.categories.length -1]
        return lastItem.id +1;
    }else{
        return 1
    }

}

const refresh = () =>{
    document.location.reload(false);
}


// CARGAR TABLA CATEGORÍAS

const loadCategoriesTable = () => {
    const lstorage: LocalStorage = getStorage();

    const tableCategories = document.getElementById('table-categories');
    const tbody = tableCategories.getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    lstorage.categories.forEach((category) => {
        const tr = document.createElement('tr');
        const tdCategory = document.createElement('td');
        const tdEdit = document.createElement('td');
        const tdDelete = document.createElement('td');
        const aEdit = document.createElement('a');
        const aDelete = document.createElement('a');

        tdCategory.appendChild(document.createTextNode(category.name));
        tdEdit.appendChild(document.createTextNode('Editar'));        
        tdDelete.appendChild(document.createTextNode('Eliminar'));
        aEdit.appendChild(tdEdit);
        aDelete.appendChild(tdDelete);
       
        tr.appendChild(tdCategory);
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);
        
        tbody.appendChild(tr);

    })
}
loadCategoriesTable();



// FUNCION CREAR CATEGORIAS

const formCategory = document.getElementById('form-category')

let lstorage = getStorage();

const createCategory = (e) => {
    e.preventDefault();

    const form = e.target;
    const newCategoryName: string = form.name.value;

    const newCategory: Category = {
        id: getID(),
        name: newCategoryName,
    }

    lstorage.categories.push(newCategory);

    localStorage.setItem('ahorradas-data', JSON.stringify(lstorage));
    loadCategoriesTable();
    refresh();
}

formCategory.addEventListener('submit', createCategory)





