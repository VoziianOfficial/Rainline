"use strict";


(function () {
    document.addEventListener("DOMContentLoaded", initServicesPage);

    function initServicesPage() {
        initServicesHeroMotion();
        initServicesCardsDrag();
        initQuestionPillsMotion();
    }



    function initServicesHeroMotion() {
        const hero = document.querySelector(".services-hero");
        const mainPhoto = document.querySelector(".services-hero-photo-main");
        const smallPhoto = document.querySelector(".services-hero-photo-small");
        const badge = document.querySelector(".services-hero-badge");

        if (!hero || !window.gsap) {
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
                    x: x * 12,
                    y: y * 9,
                    rotateY: x * 2.5,
                    rotateX: y * -2.5,
                    duration: 0.7,
                    ease: "power2.out"
                });
            }

            if (smallPhoto) {
                window.gsap.to(smallPhoto, {
                    x: x * -14,
                    y: y * -10,
                    rotateY: x * -2,
                    rotateX: y * 2,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }

            if (badge) {
                window.gsap.to(badge, {
                    x: x * 10,
                    y: y * 7,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }
        });

        hero.addEventListener("mouseleave", () => {
            [mainPhoto, smallPhoto, badge].forEach((element) => {
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



    function initServicesCardsDrag() {
        const grid = document.querySelector(".services-category-grid");

        if (!grid) {
            return;
        }

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        function isMobileLayout() {
            return window.matchMedia("(max-width: 760px)").matches;
        }

        grid.addEventListener("mousedown", (event) => {
            if (!isMobileLayout()) {
                return;
            }

            isDown = true;
            grid.classList.add("is-dragging");
            startX = event.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
        });

        grid.addEventListener("mouseleave", () => {
            isDown = false;
            grid.classList.remove("is-dragging");
        });

        grid.addEventListener("mouseup", () => {
            isDown = false;
            grid.classList.remove("is-dragging");
        });

        grid.addEventListener("mousemove", (event) => {
            if (!isDown || !isMobileLayout()) {
                return;
            }

            event.preventDefault();

            const x = event.pageX - grid.offsetLeft;
            const walk = (x - startX) * 1.2;

            grid.scrollLeft = scrollLeft - walk;
        });
    }


    function initQuestionPillsMotion() {
        const pills = document.querySelectorAll(".question-pill-list article");

        if (!pills.length || !window.gsap) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        pills.forEach((pill) => {
            pill.addEventListener("mouseenter", () => {
                window.gsap.to(pill, {
                    x: 6,
                    duration: 0.28,
                    ease: "power2.out"
                });
            });

            pill.addEventListener("mouseleave", () => {
                window.gsap.to(pill, {
                    x: 0,
                    duration: 0.34,
                    ease: "power2.out"
                });
            });
        });
    }
})();