"use strict";



(function () {
    document.addEventListener("DOMContentLoaded", initLegalPage);

    function initLegalPage() {
        initLegalSidebarSpy();
        initLegalSmoothLinks();
        initLegalCtaMotion();
        initLegalDocumentMotion();
    }



    function initLegalSidebarSpy() {
        const links = Array.from(document.querySelectorAll(".legal-sidebar-card a"));
        const sections = links
            .map((link) => {
                const id = link.getAttribute("href");

                if (!id || !id.startsWith("#")) {
                    return null;
                }

                return document.querySelector(id);
            })
            .filter(Boolean);

        if (!links.length || !sections.length || !("IntersectionObserver" in window)) {
            return;
        }

        const setActiveLink = (id) => {
            links.forEach((link) => {
                const isActive = link.getAttribute("href") === `#${id}`;

                link.classList.toggle("is-active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (!visibleEntries.length) {
                    return;
                }

                setActiveLink(visibleEntries[0].target.id);
            },
            {
                root: null,
                threshold: [0.2, 0.35, 0.5],
                rootMargin: "-18% 0px -62% 0px"
            }
        );

        sections.forEach((section) => observer.observe(section));
    }



    function initLegalSmoothLinks() {
        const links = document.querySelectorAll(".legal-sidebar-card a[href^='#']");

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");
                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }



    function initLegalCtaMotion() {
        const cta = document.querySelector(".legal-cta-shell");

        if (!cta || !window.gsap) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        cta.addEventListener("mousemove", (event) => {
            const rect = cta.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            window.gsap.to(cta, {
                rotateY: x * 1.4,
                rotateX: y * -1.4,
                transformPerspective: 900,
                duration: 0.55,
                ease: "power2.out"
            });
        });

        cta.addEventListener("mouseleave", () => {
            window.gsap.to(cta, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: "power2.out"
            });
        });
    }



    function initLegalDocumentMotion() {
        const blocks = document.querySelectorAll(".legal-block, .legal-disclaimer-box");

        if (!blocks.length || !window.gsap) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return;
        }

        blocks.forEach((block) => {
            block.addEventListener("mouseenter", () => {
                window.gsap.to(block, {
                    x: 4,
                    duration: 0.26,
                    ease: "power2.out"
                });
            });

            block.addEventListener("mouseleave", () => {
                window.gsap.to(block, {
                    x: 0,
                    duration: 0.34,
                    ease: "power2.out"
                });
            });
        });
    }
})();