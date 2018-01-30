const form = $('form');
const ul = $('ul');
const button = $('.delete-all-button');
const input = form.find('input');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

const removeItemController = function(offset) {
    itemsArray = itemsArray.filter(function(item, index) {
        return index !== offset;
    });
    updateApp();
};

const addItemController = function (e) {
    e.preventDefault();

    itemsArray.push(input.val());
    updateApp();
    input.val('');
};

const removeAllController = function () {
    itemsArray = [];
    updateApp();
};

const updateApp = () => {
    ul.html('');

    itemsArray.forEach((text, offset) => {
        ul.append('<li>' + text + ' <button>Diesen Eintrag löschen</button></li>');
        ul.find('li:last button').click((e) => { removeItemController(offset); });
    });

    // Liga-Tabelle ausgeben

    $('.anzahl-ergebnisse').html('Bislang wurden ' + itemsArray.length + ' Ergebnisse erfasst.');

    localStorage.setItem('items', JSON.stringify(itemsArray));
}

updateApp();

form.submit(addItemController);
button.click(removeAllController);