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
// Contact Form
// =========================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector("textarea").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const recipient = "getasewshumie@gmail.com";
        const subject = `Website inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const gmailComposeUrl = new URL("https://mail.google.com/mail/");
        gmailComposeUrl.search = new URLSearchParams({
            view: "cm",
            fs: "1",
            to: recipient,
            su: subject,
            body,
        }).toString();

        window.location.assign(gmailComposeUrl.toString());
    });
}
