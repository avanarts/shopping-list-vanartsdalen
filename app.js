const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear')

const itemFilter = document.getElementById('filter')

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => {
        addItemToDOM(item);
    })

    checkUI();
}


function itemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;

    if(newItem.value === '') {
        alert('Please add an item.');
        return;
    }
    //create DOM item
    addItemToDOM(newItem)

    //add item to local storage
    addItemToStorage(newItem)

    checkUI();
    itemInput.value = '';
   
}

function addItemToDOM(item) {
 //create list item
 const li = document.createElement('li');
 li.appendChild(document.createTextNode(item));

 const button = createButton('remove-item btn-link text-red')
 li.appendChild(button);

 //add li to DOM
 itemList.appendChild(li);

}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    
    //add new item to array
    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes;
    return icon
}

function removeItem(e) {
//event delegation: put event on item list, the ul
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

//check UI state
function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}


//initialize app
function init() {
    //event listeners
    itemForm.addEventListener('submit', itemSubmit);
    itemList.addEventListener('click', removeItem);
    itemClear.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI()
}


init();