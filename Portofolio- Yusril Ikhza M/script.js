
// MENU MOBILE


const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});



// TUTUP MENU SETELAH KLIK


const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});



// NAVBAR SHADOW SAAT SCROLL


const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.08)";
    } else {
        header.style.boxShadow = "none";
    }

});



// ANIMASI MUNCUL SAAT SCROLL


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);


const sections = document.querySelectorAll(".section");

sections.forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});



// PROJECT CAROUSEL


document.querySelectorAll(".project-carousel").forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");

    const slides = carousel.querySelectorAll(
        ".carousel-track img"
    );

    const prevButton = carousel.querySelector(".prev");

    const nextButton = carousel.querySelector(".next");

    const dots = carousel.querySelectorAll(".dot");

    let currentIndex = 0;


    // UPDATE CAROUSEL

    function updateCarousel() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;


        // UPDATE DOT

        dots.forEach((dot, index) => {

            dot.classList.remove("active");

            if (index === currentIndex) {
                dot.classList.add("active");
            }

        });

    }


    // NEXT BUTTON

    nextButton.addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        updateCarousel();

    });


    // PREVIOUS BUTTON

    prevButton.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

        updateCarousel();

    });


    // DOT CLICK

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentIndex = index;

            updateCarousel();

        });

    });

});

// =========================
// PROJECT MODAL CAROUSEL
// =========================

const projectModal = document.getElementById("projectModal");

const modalClose = document.getElementById("modalClose");

const modalTrack = document.getElementById("modalCarouselTrack");

const modalPrev = document.getElementById("modalPrev");

const modalNext = document.getElementById("modalNext");

const modalDots = document.getElementById("modalDots");

const modalCounter = document.getElementById("modalCounter");

const modalTitle = document.getElementById("modalTitle");

const modalDescription = document.getElementById("modalDescription");


let modalCurrentIndex = 0;

let modalImages = [];


//  MODAL CAROUSEL

function updateModalCarousel() {

    modalTrack.style.transform =
        `translateX(-${modalCurrentIndex * 100}%)`;


    // DOT
    const dots = modalDots.querySelectorAll(".modal-dot");

    dots.forEach((dot, index) => {

        dot.classList.remove("active");

        if (index === modalCurrentIndex) {
            dot.classList.add("active");
        }

    });


    //  COUNTER
    modalCounter.textContent =
        `${modalCurrentIndex + 1} / ${modalImages.length}`;

}


// OPEN PROJECT MODAL


document.querySelectorAll(".view-project").forEach(button => {

    button.addEventListener("click", function (event) {

        event.preventDefault();


        // MENCARI PROJECT CARD
        const projectCard =
            this.closest(".project-card");


        // MENGAMBIL SEMUA GAMBAR PROJECT
        const images =
            projectCard.querySelectorAll(
                ".carousel-track img"
            );


        // RESET DATA
        modalTrack.innerHTML = "";

        modalDots.innerHTML = "";

        modalImages = [];

        modalCurrentIndex = 0;


        // MEMASUKKAN GAMBAR KE MODAL
        images.forEach((image, index) => {

            // CREATE IMAGE
            const modalImage =
                document.createElement("img");

            modalImage.src = image.src;

            modalImage.alt = image.alt;


            modalTrack.appendChild(modalImage);

            modalImages.push(modalImage);


            // CREATE DOT
            const dot =
                document.createElement("span");

            dot.classList.add("modal-dot");

            if (index === 0) {
                dot.classList.add("active");
            }


            // DOT CLICK
            dot.addEventListener("click", () => {

                modalCurrentIndex = index;

                updateModalCarousel();

            });


            modalDots.appendChild(dot);

        });


        // MENGAMBIL JUDUL
        modalTitle.textContent =
            projectCard.querySelector(
                ".project-content h3"
            ).textContent;


        // MENGAMBIL DESKRIPSI
        modalDescription.textContent =
            projectCard.querySelector(
                ".project-content p"
            ).textContent;


        // UPDATE CAROUSEL
        updateModalCarousel();


        // MEMBUKA MODAL
        projectModal.classList.add("active");


        // LOCK SCROLL
        document.body.style.overflow = "hidden";

    });

});



// NEXT IMAGE


modalNext.addEventListener("click", () => {

    modalCurrentIndex++;

    if (modalCurrentIndex >= modalImages.length) {

        modalCurrentIndex = 0;

    }

    updateModalCarousel();

});



// PREVIOUS IMAGE


modalPrev.addEventListener("click", () => {

    modalCurrentIndex--;

    if (modalCurrentIndex < 0) {

        modalCurrentIndex =
            modalImages.length - 1;

    }

    updateModalCarousel();

});


// CLOSE MODAL


function closeProjectModal() {

    projectModal.classList.remove("active");

    document.body.style.overflow = "auto";

}


// CLOSE BUTTON

modalClose.addEventListener(
    "click",
    closeProjectModal
);


// CLICK OUTSIDE MODAL

projectModal.addEventListener(
    "click",
    event => {

        if (event.target === projectModal) {

            closeProjectModal();

        }

    }
);

// ESC CLOSE

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains("active")
        ) {

            closeProjectModal();

        }

    }
);