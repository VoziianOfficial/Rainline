"use strict";

/* ==========================================================
   RAINLINE — CONTACT PAGE SCRIPT
   File: /js/contact.js
   ========================================================== */

(function () {
    document.addEventListener("DOMContentLoaded", initContactPage);

    function initContactPage() {
        syncContactConfig();
        initContactHeroMotion();
        initContactMapMotion();
        initContactBlocksMotion();
    }

    function syncContactConfig() {
        const config = window.SITE_CONFIG;

        if (!config || !config.address || !config.address.full) {
            return;
        }

        const iframe = document.querySelector("[data-map-embed]");

        if (!iframe) {
            return;
        }

        const query = encodeURIComponent(config.address.full);
        iframe.setAttribute("src", `https://www.google.com/maps?q=${query}&output=embed`);
        iframe.setAttribute("title", `Rainline reference map - ${config.address.city} ${config.address.state}`);
        iframe.setAttribute("aria-label", `Map showing ${config.address.full}`);
    }

    /* ===============================
       HERO CARD MOTION
       =============================== */

    function initContactHeroMotion() {
        const hero = document.querySelector(".contact-hero");
        const card = document.querySelector(".contact-hero-card");
        const miniItems = document.querySelectorAll(".contact-hero-mini article");

        if (!hero || !card || !window.gsap) {
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

            window.gsap.to(card, {
                x: x * 12,
                y: y * 9,
                rotateY: x * 3,
                rotateX: y * -3,
                transformPerspective: 900,
                duration: 0.75,
                ease: "power2.out"
            });

            miniItems.forEach((item, index) => {
                window.gsap.to(item, {
                    x: x * (5 + index * 2),
                    y: y * (4 + index),
                    duration: 0.75,
                    ease: "power2.out"
                });
            });
        });

        hero.addEventListener("mouseleave", () => {
            window.gsap.to(card, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.85,
                ease: "power2.out"
            });

            miniItems.forEach((item) => {
                window.gsap.to(item, {
                    x: 0,
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out"
                });
            });
        });
    }

    /* ===============================
       MAP MOTION
       =============================== */

    function initContactMapMotion() {
        const section = document.querySelector(".contact-area");
        const map = document.querySelector(".contact-map");
        const pin = document.querySelector(".map-pin-card");

        if (!section || !map || !window.gsap) {
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

            window.gsap.to(map, {
                x: x * 8,
                y: y * 6,
                rotateY: x * 2,
                rotateX: y * -2,
                transformPerspective: 900,
                duration: 0.75,
                ease: "power2.out"
            });

            if (pin) {
                window.gsap.to(pin, {
                    xPercent: -50,
                    yPercent: -50,
                    x: x * -12,
                    y: y * -10,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }
        });

        section.addEventListener("mouseleave", () => {
            window.gsap.to(map, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.85,
                ease: "power2.out"
            });

            if (pin) {
                window.gsap.to(pin, {
                    xPercent: -50,
                    yPercent: -50,
                    x: 0,
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out"
                });
            }
        });
    }

    /* ===============================
       CONTACT BLOCKS MICRO MOTION
       =============================== */

    function initContactBlocksMotion() {
        const items = document.querySelectorAll(
            ".contact-methods a, .contact-area-list article, .contact-expect-grid article"
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
