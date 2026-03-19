const API_URL = "http://localhost:5005/api/tasks";

// Fetch and display all tasks on page load
async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const ul = $("ul");
  ul.empty();
  tasks.forEach(task => addTaskToDOM(task));
}

// Add a task to the DOM
function addTaskToDOM(task) {
  const isMarked = task.isComplete ? "mark" : "";
  const icon = task.isComplete
    ? '<i class="fa-regular fa-square-check"></i>'
    : '<i class="fa-regular fa-square"></i>';

  const li = $(`
    <li class="listItem" data-id="${task.id}">
      <span class="toggleMe ${isMarked}">${icon}</span>
      <p class="${isMarked}" contentEditable="true">${task.title}</p>
      <span class="deleteMe"><i class="fa-solid fa-trash-can"></i></span>
    </li>
  `);

  li.find(".toggleMe").on("click", toggleComplete);
  li.find(".deleteMe").on("click", deleteTask);
  li.find("p").on("blur", updateTitle);

  $("ul").append(li);
}

// Toggle task completion
async function toggleComplete() {
  const li = $(this).closest("li");
  const id = li.data("id");
  await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" });
  const isMarked = $(this).hasClass("mark");
  if (isMarked) {
    $(this).html('<i class="fa-regular fa-square"></i>');
  } else {
    $(this).html('<i class="fa-regular fa-square-check"></i>');
  }
  $(this).toggleClass("mark");
  $(this).siblings("p").toggleClass("mark");
}

// Update task title on blur
async function updateTitle() {
  const li = $(this).closest("li");
  const id = li.data("id");
  const newTitle = $(this).text();
  await fetch(`${API_URL}/${id}/title`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTitle)
  });
}

// Delete a task
async function deleteTask() {
  const li = $(this).closest("li");
  const id = li.data("id");
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  li.remove();
}

// Create a new task
async function createTask() {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Click on me to edit", isComplete: false })
  });
  const task = await response.json();
  addTaskToDOM(task);
}

$(".addItem").on("click", createTask);

loadTasks();