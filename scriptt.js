const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

const revealObserver = new IntersectionObserver(
    (entries, observerInstance) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            // If the skills section just revealed, change its header to singular 'Skill'
            if (entry.target.id === 'skills') {
                const label = document.querySelector('#skills .section-label');
                const heading = document.querySelector('#skills .section-header h2');
                if (label) label.textContent = 'Skill';
                if (heading) heading.textContent = 'Skill';
            }
            observerInstance.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
    }
);

const scrollTargets = document.querySelectorAll(".animate-on-scroll");
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
// =========================
// Contact Form
// =========================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Thank you! Your message has been received.");

    contactForm.reset();
    });
}