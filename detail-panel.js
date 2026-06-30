// ================= ELEMENTS =================

const panel = document.querySelector(".profile-detail-panel");
const overlaypanel = document.querySelector(".panel-overlay");

const musicCard = document.getElementById("musicCard");
const audio = document.getElementById("profileMusic");
const playBtn = document.getElementById("playBtn");

// ================= PANEL =================

function openPanel(profile) {

    if (profile) {
        showProfile(profile);
    }

    // reset previous animation
    panel.style.transition = "none";
    panel.style.transform = "translateX(100%)";

    requestAnimationFrame(() => {

        panel.classList.add("open");

        panel.style.transition = "transform .3s ease";
        panel.style.transform = "translateX(0)";

        overlaypanel.classList.add("open");

        document.documentElement.classList.add("no-scroll");
        document.body.classList.add("no-scroll");

    });

}

function closePanel() {

    // Stop music
    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = "▶";

    panel.style.transition = "transform .3s ease";
    panel.style.transform = "translateX(100%)";

    overlaypanel.classList.remove("open");

    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
        panel.classList.remove("open");
        panel.style.transform = "";
    }, 300);

}

// ================= OPEN PROFILE =================

document.addEventListener("click", (e) => {

    const card = e.target.closest(".member-profile");
    if (!card) return;

    const profile = profiles.find(
        p => p.dataid === card.dataset.id
    );

    if (!profile) return;

    // already open -> just switch profile
    if (panel.classList.contains("open")) {

        audio.pause();
        audio.currentTime = 0;
        playBtn.textContent = "▶";

        showProfile(profile);
        return;
    }

    openPanel(profile);

});

// ================= SWIPE TO CLOSE =================

let startX = 0;
let startY = 0;
let currentX = 0;

let dragging = false;
let direction = null;

panel.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

    currentX = startX;

    dragging = true;
    direction = null;

    panel.style.transition = "none";

});

panel.addEventListener("touchmove", (e) => {

    if (!dragging) return;

    const touch = e.touches[0];

    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    // lock swipe direction
    if (direction === null) {

        if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {

            direction =
                Math.abs(diffX) > Math.abs(diffY)
                    ? "horizontal"
                    : "vertical";

        }

    }

    if (direction === "vertical") return;

    if (diffX > 0) {

        currentX = touch.clientX;
        panel.style.transform = `translateX(${diffX}px)`;

    }

});

panel.addEventListener("touchend", () => {

    if (!dragging) return;

    dragging = false;

    if (direction === "horizontal") {

        const diff = currentX - startX;

        panel.style.transition = "transform .3s ease";

        if (diff > 100) {
            closePanel();
        } else {
            panel.style.transform = "translateX(0)";
        }

    }

    direction = null;

});

// ================= SHOW PROFILE =================

function showProfile(profile) {

    document.querySelector(".dp-image").src = profile.image;
    document.querySelector(".dp-name").textContent = profile.name;
    document.querySelector(".dp-role").textContent = profile.role;
    document.querySelector(".dp-date").textContent = profile.joined;
    document.querySelector(".dp-birthday").textContent = profile.birthday;

    // Games
    document.querySelector(".game-collection").innerHTML =
        profile.games.map(game => `
            <div class="games">
                <div class="game-icon">
                    <img src="${game.icon}">
                </div>

                <div class="game-detail">
                    <div class="game-name">${game.name}</div>
                    <div class="game-id">${game.id}</div>
                </div>
            </div>
        `).join("");

    // Connections
    document.querySelector(".connections").innerHTML =
        profile.connections.map(connection => `
            <div class="games">
                <div class="game-icon">
                    <img src="${connection.icon}">
                </div>

                <div class="game-detail">
                    <div class="game-name">${connection.name}</div>
                    <div class="game-id">${connection.id}</div>
                </div>
            </div>
        `).join("");

    // reset player
    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = "▶";

    // Music
    if (profile.music) {

        musicCard.style.display = "flex";

        musicCover.src = profile.music.cover;
        musicTitle.textContent = profile.music.title;
        musicArtist.textContent = profile.music.artist;

        audio.src = profile.music.mp3;
        musicCard.dataset.spotify = profile.music.spotify || "";

    } else {

        musicCard.style.display = "none";

        audio.removeAttribute("src");
        musicCard.dataset.spotify = "";

    }

}

// ================= SPOTIFY =================

musicCard.addEventListener("click", () => {

    const spotify = musicCard.dataset.spotify;

    if (spotify) {
        window.open(spotify, "_blank");
    }

});

// ================= PLAYER =================

playBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    if (!audio.src) return;

    if (audio.paused) {

        audio.play();
        playBtn.textContent = "❚❚";

    } else {

        audio.pause();
        audio.currentTime = 0;
        playBtn.textContent = "▶";

    }

});

audio.addEventListener("ended", () => {
    playBtn.textContent = "▶";
});