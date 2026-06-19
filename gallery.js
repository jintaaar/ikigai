const modal = document.querySelector(".media-modal");
const viewer = document.querySelector(".media-viewer");

const titleEl = document.querySelector(".media-title");
const descEl = document.querySelector(".media-desc");
const closeBtn = document.querySelector(".media-close");

/* folder data */
const folders = {
    1: {
        title: "𝟐𝟎𝟐𝟐 𝒀𝒆𝒂𝒓 𝑬𝒏𝒅 𝑷𝒂𝒓𝒕𝒚",
        desc: "𝟓 𝒑𝒉𝒐𝒕𝒐𝒔 | 𝟏 𝒗𝒊𝒅𝒆𝒐",
        items: [
            { type: "image", src: "gallery/01/01.jpg" },
            { type: "image", src: "gallery/01/02.jpg" },
            { type: "image", src: "gallery/01/03.jpg" },
            { type: "image", src: "gallery/01/04.jpg" },
            { type: "image", src: "gallery/01/05.jpg" },
            { type: "video", src: "gallery/01/06.mp4" }
        ]
    },
    2: {
        title: "𝑩𝒖𝒅 𝑴𝒆𝒎𝒐𝒓𝒊𝒆𝒔",
        desc: "𝟏𝟎 𝒑𝒉𝒐𝒕𝒐𝒔 | 𝟎 𝒗𝒊𝒅𝒆𝒐",
        items: [
            { type: "image", src: "gallery/02/01.jpg" },
            { type: "image", src: "gallery/02/02.jpg" },
            { type: "image", src: "gallery/02/03.jpg" },
            { type: "image", src: "gallery/02/04.jpg" },
            { type: "image", src: "gallery/02/05.jpg" },
            { type: "image", src: "gallery/02/06.jpg" },
            { type: "image", src: "gallery/02/07.jpg" },
            { type: "image", src: "gallery/02/08.jpg" },
            { type: "image", src: "gallery/02/09.jpg" },
            { type: "image", src: "gallery/02/10.jpg" },
            { type: "image", src: "gallery/02/11.jpg" },
            { type: "image", src: "gallery/02/12.jpg" },
            { type: "image", src: "gallery/02/13.jpg" }
        ]
    },
    3: {
        title: "𝑬𝒈𝒈𝒚 𝑷𝒂𝒓𝒕𝒚",
        desc: "𝟖 𝒑𝒉𝒐𝒕𝒐𝒔 | 𝟎 𝒗𝒊𝒅𝒆𝒐",
        items: [
            { type: "image", src: "gallery/03/01.webp" },
            { type: "image", src: "gallery/03/02.webp" },
            { type: "image", src: "gallery/03/03.webp" },
            { type: "image", src: "gallery/03/04.webp" },
            { type: "image", src: "gallery/03/05.webp" },
            { type: "image", src: "gallery/03/06.webp" },
            { type: "image", src: "gallery/03/07.webp" },
            { type: "image", src: "gallery/03/08.webp" }

        ]
    },
    4: {
        title: "𝑴𝒊𝒏𝒆𝒄𝒓𝒂𝒇𝒕",
        desc: "𝟓 𝒑𝒉𝒐𝒕𝒐𝒔 | 𝟎 𝒗𝒊𝒅𝒆𝒐",
        items: [
            { type: "image", src: "gallery/04/01.webp" },
            { type: "image", src: "gallery/04/02.jpg" },
            { type: "image", src: "gallery/04/03.jpg" },
            { type: "image", src: "gallery/04/04.webp" },
            { type: "image", src: "gallery/04/05.webp" }
        ]
    },
    5: {
        title: "𝑶𝒕𝒉𝒆𝒓 𝑮𝒂𝒎𝒆𝒔",
        desc: "𝟗 𝒑𝒉𝒐𝒕𝒐𝒔 | 𝟎 𝒗𝒊𝒅𝒆𝒐",
        items: [
            { type: "image", src: "gallery/05/01.jpg" },
            { type: "image", src: "gallery/05/02.jpg" },
            { type: "image", src: "gallery/05/03.jpg" },
            { type: "image", src: "gallery/05/04.jpg" },
            { type: "image", src: "gallery/05/05.jpg" },
            { type: "image", src: "gallery/05/06.jpg" },
            { type: "image", src: "gallery/05/07.png" },
            { type: "image", src: "gallery/05/08.png" },
            { type: "image", src: "gallery/05/09.png" }
        ]
    }
};

document.querySelectorAll(".gallery-folder").forEach(folder => {

    folder.addEventListener("click", () => {

        const key = folder.dataset.folder; // 👈 gets bud / eggy / etc
        const data = folders[key];

        if (!data) return;

        titleEl.textContent = data.title;
        descEl.textContent = data.desc;

        viewer.innerHTML = "";

        data.items.forEach(media => {

            if (media.type === "image") {
                viewer.innerHTML += `<img src="${media.src}">`;
            }

            if (media.type === "video") {
                viewer.innerHTML += `<video src="${media.src}" controls></video>`;
            }

        });

        modal.classList.add("open");
    });

});

/* close */
closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    viewer.innerHTML = "";
});

/* click outside optional */
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("open");
        viewer.innerHTML = "";
    }
});

const preview = document.querySelector(".media-preview");
const previewImg = document.querySelector(".preview-img");
const previewClose = document.querySelector(".preview-close");

/* open image viewer */
document.addEventListener("click", (e) => {

    if (e.target.tagName === "IMG" && e.target.closest(".media-viewer")) {
        previewImg.src = e.target.src;
        preview.classList.add("open");
    }

});

/* close viewer */
previewClose.addEventListener("click", () => {
    preview.classList.remove("open");
    previewImg.src = "";
});

/* click outside image */
preview.addEventListener("click", (e) => {
    if (e.target === preview) {
        preview.classList.remove("open");
        previewImg.src = "";
    }
});