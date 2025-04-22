//Once the DOM content is loaded then we will perform anything else it can cause possible failure
document.addEventListener('DOMContentLoaded',()=>{
const todoinput=document.getElementById("todo-input")
const addTaskBtn=document.getElementById("addtaskbtn")
const todoList=document.getElementById("todolist")

//Remeber that the local storage is not updated but rather it get rebooted everytime

//So the thing is if there is something already present in the storage after the page is loaded then all of that will be automatically put in the taskArr and if the storage is empty then the empty array will be initialized
// let taskArr=JSON.parse(localStorage.getItem("items")) || [];
let taskArr=JSON.parse(localStorage.getItem("tasks")) || [];
//Now the traverse the taskArr and get every element
taskArr.forEach(ele =>renderTask(ele));

addTaskBtn.addEventListener('click',addfunc);
document.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        addfunc()
    }
});
function addfunc(){
    const text=todoinput.value.trim()
    if(text === "") return;

    const newTask={
        id:Date.now(),
        text:text,
        completed:false
    };
    
    taskArr.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoinput.value=""; //Here we are clearing the input
    // console.log(taskArr); 
}
function renderTask(task){
    //Creating a list item
    const li=document.createElement('li')
    if(task.completed) li.classList.add('completed')
    li.setAttribute("data-id",task.id)
    //updating the html of the list that we have created
    li.innerHTML=`
        <span>${task.text}</span>
        <button id="deletebtn">Delete</button>
    `
    //We want to find out if some one clicks on the list item
    li.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            return;
        }
        task.completed=!task.completed
        li.classList.toggle("completed");saveTasks();
    })
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation()
        taskArr=taskArr.filter(t=>t.id !== task.id)
        li.remove()
        saveTasks();
    })


    //Adding the li to the todolist
    todoList.appendChild(li)
}
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(taskArr)) //Here the storage is done in form of key and value and key should be a string
}

})