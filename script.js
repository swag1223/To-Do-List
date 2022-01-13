
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener('click', (e) => {
    localStorage.clear();
    location.reload();
});
const todoForm = document.querySelector("#todo-form");
const addInput = document.querySelector("#add-input");
const addBtn = document.querySelector("#add-btn");

const todos = document.querySelector(".todos");

const dateDisplay = document.querySelector(".date");
const today = new Date();
dateDisplay.innerText = today.toUTCString().slice(0,12);


document.addEventListener('DOMContentLoaded', displayTodosFromLocalStorage);

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = addInput.value.trim();

   
    if (!task) {
        alert("enter task first");
        return; //otherwise empty div will be appended to tasks list and we are not allowing that
    }
    
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.classList.add("not-done");
    //console.log(todo.classList);


    //createTodo(todo ,task);
    const todoContentDiv = document.createElement("p");
    todoContentDiv.innerText = task;
    todo.appendChild(todoContentDiv);

    //adding local storage
    saveToLocalStorage(task , todo.classList[1]);
    //##########################

    const todoBtns = document.createElement("div");
    todoBtns.classList.add("btns");
//completed button added
    const doneIcon = document.createElement("button");
    doneIcon.innerHTML = '<i class="fas fa-check-square fa-2x pointed" style="color: rgba(31, 184, 100, 0.959)"/>';
    doneIcon.classList.add("completed-task");

    todoBtns.appendChild(doneIcon);

//edit button added
    const editIcon = document.createElement("button");
    editIcon.innerHTML = '<i class="fas fa-pen-square fa-2x pointed" style="color: rgba(35, 147, 221, 0.959)"/>';
    editIcon.classList.add("edit-task");

    todoBtns.appendChild(editIcon);

//delete button added
    const deleteIcon = document.createElement("button");
    deleteIcon.innerHTML = '<i class="fas fa-minus-square fa-2x pointed" style="color: rgba(252, 61, 14, 0.959)"/>';
    deleteIcon.classList.add("delete-task");

    todoBtns.appendChild(deleteIcon);

    todo.appendChild(todoBtns);

    todos.appendChild(todo);

//clear addinput value
    addInput.value = "";
    addInput.focus();
    
});

todos.addEventListener('click', (e) => {
    
    const itemClicked = e.target.parentElement; //button ele is parent of icon
    
    if (itemClicked.classList[0] === "delete-task") {
        removeTodoFromLocalStorage(itemClicked.parentElement.parentElement.firstElementChild.innerText);
        itemClicked.parentElement.parentElement.remove(); //parent of button id btn div and we need to delete the todo div , which is parent of brn div
        
    }
    if (itemClicked.classList[0] === "completed-task") {
        
        itemClicked.parentElement.parentElement.classList.toggle('completed');
        markDoneFromLocalStorage(itemClicked.parentElement.parentElement.firstElementChild);
        
        
    }
    if (itemClicked.classList[0] === "edit-task") {
        addInput.value = itemClicked.parentElement.parentElement.firstElementChild.innerText;
        addInput.focus();
        removeTodoFromLocalStorage(itemClicked.parentElement.parentElement.firstElementChild.innerText);
        itemClicked.parentElement.parentElement.remove();
    }
    
});


function saveToLocalStorage(todoText , status) {
    //check if arr already has some item
    let todosArr;
    let obj = {};
    if (localStorage.getItem('todosArr') === null) {
        todosArr = [];
    }
    else {
        //if already there take the existing todosarr 
        todosArr = JSON.parse(localStorage.getItem('todosArr'));
    }
    //add neew item to arr and push it again to local storage
    obj.todoText = todoText;
    obj.status = status;
    todosArr.push(obj);
    localStorage.setItem('todosArr', JSON.stringify(todosArr));
    
}


function displayTodosFromLocalStorage() {
    addInput.focus();
    let todosArr;
    if (localStorage.getItem('todosArr') === null) {
        todosArr = [];
    }
    else {
        //if already there take the existing todosarr 
        todosArr = JSON.parse(localStorage.getItem('todosArr'));
    }

    //loop through each element in arr and display them on screen;
    //how to display? create those elements again ...
    todosArr.forEach(obj => {

        const task = obj.todoText;
        
        const todo = document.createElement("div");
        todo.classList.add("todo");
        if (obj.status === 'not-done') todo.classList.add("not-done");  
        else if (obj.status === 'done') todo.classList.add("done");

        const todoContentDiv = document.createElement("p");
        todoContentDiv.innerText = task;
        todo.appendChild(todoContentDiv);


        const todoBtns = document.createElement("div");
        todoBtns.classList.add("btns");
    //completed button added
        const doneIcon = document.createElement("button");
        doneIcon.innerHTML = '<i class="fas fa-check-square fa-2x pointed" style="color: rgba(31, 184, 100, 0.959)"/>';
        doneIcon.classList.add("completed-task");

        todoBtns.appendChild(doneIcon);

    //edit button added
        const editIcon = document.createElement("button");
        editIcon.innerHTML = '<i class="fas fa-pen-square fa-2x pointed" style="color: rgba(35, 147, 221, 0.959)"/>';
        editIcon.classList.add("edit-task");

        todoBtns.appendChild(editIcon);

    //delete button added
        const deleteIcon = document.createElement("button");
        deleteIcon.innerHTML = '<i class="fas fa-minus-square fa-2x pointed" style="color: rgba(252, 61, 14, 0.959)"/>';
        deleteIcon.classList.add("delete-task");

        todoBtns.appendChild(deleteIcon);

        todo.appendChild(todoBtns);

        todos.appendChild(todo);
        
    });

}

//remove todos from local storage;

function removeTodoFromLocalStorage(todoText) {
    let todosArr;
    if (localStorage.getItem('todosArr') === null) {
        todosArr = [];
    } else {
        todosArr = JSON.parse(localStorage.getItem('todosArr'));
    }
    //remove the clicked todo text from arr and push back to local storage
    const objIndex = todosArr.findIndex((obj) => obj.todoText === todoText);
    todosArr.splice(objIndex, 1);
    localStorage.setItem('todosArr', JSON.stringify(todosArr));
   
}

function markDoneFromLocalStorage(paraEle) {
   
    let todosArr;
    if (localStorage.getItem('todosArr') === null) {
        todosArr = [];
    } else {
        todosArr = JSON.parse(localStorage.getItem('todosArr'));
    }
    
    //get index of object whose todoText property has val of text
    const objIndex = todosArr.findIndex((obj) => obj.todoText === paraEle.innerText);
  
    //MARK IT AS DONE or not done
    if (todosArr[objIndex].status === 'not-done') {
        todosArr[objIndex].status = 'done';
        if (paraEle.parentElement.classList.contains('not-done')) {
            paraEle.parentElement.classList.remove('not-done');
            paraEle.parentElement.classList.add('done');
        }
    }
    else if (todosArr[objIndex].status === 'done') {
        todosArr[objIndex].status = 'not-done';
         if (paraEle.parentElement.classList.contains('done')) {
            paraEle.parentElement.classList.remove('done');
            paraEle.parentElement.classList.add('not-done');
        }
    
    }
    //save changes to local storage
    localStorage.setItem('todosArr', JSON.stringify(todosArr));

}
