document.getElementById("searchBtn").addEventListener("click", handleSearch);
document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleSearch();
});

// Function to handle search button click
function handleSearch(){
    const searchInput = document.getElementById("searchInput").value.trim();
    const searchEngine = document.getElementById("searchEngine").value;

    if(!searchInput) return;

    let searchUrl = "";
    switch (searchEngine){
        case "google":
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchInput)}`;
            break;
        case "bing":
            searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchInput)}`;
            break;
        case "brave":
            searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(searchInput)}`;
            break;  
        case "duckduckgo":
            searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchInput)}`;
            break;
        case "yahoo":
            searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(searchInput)}`;
            break;
        default:
            // Fallback to Google if unknown engine
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchInput)}`;
    }

    window.open(searchUrl, "_blank");
    document.getElementById("searchInput").value = ""; // Clear the input field after search
}