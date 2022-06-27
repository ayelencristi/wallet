var getStorage = function () {
    var locStor = JSON.parse(localStorage.getItem('ahorradas-data'));
    if (!locStor) {
        locStor = {
            categories: [],
            operations: []
        };
    }
    return locStor;
};
var init = function () {
    localStorage.setItem('ahorradas-data', JSON.stringify(getStorage()));
};
init();
