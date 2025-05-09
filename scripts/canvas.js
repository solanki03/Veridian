import { showModal, hideModal } from "./modal.js";

const canvas = document.getElementById("lifeClock");
const ctx = canvas.getContext("2d");

const RINGS = [
    { label: "Years", radius: 130, color: "#FF6B6B" },
    { label: "Months", radius: 115, color: "#F9A826" },
    { label: "Days", radius: 100, color: "#FFD93D" },
    { label: "Hours", radius: 85, color: "#6BCB77" },
    { label: "Minutes", radius: 70, color: "#4D96FF" },
    { label: "Seconds", radius: 55, color: "#843bff" }
];

// Get start date
let startDate = localStorage.getItem("veridianStartDate");
if (!startDate) {
    startDate = new Date().toISOString();
    localStorage.setItem("veridianStartDate", startDate);
}

document.addEventListener("DOMContentLoaded", () => {
    // initialize goal year and end date
    let goalYear = localStorage.getItem("veridianGoalYear");
    let endDate;

    if (goalYear) {
        endDate = new Date(`${goalYear}-12-31T23:59:59`);
    } else {
        endDate = new Date(`${new Date().getFullYear()}-12-31T23:59:59`);
    }

    handleGoalYear(endDate);
    setupModalEvents(endDate);
    drawLifeClock(canvas, ctx, startDate, endDate, RINGS);
    generateLegend(RINGS);
});

// draw life clock function
function drawLifeClock(canvas, ctx, startDate, endDate, RINGS) {
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    RINGS.forEach((ring, index) => {
        const angle = fractions[index] * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, ring.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "#e0e0e0";
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, ring.radius, -Math.PI / 2, -Math.PI / 2 + angle);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 10;
        ctx.stroke();
    });

    updateTimeLeftDisplay(endDate);
    requestAnimationFrame(() => drawLifeClock(canvas, ctx, startDate, endDate, RINGS));
}

// Generate legend
function generateLegend(RINGS) {
    const legendContainer = document.getElementById("legend");
    if (!legendContainer) return;
    legendContainer.innerHTML = "";

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

// calculate time left
function getTimeLeft(endDate) {
    const now = new Date();
    const msLeft = endDate - now;
    const secondsLeft = Math.floor(msLeft / 1000);
    const minutesLeft = Math.floor(secondsLeft / 60);
    const hoursLeft = Math.floor(minutesLeft / 60);
    const daysLeft = Math.floor(hoursLeft / 24);
    const monthsLeft = Math.floor(daysLeft / 30.44);
    const yearsLeft = Math.floor(monthsLeft / 12);
    return { days: daysLeft % 30, months: monthsLeft % 12, years: yearsLeft };
}

// update time left display
function updateTimeLeftDisplay(endDate) {
    const { days, months, years } = getTimeLeft(endDate);
    const timeLeftElement = document.getElementById("timeLeft");
    if (timeLeftElement) {
        timeLeftElement.textContent = `${days} days ${months} months ${years} years left`;
    }
}

// handle goal year modal
function handleGoalYear(endDate) {
    const storedGoalYear = localStorage.getItem("veridianGoalYear");
    console.log("Stored goal year:", storedGoalYear);
    if (!storedGoalYear) {
        console.log("No goal year found. Showing modal.");
        showModal();
    } else {
        console.log("Goal year found. Hiding modal.");
        // Set the goal year from storage
        endDate.setFullYear(parseInt(storedGoalYear));
        updateTimeLeftDisplay(endDate);
    }
}


// setup modal events
function setupModalEvents(endDate) {
    document.getElementById("saveGoalYear")?.addEventListener("click", () => {
        const yearInput = document.getElementById("goalYearInput");
        if (!yearInput) return;

        const year = parseInt(yearInput?.value);
        if (year >= 2025 && year <= 2100) {
            localStorage.setItem("veridianGoalYear", year.toString());

            // Recalculate endDate and re-run goal logic
            endDate.setFullYear(year);
            updateTimeLeftDisplay(endDate);
            hideModal();
            handleGoalYear(endDate); // Rerun after setting new goal
        } else {
            alert("Please enter a valid year between 2025 and 2100.");
        }
    });

    document.getElementById("resetGoalYear")?.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset your goal year?")) {
            localStorage.removeItem("veridianGoalYear");
            showModal();
        }
    });
}
