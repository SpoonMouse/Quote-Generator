const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Api array
let apiQuotes = [];


// Loading Spinner Functions
function showLoaderSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoaderSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Generates random quote from array
function newQuote() {
    showLoaderSpinner();
       const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     // Setting quotes w/o author to say Unknown
     if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }
    // Styling longer quotes to look tidy
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
        

    }
    quoteText.textContent = quote.text;
    hideLoaderSpinner();
}

// Fetching Quotes from API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Attempt to reload if error occurs
        newQuote();
    }
}



// Tweet Quote Function
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners for both buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Call main function on page load
getQuotes();