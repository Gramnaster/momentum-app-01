// Declaration of initial state of the buttons
const foldButton = document.getElementById('fold-down-button');
const foldButtonIcon = document.getElementById('fold-down-icon');

// Declaration of the new state of icons
// const foldUpButton = document.getElementById('fold-up-button');
// const foldUpButtonIcon = document.getElementById('fold-up-icon');

// Declaration of the container so I can change it's height
const focusTdContainer = document.getElementById('main-focus-todo-container');

// foldButton.addEventListener('click', () => {
//   console.log(`Fold Down Button pressed.`);
//   if (this.id === 'fold-down-button') {
//     focusTdContainer.style.height = '3%';
//     foldButtonIcon.src = './icons/press-up.png';
//     foldButtonIcon.id = 'fold-up-button';
//     this.id = 'fold-up-button';
//     document.getElementById('main-focus-content').classList.add('hidden');
//     document.getElementById('main-todo-title-container').classList.add('hidden');
//     document.getElementById('main-todo-list-children').classList.add('hidden');
//     document.getElementById('main-todo-shortcut').classList.add('hidden');
//     console.log(`To Do List has been folded down`);
//   } else {
//     focusTdContainer.style.height = '60%';
//     foldButtonIcon.src = './icons/press-down.png';
//     foldButtonIcon.id = 'fold-down-icon';
//     this.id = 'fold-down-button';
//     document.getElementById('main-focus-content').classList.remove('hidden');
//     document.getElementById('main-todo-title-container').classList.remove('hidden');
//     document.getElementById('main-todo-list-children').classList.remove('hidden');
//     document.getElementById('main-todo-shortcut').classList.remove('hidden');
//     console.log(`To Do List has been opened.`);
//   }
// });

// Checks if elements are found
if (foldButton && foldButtonIcon && focusTdContainer) {
  foldButton.addEventListener('click', function() { 
    console.log(`Button clicked. Current button id: ${this.id}`); // 'this' now refers to foldButton

    if (this.id === 'fold-down-button') {
      // Collapse action
      focusTdContainer.style.height = '3%';
      foldButtonIcon.src = './icons/press-up.png';
      foldButtonIcon.id = 'fold-up-icon';
      this.id = 'fold-up-button'; 

      // Add 'hidden' class to relevant elements
      document.getElementById('main-focus-content')?.classList.add('hidden');
      document.getElementById('main-todo-title-container')?.classList.add('hidden');
      document.querySelector('.main-todo-list-children')?.classList.add('hidden');
      document.getElementById('main-todo-shortcut')?.classList.add('hidden');

      console.log(`To Do List has been folded down`);
    } else if (this.id === 'fold-up-button') {
      // Expand the list size
      focusTdContainer.style.height = '60%';
      foldButtonIcon.src = './icons/press-down.png';
      foldButtonIcon.id = 'fold-down-icon';
      this.id = 'fold-down-button';

      // Remove 'hidden' class
      document.getElementById('main-focus-content')?.classList.remove('hidden');
      document.getElementById('main-todo-title-container')?.classList.remove('hidden');
      document.querySelector('.main-todo-list-children')?.classList.remove('hidden');
      document.getElementById('main-todo-shortcut')?.classList.remove('hidden');

      console.log(`To Do List has been opened.`);
    } else {
      // Error handling for wrong ID for some reason
      console.warn(`Button has an unexpected ID: ${this.id}`);
    }
  });
} else {
  // Log errors if essential elements are not found
  if (!foldButton) console.error("Error: fold-down-button not found.");
  if (!foldButtonIcon) console.error("Error: fold-down-icon not found.");
  if (!focusTdContainer) console.error("Error: main-focus-todo-container (or similar) not found.");
}

// function hideTodoList() {
//   focusTdContainer.style.height = '2%';
// }

// foldDwnButton.addEventListener('click', () => {
//   focusTdContainer.style.height = '2%';
//   foldButtonIcon = document.getElementById('fold-down-icon').src = './icons/press-up.png';
//   foldButtonIcon.id = 'fold-up-icon';
//   foldDwnButton.id = 'fold-up-button';
//   console.log(foldButtonIcon + foldDwnButton);
// });

// foldUpButton.addEventListener('click', () => {
//   focusTdContainer.style.height = '80%';
//   foldUpButtonIcon = document.getElementById('fold-up-icon').src = './icons/press-down.png';
//   foldUpButtonIcon.id = 'fold-down-icon';
//   foldUpButton.id = 'fold-down-button';
//   console.log(foldUpButtonIcon + foldUpButton);
// });