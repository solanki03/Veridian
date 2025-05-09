// ========== REAL-TIME CLOCK ==========
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
updateTime();
setInterval(updateTime, 1000);


// ========== DATE ==========
function updateDate() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateString = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const dateElement = document.getElementById("date");
    if (dateElement) dateElement.innerText = dateString;
}
updateDate();


// ========== LIFE CLOCK ==========
const canvas = document.getElementById("lifeClock");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const RINGS = [
    { label: "Years", radius: 130, color: "#FF6B6B" },
    { label: "Months", radius: 115, color: "#F9A826" },
    { label: "Days", radius: 100, color: "#FFD93D" },
    { label: "Hours", radius: 85, color: "#6BCB77" },
    { label: "Minutes", radius: 70, color: "#4D96FF" },
    { label: "Seconds", radius: 55, color: "#843bff" }
];

// Load or set start date
let startDate = localStorage.getItem("veridianStartDate");
if (!startDate) {
    startDate = new Date().toISOString();
    localStorage.setItem("veridianStartDate", startDate);
}
startDate = new Date(startDate);

// Check for goal year BEFORE defaulting
const modal = document.getElementById("goalModal");
const justUpdated = localStorage.getItem("veridianJustUpdatedGoal");

let storedGoalYear;
if (justUpdated) {
    localStorage.removeItem("veridianJustUpdatedGoal");
    modal.classList.remove("hidden");
} else {
    storedGoalYear = localStorage.getItem("veridianGoalYear");
    if(!storedGoalYear && modal) {
        modal.classList.remove("hidden");
        showModal();
    }
}

let goalYear = parseInt(storedGoalYear) || new Date().getFullYear();
const endDate = new Date(`${goalYear}-12-31T23:59:59`);


// ========== DRAW CLOCK ==========
function drawLifeClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = new Date();
    const totalDuration = endDate - startDate;
    const timeElapsed = now - startDate;
    const timeFraction = Math.min(timeElapsed / totalDuration, 1);

    const fractions = [
        timeFraction,
        now.getMonth() / 11,
        Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)) / 365,
        now.getHours() / 24,
        now.getMinutes() / 60,
        now.getSeconds() / 60
    ];

    RINGS.forEach((ring, index) => {
        const angle = fractions[index] * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#e0e0e0";
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, -Math.PI / 2, -Math.PI / 2 + angle);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 10;
        ctx.stroke();
    });

    // Remaining Time Display
    const msLeft = endDate - now;
    const secondsLeft = Math.floor(msLeft / 1000);
    const minutesLeft = Math.floor(secondsLeft / 60);
    const hoursLeft = Math.floor(minutesLeft / 60);
    const daysLeft = Math.floor(hoursLeft / 24);
    const monthsLeft = Math.floor(daysLeft / 30.44);
    const yearsLeft = Math.floor(monthsLeft / 12);

    const timeLeftElement = document.getElementById("timeLeft");
    if (timeLeftElement) {
        timeLeftElement.textContent = `${daysLeft % 30} days ${monthsLeft % 12} months ${yearsLeft} years left`;
    }

    requestAnimationFrame(drawLifeClock);
}
drawLifeClock();


// ========== LEGEND ==========
function generateLegend() {
    const legendContainer = document.getElementById("legend");
    if (!legendContainer) return;
    legendContainer.innerHTML = ""; // Clear old entries if any

    RINGS.forEach(ring => {
        const item = document.createElement("p");
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.style.backgroundColor = ring.color;
        const label = document.createTextNode(` ${ring.label}`);
        item.appendChild(dot);
        item.appendChild(label);
        legendContainer.appendChild(item);
    });
}
generateLegend();


// ========== UPDATE THE TIME LEFT ==========
function updateTimeLeftDisplay() {
    const now = new Date();
    const msLeft = endDate - now;
    const secondsLeft = Math.floor(msLeft / 1000);
    const minutesLeft = Math.floor(secondsLeft / 60);
    const hoursLeft = Math.floor(minutesLeft / 60);
    const daysLeft = Math.floor(hoursLeft / 24);
    const monthsLeft = Math.floor(daysLeft / 30.44);
    const yearsLeft = Math.floor(monthsLeft / 12);

    const timeLeftElement = document.getElementById("timeLeft");
    if (timeLeftElement) {
        timeLeftElement.textContent = `${daysLeft % 30} days ${monthsLeft % 12} months ${yearsLeft} years left`;
    }
}


// ========== SHOW & HIDE MODAL FUNCTIONS ==========
function showModal() {
    const modal = document.getElementById("goalModal");
    modal.classList.remove("hidden");
    void modal.offsetWidth;  // Trigger reflow
    modal.classList.add("fade-in");
    modal.classList.remove("fade-out");
}

function hideModal() {
    const modal = document.getElementById("goalModal");
    modal.classList.remove("fade-in");
    modal.classList.remove("modal-overlay");
    modal.classList.add("fade-out");
    modal.classList.add("hidden");
}

// ======= HANDLE SAVE GOAL YEAR =======
document.getElementById("saveGoalYear").addEventListener("click", () => {
    const yearInput = document.getElementById("goalYearInput");
    const year = parseInt(yearInput.value);
    if (year >= 2025 && year <= 2100) {
        // Set the goal year in local storage
        localStorage.setItem("veridianGoalYear", year.toString());
        localStorage.setItem("veridianJustUpdatedGoal", "true");
        
        // update variables
        goalYear = year;
        endDate.setFullYear(goalYear);

        hideModal(); // Hide the modal
        updateTimeLeftDisplay(); // Update the time left display
    } else {
        alert("Please enter a valid year between 2025 and 2100.");
    }
});

// ======= RESET GOAL YEAR =======
document.getElementById("resetGoalYear").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset your goal year?")) {
        localStorage.removeItem("veridianGoalYear");
        location.reload();
    }
});

// ======= Modal Display on First Visit =======
// const justUpdated = localStorage.getItem("veridianJustUpdatedGoal");

// if (!goalYear && !justUpdated) {
//     // Show modal only if goal not set and not just updated
//     showModal();
// }

// // Clear flag after page loads
// if (justUpdated) {
//     localStorage.removeItem("veridianJustUpdatedGoal");
// }
