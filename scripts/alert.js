// audio element for alert sound
const alertSound = new Audio("assets/sounds/alert-sound.mp3");

// custom alert function
export function showAlert(message, type = "info", sound = true) {
    // remove existing alert
    const existing = document.getElementById("custom-alert");
    if (existing) existing.remove();

    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.className = `custom-alert ${type}`;
    
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.add("fade-out");
        alertBox.addEventListener("transitionend", () => alertBox.remove(), 500);
    }, 2000);

    if (sound == true) playAlertSound();
}

// play sound function
export function playAlertSound() {
    alertSound.currentTime = 0;
    alertSound.play();
}

// export vibration utility
export function vibrate(ms = 200) {
    if ("vibrate" in navigator) {
        navigator.vibrate(ms);
    }
}