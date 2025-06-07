console.log('focus.js loaded');

// Var declaration from DOM
const focusBtn = document.getElementById('focus-button');
const focusContainer = document.getElementById('main-focus-content');

// When you press the edit button, it makes the focus editable
// Automatically pushes the user to type inside
focusBtn.addEventListener('click', () => {
  focusContainer.setAttribute('contenteditable', 'true');
  focusContainer.focus();
  console.log(`Focus area can now be edited.`);
});

function saveFocus() {
  // Variable declaration to get text content of focusContainer
  // This text content is then stringified into JSON to prepare for storage
  const focusTxt = focusContainer.textContent.trim();
  const focusTxtJSON = JSON.stringify(focusTxt);

  // If there is no error, attempts to save the JSON file to local storage
  try {
    localStorage.setItem('focusData', focusTxtJSON);
    console.log(`Focus has been saved to Local Storage: ${focusTxtJSON}`);
    console.log('Saved:', localStorage.getItem('focusData'));
    return true;
  } catch (error) {
    console.error(`Error saving Focus to local storage: ${error}`);
    alert(`Error saving Focus to local storage. Local storage could be disabled or full.`);
    return false;
  }
}

// Loads focus from JSON to a variable
function loadFocus() {
  const storedFocusTxtJSON = localStorage.getItem('focusData');
  if (storedFocusTxtJSON) {
    try {
    const storedFocus = JSON.parse(storedFocusTxtJSON);
    console.log(`Retrieved focus from Local Storage:`, storedFocus);
    return storedFocus;
  } catch (error) {
    console.error(`Error parsing focus from Local Storage: ${error}`);
  }
  } else {
    console.log(`No focus found in Local Storage.`);
  }
}

// If you press enter while in the Focus textarea, it will save
focusContainer.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    focusContainer.blur(); // Stops user from editing div since it loses focus
    saveFocus();
    console.log(`Focus has been saved!`);
    focusContainer.setAttribute('contenteditable', 'false')
  }
});

// When the main page loads, it will load the focus and display it
document.addEventListener('mainPageLoaded', () => {
  console.log('mainPageLoaded event received in focus.js');
  const focusTxtContent = loadFocus();
  // focusContainer.innerHTML = "";
  focusContainer.textContent = focusTxtContent || "";

  console.log(localStorage);
  console.log(`loadFocus has received focus text: ${focusTxtContent}`);
  console.log(localStorage.getItem(`focusData`));
  console.log('Loaded:', focusTxtContent);

  // console.log('focusTxtContent:', focusTxtContent);

  // console.log('mainPageLoaded event received in focus.js');
  // console.log('focusContainer:', focusContainer);
  // const focusTxtContent = loadFocus();
  // console.log('focusTxtContent:', focusTxtContent);
  // focusContainer.textContent = focusTxtContent || "";

  // const focusTxtContent = loadFocus();
  // alert('Loaded: ' + focusTxtContent);
  // focusContainer.textContent = focusTxtContent || "";
});

// When the main page loads, it will load the focus and display it
document.addEventListener('DOMContentLoaded', () => {
  console.log('mainPageLoaded event received in focus.js');
  const focusTxtContent = loadFocus();
  // focusContainer.innerHTML = "";
  focusContainer.textContent = focusTxtContent || "";

  console.log(localStorage);
  console.log(`loadFocus has received focus text: ${focusTxtContent}`);
  console.log(localStorage.getItem(`focusData`));
  console.log('Loaded:', focusTxtContent);

  // console.log('focusTxtContent:', focusTxtContent);

  // console.log('mainPageLoaded event received in focus.js');
  // console.log('focusContainer:', focusContainer);
  // const focusTxtContent = loadFocus();
  // console.log('focusTxtContent:', focusTxtContent);
  // focusContainer.textContent = focusTxtContent || "";

  // const focusTxtContent = loadFocus();
  // alert('Loaded: ' + focusTxtContent);
  // focusContainer.textContent = focusTxtContent || "";
});

console.log('Saved:', localStorage.getItem('focusData'));
// console.log('Loaded:', focusTxtContent);

// Listens for a keydown combo of Shift+A
document.addEventListener('keydown', function(event) {
  if (event.key === 'F' && event.shiftKey && event.altKey) {
    focusContainer.setAttribute('contenteditable', 'true');
    focusContainer.focus();
    console.log(`Focus area can now be edited.`);
  }
});