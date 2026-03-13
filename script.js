const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask(){

const text = taskInput.value.trim();

if(text === ""){
alert("Enter a task");
return;
}

const li = document.createElement("li");

li.innerHTML = `
<span onclick="toggleComplete(this)">${text}</span>

<div class="actions">

<button class="edit" onclick="editTask(this)">Edit</button>

<button class="delete" onclick="deleteTask(this)">Delete</button>

</div>
`;

taskList.appendChild(li);

taskInput.value="";

saveTasks();
updateStats();
}

function deleteTask(btn){
btn.parentElement.parentElement.remove();
saveTasks();
updateStats();
}

function toggleComplete(task){
task.classList.toggle("completed");
saveTasks();
updateStats();
}

function editTask(btn){

const taskSpan = btn.parentElement.previousElementSibling;

const newText = prompt("Edit task:", taskSpan.textContent);

if(newText !== null && newText.trim() !== ""){
taskSpan.textContent = newText.trim();
saveTasks();
}

}

function clearAllTasks(){
taskList.innerHTML="";
localStorage.removeItem("tasks");
updateStats();
}

function saveTasks(){
localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks(){
taskList.innerHTML = localStorage.getItem("tasks") || "";
updateStats();
}

function updateStats(){

let total = taskList.children.length;

let completed = document.querySelectorAll(".completed").length;

let pending = total - completed;

document.getElementById("taskStats").textContent =
`Total: ${total} | Completed: ${completed} | Pending: ${pending}`;

}

taskInput.addEventListener("keypress", function(e){

if(e.key === "Enter"){
addTask();
}

});