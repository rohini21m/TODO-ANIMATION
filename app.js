//selectors
const Input = document.querySelector(".to-do");
const ToDobutton = document.querySelector(".todo-button");
const List = document.querySelector(".todo-list");
const Filter = document.querySelector(".filter-list");

// EVENTLISTENRES
document.addEventListener("DomContentLoaded", getActivity);
ToDobutton.addEventListener("click", work);
List.addEventListener("click", deleteCheck);
Filter.addEventListener("click", FilterTask);

function work(event) {
  event.preventDefault();

  // create nrew div when press button
  const Todo = document.createElement("div");
  Todo.classList.add("newDiv"); //  line 10,11 gives us = <div class="newDiv">
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = Input.value;
  newTodo.classList.add("todo-item");
  Todo.appendChild(newTodo);
  // add items to local storage
  saveLocalActivity(Input.value); // this INput.value will bring activity values into array in loacal storage.
  // complete task

  const completeTask = document.createElement("button");
  completeTask.innerHTML = '<i class="fas fa-check-square"></i>';
  completeTask.classList.add("complete-btn"); //line 17,18,19 gives us = <button class="complete-button"><i class="fas fa-check">
  Todo.appendChild(completeTask);
  /// delete task
  const deleteTask = document.createElement("button");
  deleteTask.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteTask.classList.add("delete-btn"); //line 23,24,25 gives us = <button class="delete-button"><i class="fas fa-delete">
  Todo.appendChild(deleteTask);
  // adding todo list
  List.appendChild(Todo);
  // clear input value
  Input.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // to delete and check target
  if (item.classList[0] === "delete-btn") {
    const thing = item.parentElement;
    thing.classList.add("fall");
    removeActivity(thing);
    thing.addEventListener("animationend", function () {
      thing.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const thing = item.parentElement;
    thing.classList.toggle("completed");
  }
}

function FilterTask(e) {
  const activity = List.childNodes;
  activity.forEach(function (thing) {
    switch (e.target.value) {
      case "all":
        thing.style.display = "flex";
        break;
      case "completed":
        if (thing.classList.contains("completed")) {
          thing.style.display = "flex";
        } else {
          thing.style.display = "none";
        }
        break;
      case "incompleted":
        if (!thing.classList.contains("completed")) {
          thing.style.display = "flex";
        } else {
          thing.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalActivity(thing) {
  //check if data is there
  let activity;
  if (localStorage.getItem("activity") === null) {
    activity = [];
  } else {
    activity = JSON.parse(localStorage.getItem("activity"));
  }
  activity.push(thing);
  localStorage.setItem("activity", JSON.stringify(activity)); /// saving the data
}

function getActivity() {
  let activity;
  if (localStorage.getItem("activity") === null) {
    activity = [];
  } else {
    activity = JSON.parse(localStorage.getItem("activity"));
  }
  activity.push(thing);
  localStorage.setItem("activity", JSON.stringify(activity));
  activity.forEach(function (thing) {
    const Todo = document.createElement("div");
    Todo.classList.add("newDiv"); //  line 10,11 gives us = <div class="newDiv">
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = thing;
    newTodo.classList.add("todo-item");
    Todo.appendChild(newTodo);
    // add items to local storage

    // complete task

    const completeTask = document.createElement("button");
    completeTask.innerHTML = '<i class="fas fa-check-square"></i>';
    completeTask.classList.add("complete-btn"); //line 17,18,19 gives us = <button class="complete-button"><i class="fas fa-check">
    Todo.appendChild(completeTask);
    /// delete task
    const deleteTask = document.createElement("button");
    deleteTask.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteTask.classList.add("delete-btn"); //line 23,24,25 gives us = <button class="delete-button"><i class="fas fa-delete">
    Todo.appendChild(deleteTask);
    // adding todo list
    List.appendChild(Todo);
  });
}
function removeActivity(thing) {
  let activity;
  if (localStorage.getItem("activity") === null) {
    activity = [];
  } else {
    activity = JSON.parse(localStorage.getItem("activity"));
  }
  activity.push(thing);
  localStorage.setItem("activity", JSON.stringify(activity));
  const ThingIndex = thing.children[0].innerText;
  activity.splice(activity.indexOf(ThingIndex), 1);
  localStorage.setItem("activity", JSON.stringify(activity));
}
