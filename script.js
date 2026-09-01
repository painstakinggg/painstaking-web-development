/* =========================================================
   PAINSTAKING WEB DEVELOPMENT
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!navLinks || !menuToggle) {
            return;
        }

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            navLinks.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, .project-card, .about-card, .process-step, .price-card, .contact-form"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

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
        ".pricing-grid .price-card",
        ".process-grid .process-step"
    ];


    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(selector);

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

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();

                const business =
                    document
                        .getElementById("business")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();

                const service =
                    document
                        .getElementById("service")
                        .value;

                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                if (!name || !email || !message) {

                    formMessage.textContent =
                        "Please fill in your name, email and project details.";

                    formMessage.classList.add("show");

                    return;
                }


                /*
                    Correct Painstaking WhatsApp number:
                    08107348296

                    International format:
                    2348107348296
                */

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
                        "_blank"
                    );

                }, 500);

            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    if (navbar) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 30) {

                    navbar.style.background =
                        "rgba(8, 8, 13, 0.95)";

                } else {

                    navbar.style.background =
                        "rgba(8, 8, 13, 0.82)";

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            navigationLinks.forEach(
                                link => {
                                    link.classList.remove(
                                        "current"
                                    );
                                }
                            );


                            const activeLink =
                                document.querySelector(
                                    `.nav-links a[href="#${entry.target.id}"]`
                                );


                            if (activeLink) {

                                activeLink.classList.add(
                                    "current"
                                );

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

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement("span");

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


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

            }
        );

    });


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const footerCopyright =
        document.querySelector(
            ".footer-bottom span"
        );


    if (footerCopyright) {

        footerCopyright.textContent =
            `© ${new Date().getFullYear()} Painstaking Web Development. All rights reserved.`;

    }

});