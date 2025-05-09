function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${hours}:${paddedMinutes} ${ampm}`;
    const timeElement = document.getElementById("time");
    if (timeElement) timeElement.textContent = timeString;
}

function updateDate() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateString = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const dateElement = document.getElementById("date");
    if (dateElement) dateElement.innerText = dateString;
}

updateTime();
setInterval(updateTime, 1000);
updateDate();