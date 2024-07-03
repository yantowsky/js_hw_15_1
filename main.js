const addTodoBtn = document.querySelector('.form__btn');
const inputTodo = document.querySelector('.js--form__input');
const todosList = document.querySelector('.js--todos-wrapper');

let valueInputTodo;

addTodoBtn.addEventListener('click', function () {
    valueInputTodo = inputTodo.value;
    !valueInputTodo ? alert("Неможливо створити пусту нотаткуй") : addValueToLocalStorage(valueInputTodo);
    renderTodoList();
});

todosList.addEventListener('click', function (event) {
    const keyLocalStorage = event.target.closest('.todo-item').getAttribute('value');
    if (event.target.classList.contains('todo-item__delete')) {
        delValueToLocalStorage(keyLocalStorage);
        renderTodoList();
    }
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        stateCheckbox(keyLocalStorage, event);
    }
});

function createJsonDataObjTodo(boolean, value) {
    dataObjForTodo = {
        checkbox: boolean,
        valueTodo: value
    }
    return JSON.stringify(dataObjForTodo);
}

let numForNameKey = 1;

function addValueToLocalStorage(value) {
    localStorage.getItem(`todo_${numForNameKey}`) ?
        (numForNameKey++, addValueToLocalStorage(value)) :
        localStorage.setItem(`todo_${numForNameKey}`, createJsonDataObjTodo(false, value));
}

function delValueToLocalStorage(key) {
    localStorage.removeItem(key);
}

function stateCheckbox(key, event) {
    event.target.closest('.todo-item').classList.toggle('todo-item--checked');

    const stateCheckbox = event.target.checked;
    const parseJsonDataObjTodo = JSON.parse(localStorage.getItem(key));
    parseJsonDataObjTodo.checkbox = stateCheckbox;

    const stringJsonDataObjTodo = JSON.stringify(parseJsonDataObjTodo);
    localStorage.setItem(key, stringJsonDataObjTodo);
}

function renderTodoList() {
    todosList.innerHTML = '';
    for (i = 0; i < localStorage.length; i++) {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const checkBoxForTodoItem = document.createElement('input');
        checkBoxForTodoItem.setAttribute('type', 'checkbox');

        const spanForTodoItem = document.createElement('span');
        spanForTodoItem.classList.add('todo-item__description');

        const delButtonForTodoItem = document.createElement('button');
        delButtonForTodoItem.classList.add('todo-item__delete');
        delButtonForTodoItem.innerText = 'Видалити';

        if (localStorage.key(i).slice(0, 5) === 'todo_') {
            const parseJsonDataObjTodo = JSON.parse(localStorage.getItem(localStorage.key(i)));
            spanForTodoItem.innerText = parseJsonDataObjTodo.valueTodo;

            if (parseJsonDataObjTodo.checkbox) {
                todoItem.classList.toggle('todo-item--checked');
                checkBoxForTodoItem.checked = parseJsonDataObjTodo.checkbox;
            }

            todoItem.setAttribute('value', localStorage.key(i));
            todoItem.append(checkBoxForTodoItem, spanForTodoItem, delButtonForTodoItem);
            todosList.append(todoItem);
        }
    }
}
renderTodoList();