/* =========================
   STATE
========================= */
let sortOrder = "asc";
let currentView = "grid";
let searchQuery = "";

/* =========================
   ELEMENTS
========================= */
const sortField = document.getElementById("sort-field");
const searchInput = document.getElementById("memberSearch");
const gallery = document.querySelector(".member-gallery-grid");

/* =========================
   BUTTON STATES
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

function setActive(order) {

    document.querySelectorAll(".sort-button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.order === order);
    });
}

function setActiveView(view) {

    document.querySelectorAll(".view-button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.view === view);
    });
}

/* =========================
   PROCESS DATA (SEARCH + SORT)
========================= */
function processProfiles() {

    updateButtonState();

    let result = [...profiles];

    /* =========================
       SEARCH (USES data-name)
    ========================= */
    if (searchQuery.trim() !== "") {

        result = result.filter(profile =>
            (profile.dataname || "")
                .toLowerCase()
                .includes(searchQuery)
        );
    }

    const field = sortField.value;

    /* =========================
       SORT BY ID (DEFAULT)
    ========================= */
    if (field === "id") {

        result.sort((a, b) =>
            Number(a.dataid) - Number(b.dataid)
        );

        sortOrder = null;
        return result;
    }

    if (sortOrder === null) {
        sortOrder = "asc";
    }

    setActive(sortOrder);

    /* =========================
       SORT OPTIONS
    ========================= */
    if (field === "name") {
        result.sort((a, b) =>
            (a.dataname || "").localeCompare(b.dataname || "")
        );
    }

    if (field === "joined") {
        result.sort((a, b) =>
            new Date(a.datajoined) - new Date(b.datajoined)
        );
    }

    if (field === "birthday") {
        result.sort((a, b) =>
            new Date(a.databirthday) - new Date(b.databirthday)
        );
    }

    if (sortOrder === "desc") {
        result.reverse();
    }

    return result;
}

/* =========================
   GRID RENDER
========================= */
function renderGrid(data) {

    let html = '';

    data.forEach(profile => {

        html += `
            <div class="member-profile member-profile-card"
                data-id="${profile.dataid}"
                data-name="${profile.dataname}"
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
   LIST RENDER
========================= */
function renderList(data) {

    let html = `
        <div class="member-list-header">
            <div class="list-spacing"></div>
            <div></div>
            <div>𝒏𝒂𝒎𝒆</div>
            <div class="member-list-role-header">𝒓𝒐𝒍𝒆</div>
            <div class="member-list-date-header">𝒋𝒐𝒊𝒏𝒆𝒅</div>
            <div class="list-spacing"></div>
        </div>
    `;

    data.forEach(profile => {

        html += `
            <div class="member-profile member-profile-list"
                data-id="${profile.dataid}"
                data-name="${profile.dataname}"
                data-joined="${profile.datajoined}"
                data-birthday="${profile.databirthday}">

                <div class="list-spacing"></div>

                <div class="member-profile-img member-list-img">
                    <img src="${profile.image}">
                </div>

                <div class="member-name member-list-name">${profile.name}</div>
                <div class="member-role member-list-role">${profile.role}</div>
                <div class="member-date member-list-date">${profile.joined}</div>

                <div class="list-spacing"></div>

            </div>
        `;
    });

    return html;
}

/* =========================
   MAIN RENDER
========================= */
function render() {

    const data = processProfiles();

    gallery.innerHTML =
        currentView === "grid"
            ? renderGrid(data)
            : renderList(data);
}

/* =========================
   VIEW SWITCH
========================= */
function setView(view) {

    currentView = view;

    gallery.className =
        view === "grid"
            ? "member-gallery-grid"
            : "member-gallery-list";

    setActiveView(view);

    render();
}

/* =========================
   SORT ORDER
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

searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    render();
});

/* =========================
   INIT
========================= */
setView("grid");
setActiveView("grid");
render();