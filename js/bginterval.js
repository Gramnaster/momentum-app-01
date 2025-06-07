const backgrounds = [
  'url("/curr_bg/bg2.jpg")', 
  'url("/curr_bg/bg3.jpg")',  
  'url("/curr_bg/bg4.jpg")',  
  'url("/curr_bg/bg5.png")',   
  'url("/curr_bg/bg6.png")',  
  'url("/curr_bg/bg7.png")',
];

const backgroundsDescription = [
  'BG 02: Above Earth Orbit',
  'BG 03: Ceres Belt', 
  'BG 04: Jupiter',
  'BG 05: Rings of Saturn 01',
  'BG 06: Rings of Saturn 02',
  'BG 07: Destiny Planet',
];

// Set the starting index to match your initial background
let currentBgIndex = 3; 
const mainPage = document.getElementById('main-page');
const mainBGText = document.getElementById('main-bg-text');

// Milliseconds that must match the CSS transition time
const transitionDuration = 1000; 

// Time between background changes (10 seconds)
const intervalTime = 10000;     
let bgInterval; 

// Declare button DOMs
const mainFwdButton = document.getElementById('main-fwd-bg-button');
const mainBackButton = document.getElementById('main-back-bg-button');

// Function to preload an image to prevent flickering on first display
function preloadImage(url) {
  // Extract the actual URL from the "url(...)" CSS string
  const imageUrl = url.replace(/^url\(['"]?(.*?)['"]?\)$/, '$1');
  if (imageUrl) {
    const img = new Image();
    img.src = imageUrl;
  }
}

// Preload all background images when the script runs
backgrounds.forEach(preloadImage);

// Initial setup
mainPage.style.backgroundImage = backgrounds[currentBgIndex];
mainPage.style.setProperty('--main-bg-overlay', backgrounds[currentBgIndex]);

function cycleBackground() {
  // Determine the next background image index
  // currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
  // const newBgUrl = backgrounds[currentBgIndex];
  // Wrap index if out of bounds
  if (currentBgIndex < 0) currentBgIndex = backgrounds.length - 1;
  if (currentBgIndex >= backgrounds.length) currentBgIndex = 0;
  const newBgUrl = backgrounds[currentBgIndex];

  // Set the new background image on the #main-page element itself.
  mainPage.style.backgroundImage = newBgUrl;
  console.log(`Background has begun transitioning.`);

  // Add the 'fade-out-old' class to #main-page.
  mainPage.classList.add('fade-out-old');

  // After the ::before pseudo-element has faded out 
  setTimeout(() => {
    // Now the #main-page element (with newBgUrl) is visible.
    mainPage.style.setProperty('--main-bg-overlay', newBgUrl);
    // Remove the 'fade-out-old' class. This will make ::before (now with newBgUrl)
    mainPage.classList.remove('fade-out-old');
  }, transitionDuration);

  mainBGText.textContent = backgroundsDescription[currentBgIndex];

  
  console.log(`Background has fully transitioned`);
}

// This is the function that our timer will call every 10 seconds.
function runAutomaticCycle() {
  console.log("Automatic timer fired.");
  currentBgIndex++;
  cycleBackground();
}

// The new one will correctly call our automatic cycle function.
function resetInterval() {
  clearInterval(bgInterval);
  bgInterval = setInterval(runAutomaticCycle, intervalTime);
  console.log(`Background timer has been reset. Next auto-change in ${intervalTime / 1000}s.`);
}

// Start the interval to change backgrounds
// setInterval(() => {
//   currentBgIndex++;
//   cycleBackground();
//   resetInterval();
//  }, intervalTime);

//When you click the right button, it moves forward and increases the BG index
mainFwdButton.addEventListener('click', () => {
  currentBgIndex++;
  cycleBackground();
  resetInterval();
  console.log(`Forward bg button has been pressed`);
});

//When you click the left button, the BG moves back and decreases the BG index
mainBackButton.addEventListener('click', () => {
  currentBgIndex--;
  cycleBackground();
  resetInterval();
  console.log(`Back bg button has been pressed`);
});

bgInterval = setInterval(runAutomaticCycle, intervalTime);
console.log(`Initial background timer started. First auto-change in ${intervalTime / 1000}s.`);

