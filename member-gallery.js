/* =========================
   STATE
========================= */
let sortOrder = "asc";
let currentView = "grid";

/* =========================
   ELEMENTS
========================= */
const sortField = document.getElementById("sort-field");
const gallery = document.querySelector(".member-gallery-grid");

/* =========================
   UPDATE BUTTON STATE
========================= */
function updateButtonState() {

    const isDefault = sortField.value === "id";

    document.querySelectorAll(".sort-button").forEach(btn => {

        btn.disabled = isDefault;
        btn.classList.remove("active");

        btn.style.opacity = isDefault ? "0.4" : "1";
        btn.style.pointerEvents = isDefault ? "none" : "auto";
    });
}

/* =========================
   ACTIVE BUTTON
========================= */
function setActive(order) {

    document.querySelectorAll(".sort-button").forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.dataset.order === order
        );
    });
}

function setActiveView(view) {

    document.querySelectorAll(".view-button").forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.dataset.view === view
        );
    });
}
/* =========================
   SORT PROFILES ARRAY
========================= */
function sortProfiles() {

    const field = sortField.value;

    updateButtonState();

    if (field === "id") {

        profiles.sort((a, b) =>
            Number(a.dataid) - Number(b.dataid)
        );

        sortOrder = null;
        return;
    }

    if (sortOrder === null) {
        sortOrder = "asc";
    }

    setActive(sortOrder);

    if (field === "name") {
        profiles.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (field === "joined") {
        profiles.sort((a, b) =>
            new Date(a.datajoined) - new Date(b.datajoined)||
            a.name.localeCompare(b.name)
        );
    }

    if (field === "birthday") {

        profiles.sort((a, b) =>
            new Date(a.databirthday) - new Date(b.databirthday)||
            a.name.localeCompare(b.name)
        );
    }

    if (sortOrder === "desc") {
        profiles.reverse();
    }
}

/* =========================
   RENDER GRID
========================= */
function renderGrid() {

    let html = '';

    profiles.forEach(profile => {

        html += `
            <div class="member-profile member-profile-card" 
                data-id="${profile.dataid}"
                data-joined="${profile.datajoined}"
                data-birthday="${profile.databirthday}">

                <div class="member-profile-img member-card-img">
                    <img src="${profile.image}">
                </div>

                <div class="member-profile-body member-card-body">
                    <div class="member-name member-card-name">${profile.name}</div>
                    <div class="member-role member-card-role">${profile.role}</div>
                    <div class="member-date member-card-date">𝒋𝒐𝒊𝒏𝒆𝒅 ${profile.joined}</div>
                </div>

            </div>
        `;
    });

    return html;
}

/* =========================
   RENDER LIST
========================= */
function renderList() {

    let html = `
        <div class="member-list-header">
            <div></div>
            <div></div>
            <div>𝒏𝒂𝒎𝒆</div>
            <div>𝒓𝒐𝒍𝒆</div>
            <div>𝒋𝒐𝒊𝒏𝒆𝒅 𝒅𝒂𝒕𝒆</div>
            <div></div>
        </div>
    `;

    profiles.forEach(profile => {

        html += `
            <div class="member-profile member-profile-list"
                data-id="${profile.dataid}"
                data-joined="${profile.datajoined}"
                data-birthday="${profile.databirthday}">

                <div></div>
                <div class="member-profile-img member-list-img">
                    <img src="${profile.image}">
                </div>
                <div class="member-name member-list-name">${profile.name}</div>
                <div class="member-role member-list-role">${profile.role}</div>
                <div class="member-date member-list-date">${profile.joined}</div>
                <div></div>

            </div>
        `;
    });

    return html;
}

/* =========================
   MAIN RENDER
========================= */
function render() {

    sortProfiles();

    gallery.innerHTML =
        currentView === "grid"
            ? renderGrid()
            : renderList();
}

/* =========================
   SET VIEW
========================= */
function setView(view) {

    currentView = view;

    gallery.className =
        view === "grid"
            ? "member-gallery-grid"
            : "member-gallery-list";

    setActiveView(view); // 👈 ADD THIS

    render();
}

/* =========================
   SET ORDER
========================= */
function setOrder(order) {

    if (sortField.value === "id") return;

    sortOrder = order;

    setActive(order);

    render();
}

/* =========================
   EVENTS
========================= */
sortField.addEventListener("change", render);

/* =========================
   INIT
========================= */
setView("grid");
setActiveView("grid");
render();