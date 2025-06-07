document.addEventListener('DOMContentLoaded', function() {
  let quoteList = [
    {quote: 'Do or do not, there is no try.',
      author: 'Yoda, Star Wars Ep 7: Empire Strikes Back'},
    {quote: 'Live long, and prosper.',
      author: 'Spock, Star Trek'},
    {quote: 'It is possible to commit no errors and still lose. That is not a weakness. That is life.',
      author: 'Captain Jean-Luc Picard, Star Trek'},
    {quote: 'You can use logic to justify almost anything. That is its power. And its flaw.',
      author: 'Captain Cathryn Janeway, Star Trek'},
    {quote: 'When you eliminate the impossible, whatever remains, however improbable, must be the truth',
      author: 'Spock, Star Trek'},
    {quote: "Space - the final frontier. It's five-year mission: to boldly go where no one has ever gone before.",
      author: 'Captain James T. Kirk, Star Trek: TOS'},
    ];
  
  // DOM declarations
  const quoteText = document.getElementById('main-quote');
  const quoteAuthor = document.getElementById('main-author');

  // Initial settings
  let intervalTime = 10000; // Milliseconds
  let currentQuoteIndex  = 0;
  // Holds interval so we can reset it when we switch quotes;
  let quoteInterval;

  // Function that sets the actual quote
  function displayQuote(index) {
    if (!quoteList || quoteList.length === 0) {
      quoteText.innerHTML = 'Add a quote to get started!';
      quoteAuthor.innerHTML = 'Your Library';
      return;
    }

    // Ensure index is valid
    const quote = quoteList[index];
    if (!quote) {
      console.error(`Invalid index ${index} for quoteList of length ${quoteList.length}`);
      return;
    }

    // Sets transition for when the quote transitions to another
    quoteText.classList.add('fade-quote');
    quoteAuthor.classList.add('fade-quote');

    // Supposedly helps it transition even better, but I don't notice it
    setTimeout(() => {
      quoteText.innerHTML = quote.quote;
      quoteAuthor.innerHTML = quote.author;
      quoteText.classList.remove('fade-quote');
      quoteAuthor.classList.remove('fade-quote');
    }, 150);
  }

  // Sets the quote on the HTML
  // function setQuote() {
  //   loadQuoteAuthor();
    
  //   console.log(`setQuote() should be running by now`);
  //   if (!quoteText || !quoteAuthor) { // Forces return if it can't find shit
  //     console.log(`Can't find elements quoteText and quoteAuthor`);
  //     return;
  //   } 

  //   // Fade out
  //   quoteText.classList.add('fade-quote');
  //   quoteAuthor.classList.add('fade-quote');

  //   setTimeout(() => {
  //     // Changes the text's content
  //     quoteText.innerHTML = '';
  //     quoteAuthor.innerHTML = '';
  //     quoteText.innerHTML = quoteList[quoteIndex].quote;
  //     quoteAuthor.innerHTML = quoteList[quoteIndex].author;

  //     // Fade in
  //     quoteText.classList.remove('fade-quote');
  //     quoteAuthor.classList.remove('fade-quote');
  //     }, 150);

  //   console.log(`Quotes should have been set by now`);
  //   // console.log(quoteText);
  //   // console.log(quoteAuthor);

  //   // Increments to prepare loading the next quote
  //   quoteIndex++;

  //   if (quoteIndex >= quoteList.length) {
  //     quoteIndex = 0;
  //   }

  //   return quoteIndex;
  // }

  // function to show next quote
  function showNextQuote() {
    if (quoteList.length === 0) return;
    
    currentQuoteIndex++;
    if (currentQuoteIndex >= quoteList.length) {
      currentQuoteIndex = 0; // Loop back to the start of Quote List
    }
    displayQuote(currentQuoteIndex);
  }

  // Resets intervals when we interact with it
  function resetInterval() {
    clearInterval(quoteInterval);
    quoteInterval = setInterval(showNextQuote, intervalTime);
  }

  // DOM button declarations
  const randomiseButton = document.getElementById('randomise-quotes-button');
  const addQuotesButton = document.getElementById('add-quotes-button');
  const minusQuotesButton = document.getElementById('minus-quotes-button');

  // DOM quote-author editable section declarations
  const quoteAuthorForm = document.getElementById('main-quote-author-form');
  const quoteInput = document.getElementById('main-quote-input');
  const authorInput = document.getElementById('main-author-input');
  const saveQuotesButton = document.getElementById('save-quotes-button');
  const cancelQuotesButton = document.getElementById('cancel-quotes-button');

  // Randomising the quotes displayed, ensuring that you get a different quote each time
  randomiseButton.addEventListener('click', () => {
    if (quoteList.length < 2) return; // Can't randomize 1 or 0 items
    
    let newIndex;
    // While the condition is met, perform the randomisation
    // This ensures you will always get another one
    do {
      newIndex = Math.floor(Math.random() * quoteList.length);
    } while (newIndex === currentQuoteIndex); // Ensure we get a different quote
    
    // Resets timer when we randomise it
    currentQuoteIndex = newIndex;
    displayQuote(currentQuoteIndex);
    resetInterval();
  });

  // Adds a new quote by enabling the forms for us to fill in.
  addQuotesButton.addEventListener('click', () => {
    // Hides an entire chunk so I could add a new quote + author
    quoteText.classList.add('hidden');
    quoteAuthor.classList.add('hidden');
    randomiseButton.classList.add('hidden');
    addQuotesButton.classList.add('hidden');
    minusQuotesButton.classList.add('hidden');

    // Removes hidden from the hidden class so they would show up
    quoteAuthorForm.classList.remove('hidden');
    saveQuotesButton.classList.remove('hidden');
    cancelQuotesButton.classList.remove('hidden');

    quoteInput.innerHTML = '';
    authorInput.innerHTML = '';

    // Resets timer every time
    resetInterval();
  });
  
  minusQuotesButton.addEventListener('click', () => {
    if (quoteList.length === 0) {
      alert("There are no quotes to delete.");
      return;
    }
      
    const confirmDelete = confirm("Are you sure you want to delete this quote?");
    if (!confirmDelete) return;

    // The logic is now simple: the index to delete IS the current index.
    const indexToDelete = currentQuoteIndex;
    
    console.log(`Attempting to delete quote at index: ${indexToDelete}`);
    quoteList.splice(indexToDelete, 1);
    
    // Save the new, shorter list to storage.
    localStorage.setItem('quoteList', JSON.stringify(quoteList));
    console.log(`Quote list saved after deletion.`);

    // After deleting, the array is smaller. We must adjust the index to avoid errors.
    // If the index is now out of bounds, loop back to the start.
    if (currentQuoteIndex >= quoteList.length) {
      currentQuoteIndex = 0;
    }

    // Display the new quote that has shifted into the current index.
    displayQuote(currentQuoteIndex);
    
    // Reset the timer so the user gets a full 10 seconds before the next change.
    resetInterval();
  });

  
  // Adds a randomise button that changes which quote index loads
  // randomiseButton.addEventListener('click', () => {
  //   const oldQuoteIndex = setQuote();
  //   console.log(`This is the old quote index: ${oldQuoteIndex}`);

  //   quoteIndex = Math.floor(Math.random() * (quoteList.length+1));
  //   console.log(`This is the quote index: ${quoteIndex}`);

  //   if (quoteIndex === oldQuoteIndex) {
  //     quoteIndex++;
  //     console.log(`This is the adjusted quote index: ${quoteIndex}`);
  //   }

  //   setQuote();
  // });

  // minusQuotesButton.addEventListener('click', () => {
  //   const confirmDelete = confirm("Are you sure you want to delete this quote?");
  //   if (!confirmDelete) {
  //     return; // User clicked "No"
  //   }

  //   let indexToDelete;
  //   if (quoteIndex === 0) {
  //     // If the next quote is index 0, the current one is the last in the array.
  //     indexToDelete = quoteList.length - 1;
  //   } else {
  //     // Otherwise, the current quote is simply the one before the "next" index.
  //     indexToDelete = quoteIndex - 1;
  //   }

  //   console.log(`Attempting to delete quote at index: ${indexToDelete}`);

  //   // const currentIndex = setQuote();
  //   // console.log(`Current Index is ${currentIndex}`);
  //   // const quoteToRemove = quoteList.splice(currentIndex, 1);
  //   // console.log(`Quote ${quoteToRemove} has been removed`);

  //   const removedQuote = quoteList.splice(indexToDelete, 1)[0];
  
  //   if (removedQuote) {
  //     console.log(`Successfully removed quote: "${removedQuote.quote}"`);
  //   }

  //   // After deleting, the quoteIndex might be out of bounds if we deleted the last item.
  //   // It's safest to reset it if necessary.
  //   if (quoteIndex > indexToDelete) {
  //       quoteIndex--;
  //   }
  //   if (quoteIndex >= quoteList.length) {
  //     quoteIndex = 0;
  // }

  //   localStorage.setItem('quoteList', JSON.stringify(quoteList));
  //   console.log(`Quote removal has been stored in 'quoteList' local storage.`);
  //   setQuote();
  // });

  // Saves quotes
  function saveQuotes() {
    // Gets text content of existing quotes and author
    const quoteInputContent = quoteInput.textContent.trim();
    const authorInputContent = authorInput.textContent.trim();

    quoteList.push({
      quote: quoteInputContent,
      author: authorInputContent
    });

    console.log(`${quoteInputContent} and ${authorInputContent} has been saved to quoteList`);

    localStorage.setItem('quoteList', JSON.stringify(quoteList));
    console.log(`saveQuotesButton - has been stored in 'quoteList' local storage.`);
  }

  function offQuoteAuthorForm() {
    // Turns all the forms hidden and switches out the current quotes
    quoteAuthorForm.classList.add('hidden');
    saveQuotesButton.classList.add('hidden');
    cancelQuotesButton.classList.add('hidden');

    quoteText.classList.remove('hidden');
    quoteAuthor.classList.remove('hidden');
    randomiseButton.classList.remove('hidden');
    addQuotesButton.classList.remove('hidden');
    minusQuotesButton.classList.remove('hidden');
    
    // resetInterval();
  }

  saveQuotesButton.addEventListener('click', () => {
    // Gets text content of existing quotes and author
    const quoteInputContent = quoteInput.textContent.trim();
    const authorInputContent = authorInput.textContent.trim();
    
    // If the input is empty, prevent it from being saved
    if (!quoteInputContent || !authorInputContent) {
      alert(`Quotes or author is missing. Please fill it up.`);
      return false;
    } 
    
    // If all input is present, save the quote
    saveQuotes();
    offQuoteAuthorForm();
    // resetInterval();
  });

  cancelQuotesButton.addEventListener('click', () => {
    const quoteInputContent = quoteInput.textContent.trim();
    const authorInputContent = authorInput.textContent.trim();

    quoteInputContent.textContent = '';
    authorInputContent.textContent = '';
    offQuoteAuthorForm();
  });  

  function loadQuoteAuthor() {
    const storedQuotes = localStorage.getItem('quoteList');
    if (storedQuotes) {
      const parsedQuotes = JSON.parse(storedQuotes);
      if (parsedQuotes.length > 0) {
        quoteList = parsedQuotes;
      }
    }
    console.log(`Loaded ${quoteList.length} quotes.`);
  }

  // function loadQuoteAuthor() {
  //   // const quoteList = JSON.parse(localStorage.getItem('quoteList') || '[]');
  //   // console.log(`loadQuoteAuthor() - JSON has been parsed into the quoteList`);
  //   // return quoteList;

  //   const storedQuotes = localStorage.getItem('quoteList');
  //   if (storedQuotes) {
  //     // Re-assign the main quoteList, don't re-declare it with 'const' or 'let'
  //     quoteList = JSON.parse(storedQuotes); 
  //     console.log(`loadQuoteAuthor() - Quotes loaded from localStorage.`);
  //   } else {
  //     console.log(`loadQuoteAuthor() - No quotes in localStorage, using defaults.`);
  //   }
  // }

  // Invokes the function as soon as DOM is loaded so the content isn't null
  loadQuoteAuthor();
  displayQuote(currentQuoteIndex); 
  setInterval(loadQuoteAuthor, intervalTime);
  resetInterval();
});

