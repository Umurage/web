// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector(".theme-toggle");

    body.classList.toggle("dark-mode");

    // Save theme preference
    localStorage.setItem(
        "theme",
        body.classList.contains("dark-mode") ? "dark" : "light",
    );

    // Update button icon using Font Awesome HTML strings
    btn.innerHTML = body.classList.contains("dark-mode") 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
}

// Load theme preference on page load
window.addEventListener("load", function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        // Set the icon to the sun if dark mode is active on load
        document.querySelector(".theme-toggle").innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        // Optional: Ensure it defaults to the moon icon if light mode
        document.querySelector(".theme-toggle").innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

// Smooth scroll for navigation
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.innerHTML = navLinks.classList.contains("open")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        if (navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "fadeIn 0.8s ease-out forwards";
        }
    });
}, observerOptions);

document
    .querySelectorAll(
        ".skill-card, .project-card, .experience-item, .testimonial, .contact-item",
    )
    .forEach((el) => {
        observer.observe(el);
    });