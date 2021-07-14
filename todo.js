// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todolist = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if (userData.trim() != 0) { //if user values aren't only spaces
        addBtn.classList.add("active");//active the add button
    }
    else {
        addBtn.classList.remove("active");//unactive the add button
    }
}
showTasks();//calling showTask function


// if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo");// getting local storage
    if (getLocalStorage == null) {// if local storage is null
        listArr = [];//creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object

    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();//calling showTask function
    addBtn.classList.remove("active");//unactive the add button
    
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");// getting local storage
    if (getLocalStorage == null) {// if local storage is null
        listArr = [];//creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the array length in pendingtask 

    if (listArr.length > 0) { //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the delete button
    }
    else {
        deleteAllBtn.classList.remove("active"); //unactive the delete button 
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <button onclick="deleteTask(${index})"; >Remove</button></li>`;

    });
    todolist.innerHTML = newLiTag;//Adding new li tag inside ui tag
    inputBox.value = ""; //once task added leave the input field blank 
}
// delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //calling showTasks function
}
// delete all tasks function 
deleteAllBtn.onclick = () => {
    listArr = []; //empty the array
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //set the item in localstorage 
    showTasks(); //call the showTasks function 
}