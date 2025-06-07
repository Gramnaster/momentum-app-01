
// let options = {
//   weekday: "long", year: "numeric", month: "short",
//   day: "numeric", hour: "2-digit", hour12: false, minute: "2-digit"
// };

// new Intl.DateTimeFormat("en-PH", {
//   dateStyle: "full",
//   timeStyle: "long",
//   timeZone: "Philippines",
//   hour12: false,
// }).format(date)


// console.log(date.toLocaleTimeString("en-GB", options));

// Gets time display element
const dateDisplayElement = document.getElementById('intro-day-date');
const timeDisplayElement = document.getElementById('intro-time-display');

const mainDateDisplayElement = document.getElementById('main-day-date');
const mainTimeDisplayElement = document.getElementById('main-time-display');

// Time settings
const intervalTime = 1000;

function validateTimer() {
  // Checks if all inputs are present. Returns if missing.
  if (!dateDisplayElement || !timeDisplayElement) {
    console.warn('Could not find one or more elements: intro-day-date or intro-time-display');
    return false;
  }
  console.log(`All main time components have loaded`);
  return true;
}

// When the DOM loads, it validates the timer and ensures it has content.
document.addEventListener("DOMContentLoaded", validateTimer);

// Shows clock function
function showTime() {
  const date = new Date();
  const weekday = date.toLocaleString("en-PH", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("en-PH", { month: "short" });

  let currentDate = (`${weekday}, ${day} ${month}`);

  // Intro Page Date Display Element
  if (dateDisplayElement) {
    dateDisplayElement.innerHTML = currentDate;
  } else {
    console.error(`Huge issue, mate! 'intro-day-date' not found`);
  }

  // Main Page Date Display Element
  if (mainDateDisplayElement) {
    mainDateDisplayElement.innerHTML = currentDate;
  } else {
    console.error(`Light issue, mate! 'main-day-date' not found`);
  }

  let hour = date.getHours();
  let min = date.getMinutes();
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;

  // console.log(hour);

  let currentTime = (`${hour}:${min}`);

  // Intro Page Time Display Element
  if (timeDisplayElement) {
    timeDisplayElement.innerHTML = currentTime;
  } else {
    console.error(`Element ID 'intro-time-display' not found`);
  }

  // Main Page Time Display Element
  if (mainTimeDisplayElement) {
    mainTimeDisplayElement.innerHTML = currentTime;
  } else {
    console.error(`Element ID 'intro-time-display' not found`);
  }

  // console.log(`showTime function is running properly`);
  return hour;
}

// Changes greeting based on the hour
function showGreetingTime() {
  const mainGreeting = document.getElementById('main-greeting');
  // const date = new Date();
  let hour = showTime();
  // console.log(`showGreetingTime: ${hour}`);
  
  if (hour >= 0 && hour < 12) {
    // let dayGreeting = 'Good Morning,';
    mainGreeting.innerHTML = 'Good Morning,';
    // console.log(`It's morning. Greeting adjusted to Day.`);
  } else if (hour >= 12 && hour < 18) {
    // let noonGreeting = 'Good Afternoon,';
    mainGreeting.innerHTML = 'Good Afternoon,';
    // console.log(`It's afternoon. Greeting adjusted to Noon.`);
  } else if (hour >= 18) {
    // let eveGreeting = 'Good Evening,';
    mainGreeting.innerHTML = 'Good Evening,';
    // console.log(`It's evening. Greeting adjusted to Evening.`);
  } else {
    console.error(`Invalid time unit. No greeting`);
  }
  
  // console.log(`showGreetingTime is running properly.`);
}

showTime();
setInterval(showTime, intervalTime);
showGreetingTime();
setInterval(showGreetingTime, intervalTime);