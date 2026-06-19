let gridHTML = '';

profiles.forEach((profile) => {
    gridHTML += `
        <div class="member-profile member-profile-card" data-id="${profile.dataid}" data-joined="${profile.datajoined}" data-birthday="${profile.databirthday}">

            <div class="member-profile-img card-img">
                <img src="${profile.image}">
            </div>

            <div class="member-profile-body card-body">
                <div class="member-name card-name">
                    ${profile.name}
                </div>
                <div class="member-role card-role">
                    ${profile.role}
                </div>
                <div class="member-date card-date">
                    𝒋𝒐𝒊𝒏𝒆𝒅 ${profile.datejoined}
                </div>
            </div>
            
        </div>
    `;
});



let listHTML = `<div class="list-header">
                    <div></div>
                    <div></div>
                    <div>𝒏𝒂𝒎𝒆</div>
                    <div>𝒓𝒐𝒍𝒆</div>
                    <div>𝒋𝒐𝒊𝒏𝒆𝒅 𝒅𝒂𝒕𝒆</div>
                    <div></div>
                </div>`;

profiles.forEach((profile) => {
    listHTML += `
        <div class="member-profile member-profile-list" data-id="${profile.dataid}" data-joined="${profile.datajoined}" data-birthday="${profile.databirthday}">

            <div></div>
            <div class="member-profile-img list-img"><img src="${profile.image}"></div>
            <div class="member-name list-name">${profile.name}</div>
            <div class="member-role list-role">${profile.role}</div>
            <div class="member-date list-date">${profile.datejoined}</div>
            <div></div>

        </div>
    `;
});



function setView(view) {

    const gallery = document.querySelector(".member-gallery-grid, .member-gallery-list");

    if (view === "grid") {
        gallery.className = "member-gallery-grid";
        document.querySelector('.member-gallery-grid').innerHTML = gridHTML;
    }

    if (view === "list") {
        gallery.className = "member-gallery-list";
        document.querySelector('.member-gallery-list').innerHTML = listHTML;
    }
}
setView("grid");