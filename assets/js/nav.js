// ---- Scroll: efeito de fundo + cor das letras ----
const nav = document.querySelector(".nav");

function handleScroll() {
    if (window.scrollY > 60) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// ---- Hamburger e Dropdowns Mobile ----
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".ul-nav");
const dropdownLinks = document.querySelectorAll(".has-dropdown > a");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".ul-nav a:not(.has-dropdown > a)").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

dropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        if (window.innerWidth <= 1175) {
            e.preventDefault();

            const parentLi = link.parentElement;
            const submenu = parentLi.querySelector(".dropdown-menu");

            document.querySelectorAll(".has-dropdown").forEach(item => {
                if (item !== parentLi) {
                    item.classList.remove("active-dropdown");
                    const otherSubmenu = item.querySelector(".dropdown-menu");
                    if (otherSubmenu) otherSubmenu.classList.remove("open");
                }
            });

            parentLi.classList.toggle("active-dropdown");
            submenu.classList.toggle("open");
        }
    });
});
