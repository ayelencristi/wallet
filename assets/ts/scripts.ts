type LocalStorage = {
    categories?: Category[],
    operations?: Operation[]
}

type Operation = {
    id: number,
    description: string,
    category: Category,
    date: string,
    amount: number,
    type: string,
}

type Category = {
    id: number,
    name: string
}

const getStorage = (): LocalStorage => {

    let locStor: LocalStorage = JSON.parse(localStorage.getItem('ahorradas-data'));

    if (!locStor) {
        locStor = {
            categories: [],
            operations: [],
        }
    }

    return locStor;
}







const init = () => {
    localStorage.setItem('ahorradas-data', JSON.stringify(getStorage()))
}

init();





