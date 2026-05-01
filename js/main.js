"use strict";



(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing. Make sure /js/config.js loads before /js/main.js.");
        return;
    }

    const selectors = {
        body: document.body,
        headerMount: "[data-site-header]",
        footerMount: "[data-site-footer]",
        policyMount: "[data-policy-banner]",
        faqMount: "[data-faq-list]",
        faqSchemaMount: "[data-faq-schema]",
        serviceCardsMount: "[data-service-cards]",
        companyName: "[data-company-name]",
        companyId: "[data-company-id]",
        phoneText: "[data-phone-text]",
        phoneNumberText: "[data-phone-number]",
        phoneLink: "[data-phone-link]",
        emailText: "[data-email-text]",
        emailLink: "[data-email-link]",
        addressText: "[data-address-text]",
        footerText: "[data-footer-text]",
        disclaimer: "[data-disclaimer]",
        legalNotice: "[data-legal-notice]",
        serviceArea: "[data-service-area]"
    };

    const state = {
        isMenuOpen: false
    };

    document.addEventListener("DOMContentLoaded", init);
    applyPageMeta();

    function init() {
        renderHeader();
        renderFooter();
        renderPolicyBanner();

        syncFixedHeaderOffset();
        injectConfigValues();
        autoReplaceCompanyNameInLegalPages();
        setActiveNavigation();
        initHeaderScroll();
        initMobileMenu();
        initPolicyBanner();
        initFaqAccordions();
        initRevealAnimations();
        initScrollLineMotion();
        initServiceCards();
        initFormValidation();
        initExternalLibraries();
        preventHorizontalScroll();
    }

    function applyPageMeta() {
        if (!config.pageMeta) {
            return;
        }

        const currentPage = normalizePath(window.location.pathname);
        const pageMetaForCurrentPage = config.pageMeta[currentPage];

        if (!pageMetaForCurrentPage) {
            console.warn(`pageMeta is missing for ${currentPage}.`);
        }

        const meta = pageMetaForCurrentPage || config.pageMeta["index.html"];

        if (!meta) {
            return;
        }

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let descriptionTag = document.querySelector('meta[name="description"]');

            if (!descriptionTag) {
                descriptionTag = document.createElement("meta");
                descriptionTag.setAttribute("name", "description");
                document.head.append(descriptionTag);
            }

            descriptionTag.setAttribute("content", meta.description);
        }
    }



    function qs(selector, parent = document) {
        return parent.querySelector(selector);
    }

    function qsa(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    }

    function createIcon(name) {
        return `<i data-lucide="${name}" aria-hidden="true"></i>`;
    }

    function normalizePath(path) {
        const cleanPath = path.split("/").pop();

        if (!cleanPath || cleanPath === "/") {
            return "index.html";
        }

        return cleanPath;
    }

    function isCurrentPage(href) {
        const current = normalizePath(window.location.pathname);
        const target = normalizePath(href);

        return current === target || (current === "" && target === "index.html");
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function lockBody() {
        document.body.classList.add("menu-open");
    }

    function unlockBody() {
        document.body.classList.remove("menu-open");
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }



    function getLogoMarkup() {
        const brandName = config.brand?.shortName || config.companyName;
        const brandTagline = config.brand?.shortTagline || config.brand?.tagline || "Gutter matching";
        const logoLabel = config.brand?.logoLabel || `${brandName} home`;

        return `
        <a href="index.html" class="brand" aria-label="${escapeHtml(logoLabel)}">
            <span class="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" role="img">
                    <path
                        d="M10 36.5L31.4 17.5C32.2 16.8 33.4 16.8 34.2 17.5L55 36.5"
                        stroke="currentColor"
                        stroke-width="3.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M17.5 36.5H51"
                        stroke="currentColor"
                        stroke-width="3.4"
                        stroke-linecap="round"
                    />
                    <path
                        d="M39.8 42.5C39.8 48.2 36 51.7 31.9 51.7C27.8 51.7 24.3 48.2 24.3 44.3C24.3 38.9 31.9 30.7 31.9 30.7C31.9 30.7 39.8 38.3 39.8 42.5Z"
                        fill="currentColor"
                        opacity="0.9"
                    />
                </svg>
            </span>

            <span class="brand-copy">
                <span class="brand-name">${escapeHtml(brandName)}</span>
                <span class="brand-tagline">${escapeHtml(brandTagline)}</span>
            </span>
        </a>
    `;
    }



    function renderHeader() {
        const existingHeader = qs(".site-header");

        if (existingHeader) {
            return;
        }

        const mount = qs(selectors.headerMount);
        const header = document.createElement("header");
        const serviceLinks = config.services
            .map((service) => {
                return `
                    <a class="desktop-subnav-link" href="${escapeHtml(service.href)}">
                        ${createIcon(service.icon)}
                        <span>${escapeHtml(service.title)}</span>
                    </a>
                `;
            })
            .join("");

        header.className = "site-header";
        header.setAttribute("data-header", "");
        header.innerHTML = `
            <div class="container-wide header-shell">
                ${getLogoMarkup()}

                <nav class="desktop-nav" aria-label="Main navigation">
                    ${config.navigation
                .map((item) => {
                    if (item.href === "services.html") {
                        return `
                                <div class="desktop-nav-item desktop-nav-item-services">
                                    <a href="${item.href}" class="desktop-nav-link-with-caret">
                                        ${escapeHtml(item.label)}
                                        ${createIcon("chevron-down")}
                                    </a>

                                    <div class="desktop-subnav" aria-label="Service pages">
                                        ${serviceLinks}
                                    </div>
                                </div>
                            `;
                    }

                    return `
                                <a href="${item.href}">
                                    ${escapeHtml(item.label)}
                                </a>
                            `;
                })
                .join("")}
                </nav>

                <div class="header-actions">
                    <a
                        href="mailto:${escapeHtml(config.email)}"
                        class="header-mail-cta"
                        aria-label="Write to ${escapeHtml(config.companyName)} by email"
                        data-email-link
                    >
                        ${createIcon("mail")}
                    </a>

                    <a
                        href="tel:${escapeHtml(config.phoneHref)}"
                        class="btn header-cta"
                        data-phone-link
                    >
                        ${createIcon("phone")}
                        <span data-phone-text>${escapeHtml(config.phoneLabel)}</span>
                    </a>

                    <a
                        href="tel:${escapeHtml(config.phoneHref)}"
                        class="mobile-phone-cta"
                        aria-label="Call ${escapeHtml(config.companyName)}"
                        data-phone-link
                    >
                        ${createIcon("phone")}
                    </a>

                    <button
                        class="menu-toggle"
                        type="button"
                        aria-label="Open mobile menu"
                        aria-expanded="false"
                        aria-controls="mobileMenu"
                        data-menu-toggle
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        `;

        if (mount) {
            mount.replaceWith(header);
        } else {
            document.body.prepend(header);
        }

        renderMobileMenu();
    }

    function syncFixedHeaderOffset() {
        const header = qs(".site-header");

        if (!header) {
            return;
        }

        document.body.classList.add("has-fixed-header");

        const updateOffset = () => {
            document.documentElement.style.setProperty("--header-offset", `${header.offsetHeight}px`);
        };

        updateOffset();
        window.addEventListener("resize", updateOffset, { passive: true });
    }



    function renderMobileMenu() {
        const existingMenu = qs("#mobileMenu");

        if (existingMenu) {
            return;
        }

        const menu = document.createElement("div");

        menu.className = "mobile-menu";
        menu.id = "mobileMenu";
        menu.setAttribute("aria-hidden", "true");
        menu.innerHTML = `
            <div class="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                <div class="mobile-menu-top">
                    <div>
                        <p class="mobile-menu-title">${escapeHtml(config.companyName)}</p>
                        <p class="mobile-menu-subtitle">${escapeHtml(config.brand.tagline)}</p>
                    </div>
                </div>

                <div>
                    <nav class="mobile-nav" aria-label="Mobile navigation">
                        ${config.navigation
                .map((item) => {
                    return `
                                    <a href="${item.href}">
                                        <span>${escapeHtml(item.label)}</span>
                                        ${createIcon("arrow-right")}
                                    </a>
                                `;
                })
                .join("")}
                    </nav>

                    <div class="mobile-services" aria-label="Service pages">
                        ${config.services
                .map((service) => {
                    return `
                                    <a class="mobile-service-link" href="${service.href}">
                                        ${createIcon(service.icon)}
                                        <span>${escapeHtml(service.title)}</span>
                                    </a>
                                `;
                })
                .join("")}
                    </div>
                </div>

                <div class="mobile-contact">
                    <a href="tel:${escapeHtml(config.phoneHref)}" data-phone-link>
                        ${createIcon("phone")}
                        <span data-phone-number>${escapeHtml(config.phone)}</span>
                    </a>

                    <a href="mailto:${escapeHtml(config.email)}" data-email-link>
                        ${createIcon("mail")}
                        <span data-email-text>${escapeHtml(config.email)}</span>
                    </a>
                </div>
            </div>
        `;

        document.body.append(menu);
    }



    function renderFooter() {
        const existingFooter = qs(".site-footer");

        if (existingFooter) {
            return;
        }

        const mount = qs(selectors.footerMount);
        const footer = document.createElement("footer");

        footer.className = "site-footer";
        footer.innerHTML = `
            <div class="container-wide footer-shell">
                <div class="footer-top">
                    <div class="footer-brand">
                        ${getLogoMarkup()}

                        <p data-footer-text>
                            ${escapeHtml(config.footerText)}
                        </p>

                        <div class="footer-meta">
                            <span>
                                <strong data-company-name>${escapeHtml(config.companyName)}</strong>
                                <span> · </span>
                                <span data-company-id>${escapeHtml(config.companyId)}</span>
                            </span>

                            <span data-address-text>${escapeHtml(config.address.full)}</span>
                            <span data-service-area>${escapeHtml(config.serviceArea)}</span>
                        </div>
                    </div>

                    <div class="footer-cols">
                        <div class="footer-col">
                            <h3>Navigation</h3>
                            <ul>
                                ${config.footerLinks.main
                .map((link) => {
                    return `
                                            <li>
                                                <a href="${link.href}">${escapeHtml(link.label)}</a>
                                            </li>
                                        `;
                })
                .join("")}
                            </ul>
                        </div>

                        <div class="footer-col">
                            <h3>Gutter requests</h3>
                            <ul>
                                ${config.footerLinks.services
                .map((link) => {
                    return `
                                            <li>
                                                <a href="${link.href}">${escapeHtml(link.label)}</a>
                                            </li>
                                        `;
                })
                .join("")}
                            </ul>
                        </div>

                        <div class="footer-col">
                            <h3>Legal</h3>
                            <ul>
                                ${config.footerLinks.legal
                .map((link) => {
                    return `
                                            <li>
                                                <a href="${link.href}">${escapeHtml(link.label)}</a>
                                            </li>
                                        `;
                })
                .join("")}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="footer-disclaimer">
                    <p data-legal-notice>${escapeHtml(config.legalNotice)}</p>
                    <p data-disclaimer>${escapeHtml(config.disclaimer)}</p>
                </div>

                <div class="footer-bottom">
                    <span>
                        © <span data-current-year></span>
                        <span data-company-name>${escapeHtml(config.companyName)}</span>
                        (<span data-company-id>${escapeHtml(config.companyId)}</span>)
                        <span> · </span>
                        <span data-address-text>${escapeHtml(config.address.full)}</span>.
                        Independent provider matching platform.
                    </span>

                    <a href="tel:${escapeHtml(config.phoneHref)}" data-phone-link>
                        ${escapeHtml(config.phone)}
                    </a>
                </div>
            </div>
        `;

        if (mount) {
            mount.replaceWith(footer);
        } else {
            document.body.append(footer);
        }
    }



    function renderPolicyBanner() {
        const existingBanner = qs(".policy-banner");

        if (existingBanner) {
            return;
        }

        const mount = qs(selectors.policyMount);
        const banner = document.createElement("aside");

        banner.className = "policy-banner";
        banner.setAttribute("data-policy-banner-box", "");
        banner.setAttribute("aria-label", "Privacy and policy notice");

        banner.innerHTML = `
            <div class="policy-banner-card">
                <div>
                    <h2>${escapeHtml(config.cookieBanner.title)}</h2>
                    <p>${escapeHtml(config.cookieBanner.text)}</p>

                    <div class="policy-links">
                        ${config.cookieBanner.links
                .map((link) => {
                    return `
                                    <a href="${link.href}">
                                        ${escapeHtml(link.label)}
                                    </a>
                                `;
                })
                .join("")}
                    </div>
                </div>

                <div class="policy-actions">
                    <button class="btn btn-secondary" type="button" data-policy-decline>
                        ${escapeHtml(config.cookieBanner.declineLabel)}
                    </button>

                    <button class="btn" type="button" data-policy-accept>
                        ${escapeHtml(config.cookieBanner.acceptLabel)}
                    </button>
                </div>
            </div>
        `;

        if (mount) {
            mount.replaceWith(banner);
        } else {
            document.body.append(banner);
        }
    }



    function injectConfigValues() {
        qsa(selectors.companyName).forEach((element) => {
            element.textContent = config.companyName;
        });

        qsa(selectors.companyId).forEach((element) => {
            element.textContent = config.companyId;
        });

        qsa(selectors.phoneText).forEach((element) => {
            element.textContent = config.phoneLabel || config.phone;
        });

        qsa(selectors.phoneNumberText).forEach((element) => {
            element.textContent = config.phone;
        });

        qsa(selectors.phoneLink).forEach((element) => {
            element.setAttribute("href", `tel:${config.phoneHref}`);
        });

        qsa(selectors.emailText).forEach((element) => {
            element.textContent = config.email;
        });

        qsa(selectors.emailLink).forEach((element) => {
            element.setAttribute("href", `mailto:${config.email}`);
        });

        qsa(selectors.addressText).forEach((element) => {
            element.textContent = config.address.full;
        });

        qsa(selectors.footerText).forEach((element) => {
            element.textContent = config.footerText;
        });

        qsa(selectors.disclaimer).forEach((element) => {
            element.textContent = config.disclaimer;
        });

        qsa(selectors.legalNotice).forEach((element) => {
            element.textContent = config.legalNotice;
        });

        qsa(selectors.serviceArea).forEach((element) => {
            element.textContent = config.serviceArea;
        });

        qsa("[data-current-year]").forEach((element) => {
            element.textContent = new Date().getFullYear();
        });
    }

    function autoReplaceCompanyNameInLegalPages() {
        if (!document.body.classList.contains("legal-page")) {
            return;
        }

        const companyName = config.companyName;

        if (!companyName || typeof companyName !== "string") {
            return;
        }

        const roots = qsa(".legal-hero, .legal-document, .legal-cta-shell");

        if (!roots.length) {
            return;
        }

        const replaceInRoot = (root) => {
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    if (!node || !node.parentElement) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    const parent = node.parentElement;

                    if (parent.closest("script, style, noscript")) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (!node.nodeValue || !node.nodeValue.includes("Rainline")) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            });

            const nodes = [];

            while (walker.nextNode()) {
                nodes.push(walker.currentNode);
            }

            nodes.forEach((textNode) => {
                const original = textNode.nodeValue;

                if (!original) {
                    return;
                }

                const next = original
                    .replaceAll("Rainline’s", `${companyName}’s`)
                    .replaceAll("Rainline's", `${companyName}'s`)
                    .replaceAll("Rainline", companyName);

                if (next !== original) {
                    textNode.nodeValue = next;
                }
            });
        };

        roots.forEach(replaceInRoot);
    }



    function setActiveNavigation() {
        const isServiceDetailPage = config.services.some((service) => isCurrentPage(service.href));

        qsa(".desktop-nav a, .mobile-nav a, .footer-col a").forEach((link) => {
            const href = link.getAttribute("href");

            if (href && (isCurrentPage(href) || (href === "services.html" && isServiceDetailPage))) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }
        });
    }

 

    function initHeaderScroll() {
        const header = qs("[data-header]");

        if (!header) {
            return;
        }

        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }



    function initMobileMenu() {
        const toggle = qs("[data-menu-toggle]");
        const menu = qs("#mobileMenu");

        if (!toggle || !menu) {
            return;
        }

        const focusableSelector = "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])";

        function openMenu() {
            state.isMenuOpen = true;

            toggle.classList.add("is-active");
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close mobile menu");

            menu.classList.add("is-open");
            menu.setAttribute("aria-hidden", "false");

            lockBody();

            const firstFocusable = qs(focusableSelector, menu);

            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 80);
            }
        }

        function closeMenu() {
            state.isMenuOpen = false;

            toggle.classList.remove("is-active");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open mobile menu");

            menu.classList.remove("is-open");
            menu.setAttribute("aria-hidden", "true");

            unlockBody();
        }

        toggle.addEventListener("click", () => {
            if (state.isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        qsa("a", menu).forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && state.isMenuOpen) {
                closeMenu();
                toggle.focus();
            }
        });

        menu.addEventListener("click", (event) => {
            if (event.target === menu) {
                closeMenu();
            }
        });

        menu.addEventListener("keydown", (event) => {
            if (event.key !== "Tab" || !state.isMenuOpen) {
                return;
            }

            const focusable = qsa(focusableSelector, menu);

            if (!focusable.length) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }

            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }



    function initPolicyBanner() {
        const banner = qs("[data-policy-banner-box]");
        const acceptButton = qs("[data-policy-accept]");
        const declineButton = qs("[data-policy-decline]");
        const storageKey = config.cookieBanner.storageKey;

        if (!banner || !acceptButton || !declineButton) {
            return;
        }

        const savedChoice = localStorage.getItem(storageKey);

        if (!savedChoice) {
            banner.classList.add("is-visible");
        }

        acceptButton.addEventListener("click", () => {
            localStorage.setItem(storageKey, "accepted");
            banner.classList.remove("is-visible");
        });

        declineButton.addEventListener("click", () => {
            localStorage.setItem(storageKey, "declined");
            banner.classList.remove("is-visible");
        });
    }



    function initFaqAccordions() {
        const faqMounts = qsa(selectors.faqMount);

        faqMounts.forEach((mount) => {
            if (!mount.children.length) {
                mount.innerHTML = getFaqMarkup(config.faq);
            }
        });

        qsa(".faq-question").forEach((button) => {
            button.addEventListener("click", () => {
                const item = button.closest(".faq-item");

                if (!item) {
                    return;
                }

                const list = item.parentElement;
                const isOpen = item.classList.contains("is-open");

                qsa(".faq-item", list).forEach((faqItem) => {
                    faqItem.classList.remove("is-open");

                    const faqButton = qs(".faq-question", faqItem);

                    if (faqButton) {
                        faqButton.setAttribute("aria-expanded", "false");
                    }
                });

                if (!isOpen) {
                    item.classList.add("is-open");
                    button.setAttribute("aria-expanded", "true");
                }
            });
        });

        renderFaqSchema();
        refreshIcons();
    }

    function getFaqMarkup(items) {
        return items
            .map((item, index) => {
                const answerId = `faq-answer-${index + 1}`;

                return `
                    <article class="faq-item">
                        <button
                            class="faq-question"
                            type="button"
                            aria-expanded="false"
                            aria-controls="${answerId}"
                        >
                            <span>${escapeHtml(item.question)}</span>
                            ${createIcon("chevron-down")}
                        </button>

                        <div class="faq-answer" id="${answerId}">
                            <div class="faq-answer-inner">
                                <p>${escapeHtml(item.answer)}</p>
                            </div>
                        </div>
                    </article>
                `;
            })
            .join("");
    }

    function renderFaqSchema() {
        const shouldRenderSchema = document.body.hasAttribute("data-has-faq-schema") || qs(selectors.faqSchemaMount);

        if (!shouldRenderSchema) {
            return;
        }

        const existingJsonLd = qsa('script[type="application/ld+json"]');
        const hasFaqSchemaAlready = existingJsonLd.some((script) => {
            const raw = (script.textContent || "").trim();

            if (!raw) {
                return false;
            }

            try {
                const parsed = JSON.parse(raw);
                const stack = Array.isArray(parsed) ? [...parsed] : [parsed];

                while (stack.length) {
                    const value = stack.pop();

                    if (!value || typeof value !== "object") {
                        continue;
                    }

                    const typeValue = value["@type"];

                    if (typeValue === "FAQPage" || (Array.isArray(typeValue) && typeValue.includes("FAQPage"))) {
                        return true;
                    }

                    Object.values(value).forEach((child) => {
                        if (child && typeof child === "object") {
                            stack.push(child);
                        }
                    });
                }
            } catch {
                return raw.includes("FAQPage");
            }

            return false;
        });

        if (hasFaqSchemaAlready) {
            return;
        }

        const existingSchema = qs('script[data-generated-faq-schema="true"]');

        if (existingSchema) {
            return;
        }

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": config.faq.map((item) => {
                return {
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item.answer
                    }
                };
            })
        };

        const script = document.createElement("script");

        script.type = "application/ld+json";
        script.setAttribute("data-generated-faq-schema", "true");
        script.textContent = JSON.stringify(schema);

        document.head.append(script);
    }



    function initServiceCards() {
        const mounts = qsa(selectors.serviceCardsMount);

        mounts.forEach((mount) => {
            if (mount.children.length) {
                return;
            }

            mount.innerHTML = config.services
                .map((service) => {
                    return `
                        <article class="service-card">
                            <a href="${service.href}" class="service-card-link" aria-label="${escapeHtml(service.title)}">
                                <img src="${service.image}" alt="${escapeHtml(service.title)}">
                                <span class="service-card-shade"></span>

                                <span class="service-card-icon">
                                    ${createIcon(service.icon)}
                                </span>

                                <span class="service-card-content">
                                    <span>${escapeHtml(service.shortTitle)}</span>
                                    <strong>${escapeHtml(service.title)}</strong>
                                    <em>${escapeHtml(service.cardText)}</em>
                                </span>

                                <span class="service-card-arrow">
                                    ${createIcon("arrow-right")}
                                </span>
                            </a>
                        </article>
                    `;
                })
                .join("");
        });

        refreshIcons();
    }



    function initFormValidation() {
        qsa("[data-form]").forEach((form) => {
            const message = qs("[data-form-message]", form);

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const requiredFields = qsa("[required]", form);
                const isValid = requiredFields.every((field) => {
                    if (field.type === "checkbox") {
                        return field.checked;
                    }

                    return field.value.trim().length > 0;
                });

                requiredFields.forEach((field) => {
                    const isFieldValid = field.type === "checkbox" ? field.checked : field.value.trim().length > 0;

                    field.classList.toggle("is-invalid", !isFieldValid);
                    field.setAttribute("aria-invalid", String(!isFieldValid));
                });

                if (!message) {
                    return;
                }

                message.classList.add("is-visible");
                message.classList.toggle("is-success", isValid);
                message.classList.toggle("is-error", !isValid);
                message.textContent = isValid ? config.forms.successMessage : config.forms.errorMessage;

                if (isValid) {
                    form.reset();
                }
            });
        });
    }


    function initRevealAnimations() {
        const elements = qsa(".reveal-up, .reveal-fade, .reveal-line");

        if (!elements.length) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.16,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        elements.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
            observer.observe(element);
        });
    }

 

    function initScrollLineMotion() {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const targets = qsa(".replacement-gauge, .service-flow-overview, .repair-issue-map");

        if (!targets.length) {
            return;
        }

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
        let rafId = null;

        const update = () => {
            rafId = null;
            const viewportHeight = window.innerHeight || 1;

            targets.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const total = viewportHeight + rect.height;
                const progress = clamp((viewportHeight - rect.top) / total, 0, 1);

                const shiftX = (progress - 0.5) * 140;
                element.style.setProperty("--line-scroll-x", `${shiftX.toFixed(2)}px`);
            });
        };

        const requestUpdate = () => {
            if (rafId !== null) {
                return;
            }

            rafId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate, { passive: true });
    }



    function initExternalLibraries() {
        refreshIcons();

        if (window.AOS && typeof window.AOS.init === "function") {
            window.AOS.init({
                duration: 760,
                easing: "ease-out-cubic",
                once: true,
                offset: 80
            });
        }

        if (window.gsap) {
            initGsapMicroMotion();
        }
    }

    function initGsapMicroMotion() {
        const cards = qsa(".info-card, .service-card-link, .surface-card");

        cards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateX = ((y / rect.height) - 0.5) * -4;
                const rotateY = ((x / rect.width) - 0.5) * 4;

                window.gsap.to(card, {
                    rotateX,
                    rotateY,
                    transformPerspective: 900,
                    transformOrigin: "center",
                    duration: 0.35,
                    ease: "power2.out"
                });
            });

            card.addEventListener("mouseleave", () => {
                window.gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

 

    function preventHorizontalScroll() {
        document.documentElement.classList.add("no-horizontal-scroll");
        document.body.classList.add("no-horizontal-scroll");

        const resizeObserver = new ResizeObserver(() => {
            const pageWidth = document.documentElement.clientWidth;

            qsa("body *").forEach((element) => {
                const rect = element.getBoundingClientRect();

                if (rect.width > pageWidth + 2) {
                    element.style.maxWidth = "100%";
                }
            });
        });

        resizeObserver.observe(document.body);
    }
})();
