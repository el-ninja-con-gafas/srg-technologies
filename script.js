(function () {
    const slides = Array.from(document.querySelectorAll(".hero-slide"));
    const dots = Array.from(document.querySelectorAll(".hero-dot"));
    const prevBtn = document.querySelector(".hero-control--prev");
    const nextBtn = document.querySelector(".hero-control--next");

    if (!slides.length) return;

    let currentIndex = 0;
    let timerId = null;
    const INTERVAL = 6000;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        timerId = setInterval(nextSlide, INTERVAL);
    }

    function stopAutoPlay() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    nextBtn && nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoPlay();
    });

    prevBtn && prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoPlay();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.index || 0);
            showSlide(index);
            startAutoPlay();
        });
    });

    const hero = document.querySelector(".hero-slider");
    if (hero) {
        hero.addEventListener("mouseenter", stopAutoPlay);
        hero.addEventListener("mouseleave", startAutoPlay);
    }

    showSlide(0);
    startAutoPlay();
})();

document.querySelectorAll('.industry-card').forEach((card) => {
    const video = card.querySelector('.card-hover-video');
    if (!video) return;

    const playVideo = () => {
        video.currentTime = 0;
        video.play().catch(() => {});
    };

    const pauseVideo = () => {
        video.pause();
        video.currentTime = 0;
    };

    card.addEventListener('mouseenter', playVideo);
    card.addEventListener('mouseleave', pauseVideo);
    card.addEventListener('focusin', playVideo);
    card.addEventListener('focusout', pauseVideo);
});

(function () {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = toggle.classList.toggle("is-open");
        menu.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.addEventListener("click", (event) => {
        if (event.target.tagName === "A" && toggle.classList.contains("is-open")) {
            toggle.classList.remove("is-open");
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
})();

(function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
})();

(function () {
    const projectSliders = document.querySelectorAll("[data-project-slider]");

    projectSliders.forEach((slider) => {
        const slides = Array.from(slider.querySelectorAll(".project-slide"));
        const dots = Array.from(slider.querySelectorAll(".project-dot"));
        const prevBtn = slider.querySelector(".project-control--prev");
        const nextBtn = slider.querySelector(".project-control--next");

        if (!slides.length) return;

        let currentIndex = 0;

        const showSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === currentIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
                dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
            });
        };

        prevBtn && prevBtn.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });

        nextBtn && nextBtn.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
            });
        });

        slider.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showSlide(currentIndex - 1);
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                showSlide(currentIndex + 1);
            }
        });

        slider.setAttribute("tabindex", "0");
        showSlide(0);
    });
})();
