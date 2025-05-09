
export function showModal() {
    const modal = document.getElementById("goalModal");
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.remove("fade-out");
    // void modal.offsetWidth;
    modal.classList.add("fade-in");
    modal.classList.add("modal-overlay");
}

export function hideModal() {
    const modal = document.getElementById("goalModal");
    if (!modal) return;
    modal.classList.remove("fade-in");
    modal.classList.remove("modal-overlay");
    modal.classList.add("fade-out");
    modal.classList.add("hidden");
}

