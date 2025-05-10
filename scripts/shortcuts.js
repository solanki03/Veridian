const shortcuts = [
    {
        name: "Gmail",
        url: "https://mail.google.com",
        iconClass: "ri-mail-line"
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com",
        iconClass: "ri-youtube-line"
    },
    {
        name: "WhatsApp",
        url: "https://web.whatsapp.com",
        iconClass: "ri-whatsapp-line"
    },
    {
        name: "GitHub",
        url: "https://github.com",
        iconClass: "ri-github-line"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com",
        iconClass: "ri-linkedin-fill"
    },
    {
        name: "X",
        url: "https://x.com",
        iconClass: "ri-twitter-x-line"
    },
    {
        name: "Discord",
        url: "https://discord.com",
        iconClass: "ri-discord-line"
    },
    {
        name: "ChatGPT",
        url: "https://chatgpt.com",
        iconClass: "ri-openai-fill"
    },
];

// render the shortcuts
function renderShortcuts() {
    const container = document.getElementById("shortcuts");
    if (!container) return;

    shortcuts.forEach(shortcut => {
        const link = document.createElement("a");
        link.href = shortcut.url;
        link.target = "_blank";
        link.classList.add("shortcut-link");

        const iconDiv = document.createElement("div");
        iconDiv.classList.add("shortcut-icon");
        iconDiv.setAttribute("title", shortcut.name);

        const icon = document.createElement("i");
        icon.className = `${shortcut.iconClass}`;
        icon.setAttribute("aria-hidden", "true");

        iconDiv.appendChild(icon);
        link.appendChild(iconDiv);
        container.appendChild(link);
    });
}

renderShortcuts();