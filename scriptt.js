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