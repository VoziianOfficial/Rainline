"use strict";

/* ==========================================================
   RAINLINE — HOME PAGE SCRIPT
   File: /js/home.js
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        initHomeGallerySwiper();
        initHeroParallax();
        initHomeServiceMobileSwiperFallback();
    }

    /* ===============================
       HOME GALLERY SWIPER
       =============================== */

    function initHomeGallerySwiper() {
        const swiperElement = document.querySelector(".home-gallery-swiper");

        if (!swiperElement || !window.Swiper) {
            return;
        }

        new Swiper(swiperElement, {
            slidesPerView: 1.08,
            spaceBetween: 14,
            speed: 720,
            grabCursor: true,
            loop: false,

            pagination: {
                el: ".home-gallery-swiper .swiper-pagination",
                clickable: true
            },

            keyboard: {
                enabled: true,
                onlyInViewport: true
            },

            breakpoints: {
                640: {
                    slidesPerView: 1.45,
                    spaceBetween: 16
                },

                860: {
                    slidesPerView: 2.15,
                    spaceBetween: 18
                },

                1180: {
                    slidesPerView: 3.05,
                    spaceBetween: 18
                }
            }
        });
    }

    /* ===============================
       HERO SOFT PARALLAX
       =============================== */

    function initHeroParallax() {
        const hero = document.querySelector(".home-hero");
        const visual = document.querySelector(".home-hero-visual");
        const mainPhoto = document.querySelector(".hero-photo-main");
        const floatingTop = document.querySelector(".hero-floating-top");
        const floatingBottom = document.querySelector(".hero-floating-bottom");

        if (!hero || !visual || !window.gsap) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        hero.addEventListener("mousemove", (event) => {
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            if (mainPhoto) {
                window.gsap.to(mainPhoto, {
                    x: x * 14,
                    y: y * 10,
                    rotateY: x * 3,
                    rotateX: y * -3,
                    duration: 0.7,
                    ease: "power2.out"
                });
            }

            if (floatingTop) {
                window.gsap.to(floatingTop, {
                    x: x * -18,
                    y: y * -12,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }

            if (floatingBottom) {
                window.gsap.to(floatingBottom, {
                    x: x * 18,
                    y: y * 12,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });

        hero.addEventListener("mouseleave", () => {
            [mainPhoto, floatingTop, floatingBottom].forEach((element) => {
                if (!element) {
                    return;
                }

                window.gsap.to(element, {
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
        });
    }

    /* ===============================
       MOBILE SERVICE CARDS DRAG FEEL
       =============================== */

    function initHomeServiceMobileSwiperFallback() {
        const serviceGrid = document.querySelector(".service-card-grid");

        if (!serviceGrid) {
            return;
        }

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        function isMobileLayout() {
            return window.matchMedia("(max-width: 760px)").matches;
        }

        serviceGrid.addEventListener("mousedown", (event) => {
            if (!isMobileLayout()) {
                return;
            }

            isDown = true;
            serviceGrid.classList.add("is-dragging");
            startX = event.pageX - serviceGrid.offsetLeft;
            scrollLeft = serviceGrid.scrollLeft;
        });

        serviceGrid.addEventListener("mouseleave", () => {
            isDown = false;
            serviceGrid.classList.remove("is-dragging");
        });

        serviceGrid.addEventListener("mouseup", () => {
            isDown = false;
            serviceGrid.classList.remove("is-dragging");
        });

        serviceGrid.addEventListener("mousemove", (event) => {
            if (!isDown || !isMobileLayout()) {
                return;
            }

            event.preventDefault();

            const x = event.pageX - serviceGrid.offsetLeft;
            const walk = (x - startX) * 1.2;

            serviceGrid.scrollLeft = scrollLeft - walk;
        });
    }
})();