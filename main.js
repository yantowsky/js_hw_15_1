let arrTodoList = [];

const addTodoBtn = document.querySelector('.form__btn');
const todosList = document.querySelector('.js--todos-wrapper');

addTodoBtn.addEventListener('click', function () {
    const inputTodo = document.querySelector('.js--form__input');
    const valueInputTodo = inputTodo.value;
    !valueInputTodo ? alert("Неможливо створити пусту нотаткуй") :
        addTodoToArr(createNewNumIdForTodo(), false, valueInputTodo);
});

todosList.addEventListener('click', function (event) {
    const keyLocalStorage = event.target.closest('.todo-item').getAttribute('value');
    event.target.classList.contains('todo-item__delete') && delTodoToArr(keyLocalStorage);
    event.target.tagName === 'INPUT' && event.target.type === 'checkbox' &&
        stateCheckbox(keyLocalStorage, event);
});

function createTodoList() {
    if (arrTodoList.length) {
        localStorage.setItem('todo_list', JSON.stringify(arrTodoList));
    } else {
        for (i = 0; i < localStorage.length; i++) {
            arrTodoList = (localStorage.key(i) === 'todo_list') &&
                JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
    }
    renderTodoList();
}
createTodoList();

function createNewNumIdForTodo() {
    let numForIdTodo = !arrTodoList.length ? 1 :
        Number(((arrTodoList[arrTodoList.length - 1]).id).slice(5)) + 1;
    return numForIdTodo;
}

function addTodoToArr(num, boolean, input) {
    dataObjForTodo = {
        id: `todo_${num}`,
        checkbox: boolean,
        value: input
    }
    arrTodoList.push(dataObjForTodo);
    createTodoList();
}

function delTodoToArr(id) {
    arrTodoList.forEach((element, index) => {
        element.id === id && (arrTodoList.splice([index], 1));
        !index && localStorage.removeItem('todo_list');
    });
    createTodoList();
}

function stateCheckbox(key, event) {
    event.target.closest('.todo-item').classList.toggle('todo-item--checked');

    const stateCheckbox = event.target.checked;

    arrTodoList.forEach(element => {
        element.id === key && (element.checkbox = stateCheckbox);
    });
    createTodoList();
}

function renderTodoList() {
    todosList.innerHTML = '';

    arrTodoList.forEach(element => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const checkBoxForTodoItem = document.createElement('input');
        checkBoxForTodoItem.setAttribute('type', 'checkbox');

        const spanForTodoItem = document.createElement('span');
        spanForTodoItem.classList.add('todo-item__description');

        const delButtonForTodoItem = document.createElement('button');
        delButtonForTodoItem.classList.add('todo-item__delete');
        delButtonForTodoItem.innerText = 'Видалити';

        spanForTodoItem.innerText = element.value;

        todoItem.setAttribute('value', element.id);

        element.checkbox &&
            (todoItem.classList.toggle('todo-item--checked'),
                checkBoxForTodoItem.checked = element.checkbox);

        todoItem.append(checkBoxForTodoItem, spanForTodoItem, delButtonForTodoItem);
        todosList.append(todoItem);
    });
}