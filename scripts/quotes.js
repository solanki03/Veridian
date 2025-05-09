const quoteElement = document.getElementById("quote");
const storedQuote = localStorage.getItem("veridian-quote");
const storedQuoteDate = localStorage.getItem("veridian-quote-date");

function getRandomQuote() {
    const quotes = [
        "One day or day one, you decide.",
        "Believe you can and you're halfway there.",
        "Your time is limited, don’t waste it.",
        "Dream big. Start small. Act now.",
        "Success doesn’t come to you, you go to it.",
        "Make each day your masterpiece.",
        "You are capable of amazing things.",
        "Push yourself, because no one else will do it for you.",
        "The trouble is, you think you have time.",
        "The only way to do great work is to love what you do.",
        "What we think, we become.",
        "It always seems impossible until it’s done.",
        "Keep educating yourself.",
        "If you don't sacrifice for what you want, what you want becomes the sacrifice.",
        "Make it happen. Shock everyone.",
        "The future depends on what you do today.",
        "Dream it. Believe it. Achieve it.",
        "It's just a bad day, not a bad life.",
        "You are stronger than you think.",
        "If you never try, you'll never know.",
        "All we have is now.",
        "Be the game changer.",
        "The secret of getting ahead is getting started.",
        "Your future is created by what you do today, not tomorrow.",
        "Success doesn't come to you, you go to it.",
        "If not now, when?",
        "If you know you can do better, do better.",
        "You don't need to be great to start, but you have to start to be great.",
        "Your only limit is you.",
        "Don't watch the clock; do what it does. Keep going."
    ];

    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

function setDailyQuote() {
    const today = new Date().toDateString();
    if (storedQuote && storedQuoteDate === today) {
        quoteElement.textContent = `${storedQuote}`
    } else {
        const newQuote = getRandomQuote();
        localStorage.setItem("veridian-quote", newQuote);
        localStorage.setItem("veridian-quote-date", today);
        quoteElement.textContent = `${newQuote}`
    }
}

setDailyQuote();