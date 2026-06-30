function showCard() {
    const card = document.getElementById("discord-card");
    const btn = document.querySelector(".show-card");

    // hide button first (animation starts)
    btn.classList.add("hide");

    // wait before showing card
    setTimeout(() => {
        card.classList.add("show");
    }, 400); // match your CSS transition time
}

function closeCard() {
    const card = document.getElementById("discord-card");
    const btn = document.querySelector(".show-card");

    // hide card first
    card.classList.remove("show");

    // wait before showing button again
    setTimeout(() => {
        btn.classList.remove("hide");
    }, 600); // same timing
}

const SERVER_ID = "1168151047265591347";

fetch(`https://discord.com/api/guilds/1168151047265591347/widget.json`)
.then(res => res.json())
.then(data => {
    
    document.getElementById("online").textContent = data.presence_count;
});

const page = document.querySelector(".page");

// delayed fade IN (feels smoother on load)
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        requestAnimationFrame(() => {
            page.classList.add("loaded");
        });
    }, 150); // 👈 entry delay
});

// delayed fade OUT
document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");

    if (!href || href.startsWith("http") || link.target === "_blank") return;

    e.preventDefault();

    page.classList.remove("loaded");

    setTimeout(() => {
        page.classList.add("leaving");
    }, 100); // small delay before fade-out starts

    setTimeout(() => {
        window.location.href = href;
    }, 700); // 👈 longer exit time
});

const btn = document.getElementById("menu-btn");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".menu-overlay");

btn.addEventListener("click", () => {

    menu.classList.toggle("open");
    overlay.classList.toggle("open");
    
    if (menu.classList.contains("open")) {
        document.documentElement.classList.add("no-scroll");
        document.body.classList.add("no-scroll");
    } else {
        document.documentElement.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");
    }

});

function closeMenu() {
    document.querySelector(".menu")
        .classList.remove("open");
        document.documentElement.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");

    document.querySelector(".menu-overlay")
        .classList.remove("open");
        document.documentElement.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");
}