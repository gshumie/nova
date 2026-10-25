// =========================
// Navigation Menu Toggle
// =========================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// =========================
// Scroll Animations
// =========================
const scrollTargets = document.querySelectorAll(".animate-on-scroll");

if (scrollTargets.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observerInstance.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px",
        }
    );

    scrollTargets.forEach((target) => {
        target.classList.add("reveal");
        revealObserver.observe(target);
    });

    window.addEventListener("load", () => {
        scrollTargets.forEach((target) => {
            if (target.getBoundingClientRect().top < window.innerHeight) {
                target.classList.add("visible");
                revealObserver.unobserve(target);
            }
        });
    });
}

// =========================
// Contact Form (Formspree)
// =========================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusElement = document.getElementById("form-status");
        const originalBtnText = submitBtn ? submitBtn.textContent : "Send Message";

        const formData = new FormData(contactForm);
        const name = (formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const message = (formData.get("message") || "").toString().trim();

        if (!name || !email || !message) {
            if (statusElement) {
                statusElement.textContent = "Please fill in all fields.";
                statusElement.className = "form-status error";
            } else {
                alert("Please fill in all fields.");
            }
            return;
        }

        // Set loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
        }
        if (statusElement) {
            statusElement.textContent = "Sending your message...";
            statusElement.className = "form-status loading";
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                contactForm.reset();
                if (statusElement) {
                    statusElement.textContent = "Thank you! Your message has been sent successfully.";
                    statusElement.className = "form-status success";
                } else {
                    alert("Thank you! Your message has been sent successfully.");
                }
            } else {
                const data = await response.json().catch(() => null);
                let errorMessage = "Oops! There was a problem submitting your form.";
                if (data && data.errors && data.errors.length > 0) {
                    errorMessage = data.errors.map(err => err.message).join(", ");
                }
                if (statusElement) {
                    statusElement.textContent = errorMessage;
                    statusElement.className = "form-status error";
                } else {
                    alert(errorMessage);
                }
            }
        } catch (error) {
            if (statusElement) {
                statusElement.textContent = "Network error. Please check your connection and try again.";
                statusElement.className = "form-status error";
            } else {
                alert("Network error. Please check your connection and try again.");
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        }
    });
}
