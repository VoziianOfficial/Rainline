"use strict";

/*
|--------------------------------------------------------------------------
| Rainline Global Site Configuration
|--------------------------------------------------------------------------
| This file stores shared company, contact, navigation, service, legal,
| and footer data. Values from this file will be injected into the website
| by /js/main.js using data attributes.
|
| Load order in HTML:
| 1. /js/config.js
| 2. /js/main.js
| 3. page-specific JS file
|--------------------------------------------------------------------------
*/

const companyName = "Rainline";

window.SITE_CONFIG = {
    companyName,
    companyId: "RLN-GTR-7249",
    brand: {
        shortName: companyName,
        tagline: "Compare local gutter providers with a cleaner request flow.",
        shortTagline: "Gutter matching",
        logoLabel: `${companyName} gutter provider matching platform`
    },

    phone: "+1 888 742 0196",
    phoneHref: "+18887420196",
    phoneLabel: "Compare Gutter Options",

    email: "hello@rainlinematch.com",

    address: {
        line1: "600 Congress Avenue",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "USA",
        full: "600 Congress Avenue, Austin, TX 78701, USA"
    },

    serviceArea: "Independent gutter provider matching across the United States",

    footerText:
        `${companyName} is an independent gutter provider matching platform that helps homeowners compare local provider options for gutter installation, replacement, repair, cleaning, and related rainwater management requests.`,

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        `${companyName} is not a gutter contractor and does not perform gutter installation, repair, replacement, cleaning, inspections, or maintenance work directly. The platform helps homeowners submit project details and compare independent local provider options.`,

    navigation: [
        {
            label: "Home",
            href: "index.html"
        },
        {
            label: "Services",
            href: "services.html"
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    services: [
        {
            id: "gutter-installation",
            title: "Gutter Installation",
            shortTitle: "Installation",
            href: "gutter-installation.html",
            icon: "cloud-rain",
            image: "./assets/images/services/gutter-installation.jpg",
            summary:
                "Compare local providers for new gutter systems, downspouts, drainage flow, and home exterior rainwater management.",
            cardText:
                "Start a structured request for new gutter installation and review provider options based on your location and project type.",
            heroTitle:
                "Compare local gutter installation providers with a cleaner request process.",
            heroText:
                `${companyName} helps homeowners organize gutter installation requests and connect with independent local providers suited to the project details.`,
            pageKicker: "Gutter installation matching",
            pageIntro:
                `New gutter installation can depend on roofline shape, home size, material preferences, downspout placement, and local provider availability. ${companyName} helps homeowners begin with a clear request instead of contacting companies one by one.`,
            evaluationPoints: [
                "Ask which gutter materials and profiles are available for your home.",
                "Review how downspout placement and drainage direction will be planned.",
                "Compare written quote details, warranty information, and project timing.",
                "Confirm license and insurance requirements directly with the provider."
            ]
        },
        {
            id: "gutter-replacement",
            title: "Gutter Replacement",
            shortTitle: "Replacement",
            href: "gutter-replacement.html",
            icon: "refresh-cw",
            image: "./assets/images/services/gutter-replacement.jpg",
            summary:
                "Explore provider options when old, sagging, leaking, or damaged gutters may need to be replaced.",
            cardText:
                "Request quotes from independent providers for gutter replacement based on visible damage, age, and project scope.",
            heroTitle:
                "Find local gutter replacement providers for aging or damaged systems.",
            heroText:
                `Use ${companyName} to compare independent provider options for replacing gutters that may be leaking, pulling away, rusting, or no longer moving water correctly.`,
            pageKicker: "Gutter replacement matching",
            pageIntro:
                `Gutter replacement decisions often depend on the condition of existing gutters, fascia boards, roof edge details, water flow problems, and whether downspouts also need updates. ${companyName} helps organize the first step so providers can better understand the request.`,
            evaluationPoints: [
                "Check whether the provider will inspect the existing gutter line and fascia condition.",
                "Ask whether replacement includes downspouts, outlets, elbows, and drainage extensions.",
                "Compare material options such as aluminum, steel, copper-style finishes, or seamless systems.",
                "Request a written scope before approving any project."
            ]
        },
        {
            id: "gutter-repair",
            title: "Gutter Repair",
            shortTitle: "Repair",
            href: "gutter-repair.html",
            icon: "wrench",
            image: "./assets/images/services/gutter-repair.jpg",
            summary:
                "Connect with local providers for gutter leaks, loose sections, separated joints, overflow issues, and minor damage.",
            cardText:
                "Describe visible gutter problems and compare providers who may handle repair-focused requests in your area.",
            heroTitle:
                "Compare gutter repair providers for leaks, loose sections, and overflow issues.",
            heroText:
                `${companyName} helps homeowners submit repair details and connect with independent local providers who may evaluate gutter problems.`,
            pageKicker: "Gutter repair matching",
            pageIntro:
                "Gutter repair needs can range from small seam leaks to loose hangers, separated sections, slope problems, or overflow during rain. A structured request can help providers understand the issue before follow-up.",
            evaluationPoints: [
                "Share where the gutter is leaking, overflowing, or pulling away.",
                "Ask whether the provider repairs seams, hangers, joints, end caps, and downspouts.",
                "Confirm whether photos can help providers assess the request.",
                "Compare repair quotes against replacement recommendations when appropriate."
            ]
        },
        {
            id: "gutter-cleaning",
            title: "Gutter Cleaning",
            shortTitle: "Cleaning",
            href: "gutter-cleaning.html",
            icon: "droplets",
            image: "./assets/images/services/gutter-cleaning.jpg",
            summary:
                "Request local provider options for gutter cleaning, debris removal, downspout clearing, and seasonal maintenance.",
            cardText:
                "Compare local gutter cleaning providers for seasonal buildup, clogged downspouts, and overflow concerns.",
            heroTitle:
                "Connect with local gutter cleaning providers for clearer water flow.",
            heroText:
                `${companyName} helps homeowners compare independent provider options for gutter cleaning and related maintenance requests.`,
            pageKicker: "Gutter cleaning matching",
            pageIntro:
                `Leaves, roof debris, pine needles, and blocked downspouts can affect how gutters move rainwater away from the home. ${companyName} helps homeowners start a simple request and compare local provider availability.`,
            evaluationPoints: [
                "Ask whether downspouts are included in the cleaning request.",
                "Confirm whether debris removal and cleanup are part of the quote.",
                "Mention roof height, gutter access, and visible clog locations.",
                "Compare seasonal cleaning availability and service terms."
            ]
        }
    ],

    footerLinks: {
        main: [
            {
                label: "Home",
                href: "index.html"
            },
            {
                label: "Services",
                href: "services.html"
            },
            {
                label: "About",
                href: "about.html"
            },
            {
                label: "Contact",
                href: "contact.html"
            }
        ],

        services: [
            {
                label: "Gutter Installation",
                href: "gutter-installation.html"
            },
            {
                label: "Gutter Replacement",
                href: "gutter-replacement.html"
            },
            {
                label: "Gutter Repair",
                href: "gutter-repair.html"
            },
            {
                label: "Gutter Cleaning",
                href: "gutter-cleaning.html"
            }
        ],

        legal: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            }
        ]
    },

    forms: {
        contactFormTitle: "Start a gutter provider matching request",
        contactFormText:
            `Share a few details about your gutter project. ${companyName} may help connect you with independent local providers based on your request and service area.`,
        consentText:
            `I agree to be contacted about my gutter request and understand that ${companyName} is a matching platform, not a direct contractor.`,
        successMessage:
            "Thank you. Your request has been prepared. A matching flow would continue from here.",
        errorMessage:
            "Please complete the required fields before submitting your request."
    },

    cookieBanner: {
        storageKey: "rainline_policy_choice",
        title: "Privacy & site policies",
        text:
            `${companyName} uses essential site functionality and policy notices to support a clear provider-matching experience. Please review the legal pages before continuing.`,
        acceptLabel: "Accept",
        declineLabel: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            }
        ]
    },

    faq: [
        {
            question: `Is ${companyName} a gutter contractor?`,
            answer:
                `No. ${companyName} is not a gutter contractor and does not perform gutter installation, replacement, repair, cleaning, or maintenance directly. ${companyName} helps homeowners connect with independent local providers.`
        },
        {
            question: "How do I compare local gutter providers?",
            answer:
                "Homeowners can compare providers by reviewing quote details, service scope, timing, materials, licensing, insurance, warranties, and whether the provider serves their area."
        },
        {
            question: "Are quotes from gutter providers usually free?",
            answer:
                "Many providers may offer free estimates, but quote policies can vary. Homeowners should confirm estimate terms directly with each independent provider."
        },
        {
            question: "What affects gutter project pricing?",
            answer:
                "Pricing may depend on home size, gutter length, material type, roofline complexity, downspout placement, access conditions, repairs, and local provider rates."
        },
        {
            question: "How do I know if a provider serves my area?",
            answer:
                `Provider availability can vary by ZIP code, city, and project type. ${companyName} helps organize your request so relevant local provider options may be identified.`
        }
    ],

    socialProof: {
        eyebrow: "Matching platform",
        title: "A calmer way to begin a gutter project.",
        items: [
            {
                label: "Service categories",
                value: "4",
                text: "Installation, replacement, repair, and cleaning request paths."
            },
            {
                label: "Platform model",
                value: "Independent",
                text: `${companyName} helps connect homeowners with local providers.`
            },
            {
                label: "User focus",
                value: "Quote-ready",
                text: "Structured project details help make provider follow-up clearer."
            }
        ]
    }
};
