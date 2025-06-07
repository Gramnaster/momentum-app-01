console.log(`ReloadForm.js has loaded`);

// Add .hidden to main-page
// Remove .hidden from intro-page

const logoutButton = document.getElementById('logout-button');
const introPage = document.getElementById('intro-page');
const mainPage = document.getElementById('main-page');

logoutButton.addEventListener('click', () => {
  if (!logoutButton) {
    console.warn(`Could not find logout button element`);
    return false;
  }
  console.log(`Logout button is present`);

  mainPage.addEventListener('transitionend', () => {
     // Activates intro-page
    mainPage.classList.add('d-none');
    introPage.classList.remove('d-none');
    setTimeout(() => {
      introPage.classList.remove('page-hidden');
      introPage.classList.add('page-active');
    }, 20);
  }, {once: true});
  
  // Disables main-page
  mainPage.classList.remove('page-active');
  mainPage.classList.add('page-hidden');
  console.log(`Intro page has been loaded`);

});