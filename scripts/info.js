const infoBtn = document.getElementById("infoBtn");
const infoModal = document.getElementById("infoModal");
const closeModal = document.getElementById("closeModal");

infoBtn.addEventListener("click", () => {
    infoModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
    infoModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target === infoModal) {
        infoModal.classList.add("hidden");
    }
});


// Set the current year dynamically
export function setDynamicYear() {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

setDynamicYear();