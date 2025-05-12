const openPomodoroPanel = document.getElementById("pomodoroToggle");
const pomodoroPanel = document.getElementById("pomodoroPanel");
const timerDisplay = document.getElementById("pomodoroTime");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const skipBreakBtn = document.getElementById("skipBreakBtn");
const workInput = document.getElementById("workInput");
const breakInput = document.getElementById("breakInput");
const applyBtn = document.getElementById("applyBtn");


// toggle the visibility
openPomodoroPanel.addEventListener("click", () => {
    pomodoroPanel.classList.toggle("hidden");
});

// save the time settings in localStorage
function saveSettings() {
    localStorage.setItem("pomodoro-settings", JSON.stringify({
        work: workMinutes,
        break: breakMinutes
    }));
}

// load the time settings info 
function loadSettings() {
    const saved = localStorage.getItem("pomodoro-settings");
    if (saved) {
        const {work, break: brk} = JSON.parse(saved);
        workMinutes = work;
        breakMinutes = brk;
    } else {
        workMinutes = defaultWorkMinutes;
        breakMinutes =defaultBreakMinutes;
    }
}


let isWorkSession = true;
let timer = null;
let remainingTime = 0;

const defaultWorkMinutes = 25;
const defaultBreakMinutes = 5;

let workMinutes;
let breakMinutes;

// update timer text
function updateDisplay(min, sec) {
    timerDisplay.textContent = `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`
}

// convert minutes to seconds
function setTime(minutes) {
    remainingTime = minutes * 60;
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    updateDisplay(min, sec);
}

// start the countdown
function startTimer() {
    if (timer) return;   // prevent multiple intervals

    timer = setInterval(() => {
        remainingTime--;

        const min = Math.floor(remainingTime / 60);
        const sec = remainingTime % 60;
        updateDisplay(min, sec);

        if (remainingTime <= 0) {
            clearInterval(timer);
            timer = null;
            // future: play sound here
            alert(`${isWorkSession ? "Work session" : "Break"} completed!`);
        }
    }, 1000);
}

// reset the timer
function resetTimer() {
    clearInterval(timer);
    timer = null;
    setTime(isWorkSession ? workMinutes : breakMinutes);
}

// skip to next session
function skipSession() {
    clearInterval(timer);
    timer = null;
    isWorkSession = !isWorkSession;
    setTime(isWorkSession ? workMinutes : breakMinutes);
}

loadSettings();  // load saved values
setTime(workMinutes);   // initialize the timer

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
skipBreakBtn.addEventListener("click", skipSession);

// setting the input value of work & break time
applyBtn.addEventListener("click", () => {
    const newWork = parseInt(workInput.value);
    const newBreak = parseInt(breakInput.value);

    if(!isNaN(newWork) && newWork > 0) workMinutes = newWork;
    if(!isNaN(newBreak) && newBreak > 0) breakMinutes = newBreak;

    resetTimer(); 
    saveSettings();
});