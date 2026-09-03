/* =========================================================
   PAINSTAKING WEB DEVELOPMENT
   Main JavaScript
   Matched to the current index.html and style.css
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!navLinks || !menuToggle) {
            return;
        }

        if (
            navLinks.classList.contains("open") &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });


    /* =====================================================
       ESCAPE KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navLinks &&
            menuToggle
        ) {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, " +
        ".service-card, " +
        ".project-card, " +
        ".about-card, " +
        ".about-content, " +
        ".process-card, " +
        ".pricing-card, " +
        ".contact-form, " +
        ".contact-content"
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       STAGGER ANIMATIONS
    ===================================================== */

    const cardGroups = [
        ".services-grid .service-card",
        ".projects-grid .project-card",
        ".process-grid .process-card",
        ".pricing-grid .pricing-card"
    ];


    cardGroups.forEach(selector => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


    /* =====================================================
       CONTACT FORM → WHATSAPP
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value.trim();

            const business =
                document.getElementById("business")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const service =
                document.getElementById("service")?.value;

            const message =
                document.getElementById("message")?.value.trim();


            if (!name || !email || !service || !message) {

                formMessage.textContent =
                    "Please fill in all required fields.";

                formMessage.classList.add("show");

                return;
            }


            const whatsappNumber =
                "2348107348296";


            const whatsappText =
                `Hello Painstaking Web Development.

Name: ${name}
Business: ${business || "Not provided"}
Email: ${email}
Service: ${service}

Project Details:
${message}`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    whatsappText
                )}`;


            formMessage.textContent =
                "Opening WhatsApp with your project request...";

            formMessage.classList.add("show");


            setTimeout(() => {

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }, 500);

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(5, 7, 11, 0.96)";

            navbar.style.boxShadow =
                "0 10px 35px rgba(0, 0, 0, 0.25)";

        } else {

            navbar.style.background =
                "rgba(8, 8, 13, 0.88)";

            navbar.style.boxShadow =
                "none";

        }

    };


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a.nav-link"
        );


    if (
        "IntersectionObserver" in window &&
        sections.length &&
        navigationLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            navigationLinks.forEach(link => {
                                link.classList.remove("active");
                            });


                            const activeLink =
                                document.querySelector(
                                    `.nav-links a[href="#${entry.target.id}"]`
                                );


                            if (activeLink) {

                                activeLink.classList.add("active");

                            }

                        }

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function(event) {

            const ripple =
                document.createElement("span");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);


            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.position =
                "absolute";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255, 255, 255, 0.12)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            ripple.style.transform =
                "scale(0)";

            ripple.style.animation =
                "buttonRipple 0.5s ease-out";


            this.style.position =
                "relative";

            this.style.overflow =
                "hidden";


            this.appendChild(ripple);


            setTimeout(() => {
                ripple.remove();
            }, 500);

        });

    });


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const footerYear =
        document.getElementById("year");


    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       LOGO IMAGE FALLBACK
       Kept ready for when the logo is added later.
    ===================================================== */

    document.querySelectorAll(".logo img").forEach(logo => {

        logo.addEventListener("error", () => {

            logo.style.display = "none";

        });

    });

});