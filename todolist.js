// document.addEventListener('DOMContentLoaded', () => {
  
//   // Variable declaration of the .todo-item class
//   const todoItems = document.querySelectorAll(".todo-item");

//   todoItems.forEach(item => {
//     const checkbox = item.querySelectorAll('.checkbox');
//     // const text = item.querySelector('.todo-text').textContent.trim();

//     //Makes checkbox clickable
//     if (checkbox) {
//       checkbox.addEventListener("click", () => {
//         item.classList.toggle("completed");
//       });
//     }
//   });
// });

// DOM Variable declarations
const addnewListButton = document.querySelector('.plus-button');
const listContainer = document.getElementById('todo-list-ul');
// const deleteListButton = document.querySelector('.trash-button');
// const todoTextArea = document.getElementsByClassName("todo-text");

// Adds the next to-do div text area using innerHTML
function addTodo() {
  let li = document.createElement('li');
  li.innerHTML = `
    <span class="check-toggle"></span>
    <div class="editable-input" contenteditable="true" role="textbox" aria-multiline="true"></div>
    <button class="trash-button"><img id="trash-icon" src="./icons/trash.png"></button>
  `;
  li.classList.add('todo-item');
  listContainer.append(li);
  console.log(`listContainer has been appended with List Element`);

  // Add input event listener to the new editable input
  const editableInput = li.querySelector('.editable-input');
  editableInput.addEventListener('input', () => {
    console.log('Content changed:', editableInput.textContent);
  });

  // Saves the list when I press Enter instead of creating a new <br>
  editableInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents <br> from being created
      editableInput.blur();
      saveTodoList();
      console.log('Enter pressed: text saved!');
    }
  });

  // Add delete event listener to the trash button in this li
  const deleteBtn = li.querySelector('.trash-button');
  deleteBtn.addEventListener('click', () => {
    console.log(`List Element is being deleted`);
    li.remove();
    saveTodoList();
    // startTodo();
    console.log(`List Element has been deleted`);
  });
}

// If I select the <li> element where the pseudo-element circle is,
// toggle the 'checked' CSS where I switch the image from unchecked.png to checked.png
document.querySelector('#todo-list-ul').addEventListener('click', function(event) {
  if (event.target.classList.contains('check-toggle')) {
    const li = event.target.closest('li');
    li.classList.toggle('checked');
    console.log(`.checked has been toggled`);
  }
});

function startTodo() {
  // const observer = new MutationObserver((mutationsList, observer) => {
  //     console.log(`The DOM has changed!`, mutationsList);
  // }

  // Start observing the whole document for changes to child elements and subtree
  // observer.observe(document.body, { childList: true, subtree: true });
  // console.log(observer);

  if (listContainer.children.length === 0) {
    console.log('No todo items present!');
    addTodo();
    console.log(`Todo items have been added and should now be present`);
  }
} 

// Saves the to-do list to local storage so it doesn't disappear
function saveTodoList() {
  // Declare an array where I'll store the to-do list object
  const todoArray = [];
  // Selects the list where the content would be and stores it in a nodelist
  const todoItems = listContainer.querySelectorAll('li');

  // For each item in the nodelist, pushes/stores its content in the todoArray
  // and whether it's checked or not
  todoItems.forEach(li => {
    const text = li.querySelector('.editable-input').textContent.trim();
    const checked = li.classList.contains('checked');
    todoArray.push({text, checked});
    console.log(`List Element has been pushed into the todoArray`);
  });
  
  // Stores it in local storage with JSON.stringify
  localStorage.setItem('todoList', JSON.stringify(todoArray));
  console.log(`saveTodoList() - todoArray has been stored in 'todoList' local storage`);
}

// Every time the page refereshes, it adds a new to-do text area,
// if the there is currently no text area.
// Saves this state so it doesn't have to do it every time
document.addEventListener('DOMContentLoaded', () => {
  startTodo();
  // saveTodoList();  
  console.log(`Event listener DOM Content Loaded has run all 2 functions`);
});

// Adds event listener to the plus button for the addTodo()
addnewListButton.addEventListener('click', () => {
  addTodo();
  saveTodoList();
  console.log(`Add New List Button has run all 2 functions`);
});

// When I edit the content of the .editable-input div, it saves
// listContainer.addEventListener('input', event => {
//   // Target returns object to the listContainer when 'input'/event happens
//   // If I input anything, it saves it to the local storage
//   if (event.target.classList.contains('editable-input')) {
//     saveTodoList();
//     console.log(`Edit input detected and has been saved`);
//   }
// });

listContainer.addEventListener('click', event => {
  // Target returns the save function if I click the check-toggle and it's present
  // If I activate the trash-button to delete things, it also saves.
  if (event.target.classList.contains('check-toggle') || event.target.closest('.trash-button')) {
    saveTodoList();
  }
});

function loadTodoList() {
  // Loads the todoList JSON object array from local stroage and parse its contents if it has any
  // Otherwise, give it an empty array
  const todoArray = JSON.parse(localStorage.getItem('todoList') || '[]');
  console.log(`loadToDoList() - JSON has been parsed into todoArray`);

  // If we want to edit its innerHTML, we gotta make it empty
  // Otherwise it'll build on top of it
  listContainer.innerHTML = '';

  // For each item loaded on the todo, store them in a list
  todoArray.forEach(todo => {
    let li = document.createElement('li');
    li.innerHTML = `
      <span class="check-toggle"></span>
      <div class="editable-input" contenteditable="true" role="textbox" aria-multiline="true"></div>
      <button class="trash-button"><img id="trash-icon" src="./icons/trash.png" alt="Delete Task"></button>
    `;
    li.classList.add('todo-item');
    if (todo.checked) { // If its checked, add the CSS to it
      li.classList.add('checked');
    }
    listContainer.append(li);
    console.log(`listContainer has been appended with List Element`);

    // Adding the same event listeners because for some reason it's not already added?
    const editableInput = li.querySelector('.editable-input');
    editableInput.textContent = todo.text;
    editableInput.addEventListener('input', saveTodoList);
    console.log(`To-do list edit has been saved`);

    // Saves the list when I press Enter instead of creating a new <br>
    editableInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevents <br> from being created
        editableInput.blur();
        saveTodoList();
        console.log('Enter pressed: text saved!');
      }
    });

    // Adds event listener to every trash button
    const deleteBtn = li.querySelector('.trash-button');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTodoList();
    });
  });

  // Ensures there's always one to-do text area
  if (listContainer.children.length === 0) {
    addTodo();
  }
}

// When the DOM loads, run the loadtodoList function
document.addEventListener('mainPageLoaded', loadTodoList);

// When the DOM loads, run the loadtodoList function
document.addEventListener('DOMContentLoaded', loadTodoList);

// After five seconds, if you still don't got a list, it will automatically add one for you
setInterval(() => {
  if (listContainer.children.length === 0) addTodo();
}, 10000);

// Listens for a keydown combo of Shift+A
document.addEventListener('keydown', function(event) {
  if (event.key === 'A' && event.shiftKey && event.altKey) {
    addTodo();

    // After adding, select the last editable input and focus it
    const todoItems = document.querySelectorAll('.todo-item');
    if (todoItems.length > 0) {
      const lastItem = todoItems[todoItems.length - 1];
      const editableInput = lastItem.querySelector('.editable-input');
      if (editableInput) {
        editableInput.focus();
      }
    } else {
      console.log("No items found.");
    }
  }
});
