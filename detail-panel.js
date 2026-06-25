function openPanel() {

    const panel = document.querySelector(".profile-detail-panel");

    panel.style.transform = "";

    panel.classList.add("open");

    document.querySelector(".panel-overlay")
        .classList.add("open");

    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
}

function closePanel() {

    const panel = document.querySelector(".profile-detail-panel");

    panel.style.transform = "";

    panel.classList.remove("open");

    document.querySelector(".panel-overlay")
        .classList.remove("open");

    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");

        
}

const panel = document.querySelector(".profile-detail-panel");

let startX = 0;
let currentX = 0;
let dragging = false;

panel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    dragging = true;

    panel.style.transition = "none";
});

panel.addEventListener("touchmove", (e) => {
    if (!dragging) return;

    currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // only allow dragging right
    if (diff > 0) {
        panel.style.transform = `translateX(${diff}px)`;
    }
});

panel.addEventListener("touchend", () => {
    if (!dragging) return;

    dragging = false;

    const diff = currentX - startX;

    panel.style.transition = "transform .3s ease";

    // swipe at least 100px to close
    if (diff > 100) {
        closePanel();
    } else {
        panel.style.transform = "";
    }

    currentX = 0;
});

document.addEventListener("click", (e) => {

    const card = e.target.closest(".member-profile");
    if (!card) return;

    const id = card.dataset.id;
    const profile = profiles.find(p => p.dataid == id);

    showProfile(profile);
    openPanel();
});

function showProfile(profile) {

    // existing fields (KEEP THESE)
    document.querySelector(".dp-image").src = profile.image;
    document.querySelector(".dp-name").textContent = profile.name;
    document.querySelector(".dp-role").textContent = profile.role;
    document.querySelector(".dp-date").textContent = profile.joined;
    document.querySelector(".dp-birthday").textContent = profile.birthday;

    // NEW: games section

    let gamesHTML = "";

    profile.games.forEach(game => {
        gamesHTML += `
            <div class="games">

                <div class="game-icon">
                    <img src="${game.icon}">
                </div>

                <div class="game-detail">
                    <div class="game-name">${game.name}</div>
                    <div class="game-id">${game.id}</div>
                </div>

            </div>
        `;
    });

    let connectionsHTML = "";

    profile.connections.forEach(connection => {
        connectionsHTML += `
            <div class="games">

                <div class="game-icon">
                    <img src="${connection.icon}">
                </div>

                <div class="game-detail">
                    <div class="game-name">${connection.name}</div>
                    <div class="game-id">${connection.id}</div>
                </div>

            </div>
        `;
    });

    document.querySelector(".game-collection").innerHTML = gamesHTML;
    document.querySelector(".connections").innerHTML = connectionsHTML;
}