"use strict";

/* ==========================================================
   RAINLINE — ABOUT PAGE SCRIPT
   File: /js/about.js
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", initAboutPage);

    function initAboutPage() {
        initAboutHeroMotion();
        initAboutModelMotion();
        initAboutListMotion();
    }

    /* ===============================
       ABOUT HERO MOTION
       =============================== */

    function initAboutHeroMotion() {
        const hero = document.querySelector(".about-hero");
        const mainPhoto = document.querySelector(".about-hero-main");
        const sidePhoto = document.querySelector(".about-hero-side");
        const card = document.querySelector(".about-hero-card");

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
                    duration: 0.75,
                    ease: "power2.out"
                });
            }

            if (sidePhoto) {
                window.gsap.to(sidePhoto, {
                    x: x * -14,
                    y: y * -10,
                    rotateY: x * -2,
                    rotateX: y * 2,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }

            if (card) {
                window.gsap.to(card, {
                    x: x * 10,
                    y: y * 7,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }
        });

        hero.addEventListener("mouseleave", () => {
            [mainPhoto, sidePhoto, card].forEach((element) => {
                if (!element) {
                    return;
                }

                window.gsap.to(element, {
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.85,
                    ease: "power2.out"
                });
            });
        });
    }

    /* ===============================
       MODEL SECTION MOTION
       =============================== */

    function initAboutModelMotion() {
        const section = document.querySelector(".about-model");
        const media = document.querySelector(".about-model-media");
        const floating = document.querySelector(".about-model-floating");

        if (!section || !window.gsap) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        section.addEventListener("mousemove", (event) => {
            const rect = section.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            if (media) {
                window.gsap.to(media, {
                    x: x * 8,
                    y: y * 6,
                    rotateY: x * 1.8,
                    rotateX: y * -1.8,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }

            if (floating) {
                window.gsap.to(floating, {
                    x: x * -10,
                    y: y * -8,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }
        });

        section.addEventListener("mouseleave", () => {
            [media, floating].forEach((element) => {
                if (!element) {
                    return;
                }

                window.gsap.to(element, {
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.85,
                    ease: "power2.out"
                });
            });
        });
    }

    /* ===============================
       LIST MICRO MOTION
       =============================== */

    function initAboutListMotion() {
        const items = document.querySelectorAll(
            ".about-story-points article, .model-list article, .about-values-grid .info-card"
        );

        if (!items.length || !window.gsap) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        items.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                window.gsap.to(item, {
                    y: -4,
                    duration: 0.28,
                    ease: "power2.out"
                });
            });

            item.addEventListener("mouseleave", () => {
                window.gsap.to(item, {
                    y: 0,
                    duration: 0.34,
                    ease: "power2.out"
                });
            });
        });
    }
})();