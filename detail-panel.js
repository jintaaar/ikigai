function openPanel() {
    document.querySelector(".profile-detail-panel")
        .classList.add("open");

    document.querySelector(".panel-overlay")
        .classList.add("open");
}

function closePanel() {
    document.querySelector(".profile-detail-panel")
        .classList.remove("open");

    document.querySelector(".panel-overlay")
        .classList.remove("open");
}

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