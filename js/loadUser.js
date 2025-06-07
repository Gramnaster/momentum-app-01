import {loadUserDetails} from './script.js';

function startLoadDetails() {
  // Store userDetails into a variable to be used in this script
  const storedUserDetails = loadUserDetails();
  console.log(loadUserDetails());

  // Loads all the user details.
  const firstName = storedUserDetails.firstName;
  const lastName = storedUserDetails.lastName;
  console.log(`${firstName} + ${lastName}`);

  // Sets the contents of the loaded user details into the greeting text content
  const nameTextbox = document.getElementById("main-name");
  nameTextbox.innerHTML = "";
  nameTextbox.textContent = `${firstName} ${lastName}`;

  // Console display to verify userDetails content
  // console.log('loadUser.js received user details:', storedUserDetails);
  // console.log(localStorage); // Shows all keys and values
  console.log(localStorage.getItem('userDetails')); // Shows the value for 'userDetails'
}

// This code runs after loadMainPage() completes and main page is shown
document.addEventListener('mainPageLoaded', startLoadDetails);

// This code runs after loadMainPage() completes and DOM Content Resets
document.addEventListener('DOMContentLoaded', startLoadDetails);


