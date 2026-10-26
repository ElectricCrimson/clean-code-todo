const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Remove Icon';
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.innerText = 'Edit';
  return editButton;
};

const createNewTask = function (taskText) {
  const task = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');

  label.innerText = taskText;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  task.append(checkBox, label, editInput, createEditButton(), createDeleteButton());
  return task;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const task = createNewTask(newTaskInput.value);

  incompleteTasksList.appendChild(task);
  bindTaskEvents(task, taskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const task = this.parentNode;
  const editInput = task.querySelector('input[type=text]');
  const label = task.querySelector('label');
  const editButton = task.querySelector('.edit');
  const isEditMode = task.classList.contains('edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  task.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const task = this.parentNode;
  const currentList = task.parentNode;
  currentList.removeChild(task);
};

const toggleTaskList = function (tasksList) {
  const task = this.parentNode;
  tasksList.appendChild(task);
  return task;
};

const taskCompleted = function () {
  bindTaskEvents(toggleTaskList.call(this, completedTasksList), taskIncomplete);
};

const taskIncomplete = function () {
  bindTaskEvents(toggleTaskList.call(this, incompleteTasksList), taskCompleted);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (currentTask, checkBoxHandler) {
  const checkBox = currentTask.querySelector('input[type=checkbox]');
  const editButton = currentTask.querySelector('button.edit');
  const deleteButton = currentTask.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxHandler;
};

const bindAllTasks = function (tasksList, taskStatusHandler) {
  const tasks = tasksList.children;
  for (let i = 0; i < tasks.length; i++) {
    bindTaskEvents(tasks[i], taskStatusHandler);
  }
};

bindAllTasks(incompleteTasksList, taskCompleted);
bindAllTasks(completedTasksList, taskIncomplete);
