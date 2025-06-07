console.clear();

// If you want to import / export...
// You need to use Windows

// Variable declarations of forms with DOM
const firstNameInput = document.getElementById('form-first-name');
const lastNameInput = document.getElementById('form-last-name');
const continueButton = document.getElementById('continue-button');
const bypassButton = document.getElementById('bypass-button');

// Validates page to ensure all the important components are present
function validateForm() {
  // Checks if all inputs are present. Returns if missing.
  if (!firstNameInput || !lastNameInput || !continueButton) {
    console.warn(`Could not find one or more elements: firstNameInput, lastNameInput, or continueButton`);
    return false;
  }
  console.log(`All main form components have loaded`);
  return true;
}

// When the DOM loads, it validates the page and ensures it has content.
document.addEventListener('DOMContentLoaded', validateForm);

// Entire function saves user details, but can only be done after pressing continue button
function saveUserDetails() {
  // Gets the input from the forms
  const firstName = firstNameInput.value.trim(); 
  const lastName = lastNameInput.value.trim();

  // Checks if the fields are filled in. Returns if missing.
  if (firstName === '' || lastName === '' || !firstName || !lastName) {
    alert(`Please fill both your first name and last name`);
    return false;
  }
  console.log(`Fields should be filled otherwise you wouldn't see this`);

  // Once all elements are present, allow to save user details.
  const userDetails = {
    firstName: firstName,
    lastName: lastName,
  };
  console.log(`userDetails should be stored to userDetails object at this point`);

  // Convert object to a JSON string to start saving process into JSON file
  const userDetailsJSON = JSON.stringify(userDetails);

  // If there is no error, it saves the file into JSON / Local Storage
  try {
    localStorage.setItem('userDetails', userDetailsJSON);
    console.log(`User details saved to Local Storage: ${userDetailsJSON}`);
    console.log(`Names saved! First Name: ${firstName} Last Name: ${lastName}`);
    return true;
  } catch (error) {
    console.error(`Error saving to Local Storage: ${error}`);
    alert(`Sorry, error saving your details. Local Storage might be disabled or full.`);
    return false;
  }

}

// Loads user details from JSON to an object
export function loadUserDetails() {
  const storedUserDetailsJSON = localStorage.getItem(`userDetails`);
  if (storedUserDetailsJSON) { // Verifies that the storage has content
    try { // Converts the JSON back to object
      const storedUserDetails = JSON.parse(storedUserDetailsJSON);
      console.log(`Retrieved user details from Local Storage:`, storedUserDetails);
      return storedUserDetails;
  } catch (error) {
    console.error(`Error parsing user details from Local Storage: ${error}`);
  } 
  } else { // If no details are found in local storage
    console.log(`No user details found in Local Stoarge.`);
  }
}

// Shows the main page by adding .hidden
// function showMainPage() {
//   document.getElementById('intro-page').classList.add('hidden');
//   document.getElementById('main-page').classList.remove('hidden');
//   loadUserDetails();
//   console.log(`showMainPage has loaded successfully`);
// }

function showMainPage() {
  const introPage = document.getElementById('intro-page');
  const mainPage = document.getElementById('main-page');
  introPage.addEventListener('transitionend', () => {
    // introPage.style.display = 'none';

    // Fully disables the intro page
    introPage.classList.add('d-none'); 

    // Now, prepare the main page to be faded in.
    // First, make it visible but still transparent.
    mainPage.classList.remove('d-none');
    // Slight delay for transition
    setTimeout(() => {
      // Switches out the content
      mainPage.classList.remove('page-hidden');
      mainPage.classList.add('page-active');
    }, 20);
    
  }, {once: true}); // Removes auto-listener;
  
  // Disables intro page
  introPage.classList.remove('page-active');
  introPage.classList.add('page-hidden');

}

// Loads the main page by saving the inputted user details,
// loads it for use in the next main page,
// then shows the main page by hiding the first page.
function loadMainPage() {
  const pageLoadedTrue = validateForm();
  const detailsSavedTrue = saveUserDetails();

  // If no details are saved, do not proceed.
  if (pageLoadedTrue && detailsSavedTrue) {
    showMainPage();
    console.log(`loadMainPage has loaded successfully`);
    // Dispatch this event when the main page is loaded so I could activate the loadUser.js functions
    document.dispatchEvent(new Event('mainPageLoaded'));
  }
}

// Used to bypass the first page
function fastLoadMainPage() {
  const pageLoadedTrue = validateForm();
  const userDetailsTrue = loadUserDetails();

  // Gets the input from the forms
  const firstName = firstNameInput.value.trim(); 
  const lastName = lastNameInput.value.trim();

  // If you have content on the form's names, do not load
  if (pageLoadedTrue && firstName && lastName) {
    alert(`Login cannot be bypassed. You already have a name typed.`);
    console.log(`fastLoadMainPage has failed to load.`);
    return false;
  }

  // If you do not have saved user details, you cannot bypass
  if (pageLoadedTrue && !userDetailsTrue) {
    alert(`Login cannot be bypassed. Register your First Name and Last Name.`);
    console.log(`fastLoadMainPage has failed to load.`);
    return false;
  }

  // If no details are saved, do not proceed.
  if (pageLoadedTrue && userDetailsTrue) {
    showMainPage();
    console.log(`fastLoadMainPage has loaded successfully`);
    alert(`Login bypassed. Using previously stored User Details.`);
    // Dispatch this event when the main page is loaded so I could activate the loadUser.js functions
    document.dispatchEvent(new Event('mainPageLoaded'));
  }
}

// The continue button loads the main page by
// Saving the user details from object to JSON then
// Showing the main page, which also loads the user details
// from JSON to object. Hides the intro-page and shows main-page.
continueButton.addEventListener('click', loadMainPage);
bypassButton.addEventListener('click', fastLoadMainPage);


