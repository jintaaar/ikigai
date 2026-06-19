const imgTrack = document.querySelector(".img-track");
const imgSlides = document.querySelectorAll(".img-slide");

let imgIndex = 0;

function updateCarousel() {
    imgTrack.style.transform = `translateX(-${imgIndex * 100}%)`;
}

function nextSlide() {
    imgIndex = (imgIndex + 1) % imgSlides.length;
    updateCarousel();
}

function prevSlide() {
    imgIndex = (imgIndex - 1 + imgSlides.length) % imgSlides.length;
    updateCarousel();
}

/* Buttons */
document.querySelector(".img-next")
    .addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

document.querySelector(".img-prev")
    .addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

/* Auto-slide */
let autoSlide = setInterval(nextSlide, 5000);

/* Restart timer after manual click */
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

updateCarousel();

let newslistsHTML = '';

    newslists.forEach((newslist) => {

        newslistsHTML += `
            

            <div class="news-item" data-type="${newslist.type}" data-id="${newslist.dataid}">
                <img src="${newslist.image}" class="news-thumb">

                <div class="news-content">
                    <div class="news-title">${newslist.title}</div>
                    <div class="news-date">${newslist.date}</div>
                </div>
            </div>
        `;
    });

document.querySelector('.news-list').innerHTML = newslistsHTML;


const tabs = document.querySelectorAll(".news-tab");
const items = document.querySelectorAll(".news-item");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const type = tab.dataset.type;

        // active button UI
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        items.forEach(item => {

            const itemType = item.dataset.type;

            // SHOW ALL
            if (type === "all") {
                item.style.display = "flex";
                return;
            }

            // FILTER MATCH
            if (itemType === type) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }

        });

    });

});

document.querySelectorAll('.news-item').forEach(item => {

    item.addEventListener('click', () => {

        const id = item.dataset.id;

        const news = newslists.find(
            news => news.dataid === id
        );

        showNews(news);

    });

});

const modal = document.querySelector(".img-modal");
const modalImg = document.querySelector(".img-modal-content");
const closeBtn = document.querySelector(".img-modal-close");

// open modal
document.querySelectorAll(".news-item").forEach(item => {

    item.addEventListener("click", () => {

        const news = newslists.find(
            n => n.dataid === item.dataset.id
        );

        modalImg.src = news.image;
        modal.classList.add("open");

    });

});

// close button
closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});

// click outside closes
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("open");
    }
});