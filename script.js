/* ==========================================================================
   Painstaking Web Development — Main Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Blur & Border Effect on Scroll
    const header = document.querySelector('header');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.8)';
            header.style.borderBottomColor = 'rgba(59, 130, 246, 0.3)';
        } else {
            header.style.boxShadow = 'none';
            header.style.borderBottomColor = 'var(--border-color)';
        }
    };

    window.addEventListener('scroll', handleScroll);


    // 2. Smooth Scrolling for Navigation Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Offset calculation for sticky header (~80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // 3. Contact Form Real-Time & Submission Validation
    const contactForm = document.getElementById('projectForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Helper: Validate email format
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Helper: Highlight error on field
        const setFieldError = (element, message) => {
            element.style.borderColor = '#ef4444';
            
            let errorText = element.nextElementSibling;
            if (!errorText || !errorText.classList.contains('error-msg')) {
                errorText = document.createElement('span');
                errorText.className = 'error-msg';
                errorText.style.color = '#ef4444';
                errorText.style.fontSize = '0.75rem';
                errorText.style.marginTop = '0.25rem';
                element.parentNode.insertBefore(errorText, element.nextSibling);
            }
            errorText.textContent = message;
        };

        // Helper: Clear error on field
        const clearFieldError = (element) => {
            element.style.borderColor = 'var(--border-color)';
            const errorText = element.nextElementSibling;
            if (errorText && errorText.classList.contains('error-msg')) {
                errorText.remove();
            }
        };

        // Real-time input cleaning
        [nameInput, emailInput, messageInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => clearFieldError(input));
            }
        });

        // Form Submit Validation Handler
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validate Name
            if (!nameInput.value.trim()) {
                setFieldError(nameInput, 'Please enter your name.');
                isValid = false;
            }

            // Validate Email
            if (!emailInput.value.trim()) {
                setFieldError(emailInput, 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                setFieldError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                setFieldError(messageInput, 'Please provide brief details about your project.');
                isValid = false;
            }

            // If valid, simulate submission
            if (isValid) {
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                setTimeout(() => {
                    alert('Thank you! Your inquiry has been received. We will get back to you within 24 hours.');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1200);
            }
        });
    }

});
