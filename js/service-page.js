"use strict";

/* ==========================================================
   RAINLINE — SERVICE DETAIL PAGE SCRIPT
   File: /js/service-page.js
   Used on all gutter service detail pages
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", initServicePage);

    function initServicePage() {
        initServiceHeroMotion();
        initServicePhotoMotion();
        initServiceCardsMotion();
        initServiceQuestionMotion();
    }

    /* ===============================
       HERO MOTION
       =============================== */

    function initServiceHeroMotion() {
        const hero = document.querySelector(".service-hero");
        const mainPhoto = document.querySelector(".service-hero-main");
        const smallPhoto = document.querySelector(".service-hero-small");
        const badge = document.querySelector(".service-hero-badge");

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
                    rotateY: x * 2.4,
                    rotateX: y * -2.4,
                    transformPerspective: 900,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }

            if (smallPhoto) {
                window.gsap.to(smallPhoto, {
                    x: x * -14,
                    y: y * -10,
                    rotateY: x * -2,
                    rotateX: y * 2,
                    transformPerspective: 900,
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
                    duration: 0.85,
                    ease: "power2.out"
                });
            });
        });
    }

    /* ===============================
       PHOTO SECTION MOTION
       =============================== */

    function initServicePhotoMotion() {
        const section = document.querySelector(".service-photo-section");
        const media = document.querySelector(".service-photo-media");
        const label = document.querySelector(".service-photo-label");

        if (!section || !media || !window.gsap) {
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

            window.gsap.to(media, {
                x: x * 8,
                y: y * 6,
                rotateY: x * 1.8,
                rotateX: y * -1.8,
                transformPerspective: 900,
                duration: 0.75,
                ease: "power2.out"
            });

            if (label) {
                window.gsap.to(label, {
                    x: x * -10,
                    y: y * -8,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }
        });

        section.addEventListener("mouseleave", () => {
            window.gsap.to(media, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.85,
                ease: "power2.out"
            });

            if (label) {
                window.gsap.to(label, {
                    x: 0,
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out"
                });
            }
        });
    }

    /* ===============================
       CARDS MOTION
       =============================== */

    function initServiceCardsMotion() {
        const cards = document.querySelectorAll(
            ".service-overview-list article, .service-factor-grid .info-card"
        );

        if (!cards.length || !window.gsap) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                window.gsap.to(card, {
                    y: -4,
                    duration: 0.28,
                    ease: "power2.out"
                });
            });

            card.addEventListener("mouseleave", () => {
                window.gsap.to(card, {
                    y: 0,
                    duration: 0.34,
                    ease: "power2.out"
                });
            });
        });
    }

    /* ===============================
       QUESTION LIST MOTION
       =============================== */

    function initServiceQuestionMotion() {
        const items = document.querySelectorAll(".service-question-list li");

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
                    x: 6,
                    duration: 0.28,
                    ease: "power2.out"
                });
            });

            item.addEventListener("mouseleave", () => {
                window.gsap.to(item, {
                    x: 0,
                    duration: 0.34,
                    ease: "power2.out"
                });
            });
        });
    }
})();