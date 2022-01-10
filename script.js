//add local storage //edit functionality //display date //all clear //fix styling bugs
const addInput = document.querySelector("#add-input");
const addBtn = document.querySelector("#add-btn");

const todos = document.querySelector(".todos");

// console.log(addInput);
// console.log(addBtn);
// console.log(todos);

addBtn.addEventListener('click', (e) => {
    //console.log(e);
    //console.log(addInput.value);
    const task = addInput.value;
    //console.log(todo);
    if (!task) {
        alert("enter task first");
        return; //otherwise empty div will be appended to tasks list and we are not allowing that
    }

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoContent = document.createElement("p");
    todoContent.innerText = task;
    todo.appendChild(todoContent);

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
    
});

todos.addEventListener('click', (e) => {
    //console.log(e.target);
    //console.log(e.target.parentElement);
    
    const itemClicked = e.target.parentElement; //button ele is parent of icon
    // console.log(itemClicked.classList);
    if (itemClicked.classList[0] === "delete-task") {
        //console.log( itemClicked.parentElement.parentElement);
        itemClicked.parentElement.parentElement.remove(); //parent of button id btn div and we need to delete the todo div , which is parent of brn div
        
    }
    if (itemClicked.classList[0] === "completed-task") {
        itemClicked.parentElement.parentElement.classList.toggle('completed');
        
    }
    if (itemClicked.classList[0] === "edit-task") {
        addInput.value = itemClicked.parentElement.parentElement.firstElementChild.innerText;
        itemClicked.parentElement.parentElement.remove();
    }
    
});
