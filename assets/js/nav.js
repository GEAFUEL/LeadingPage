// ---- Scroll: efeito de fundo + cor das letras ----
const nav = document.querySelector(".nav");
const logoImg = document.querySelector(".logo-img");

// Guarda o src original e monta o src da versão branca
const logoDefault = logoImg ? logoImg.getAttribute("src") : null;
const logoScrolled = logoDefault
    ? logoDefault.replace(/(Logo GEAF)(\.png)/i, "$1, Branca$2")
    : null;

function updateLogoForState(isScrolled) {
    if (!logoImg || !logoScrolled) return;
    const newSrc = isScrolled ? logoScrolled : logoDefault;
    if (logoImg.src.endsWith(newSrc) || logoImg.getAttribute('src') === newSrc) return;
    logoImg.classList.add('swapping');
    setTimeout(() => {
        logoImg.src = newSrc;
        logoImg.classList.remove('swapping');
    }, 200);
}

window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768) return; // Mobile: estado fixo, ignora scroll
    const scrolled = window.scrollY > 50;
    nav.classList.toggle("scrolled", scrolled);
    updateLogoForState(scrolled);
});

if (window.innerWidth <= 768) {
    nav.classList.add("scrolled");
    if (logoImg && logoScrolled) logoImg.src = logoScrolled;
}

// ---- Hamburger e Dropdowns Mobile ----
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".ul-nav");
const dropdownLinks = document.querySelectorAll(".has-dropdown > a");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".ul-nav a:not(.has-dropdown > a)").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = link.parentElement;
        const submenu = parentLi.querySelector(".dropdown-menu");
        const isOpen = parentLi.classList.contains("active-dropdown");

        // Fecha todos os outros dropdowns abertos
        document.querySelectorAll(".has-dropdown").forEach((item) => {
            if (item !== parentLi) {
                item.classList.remove("active-dropdown");
                const other = item.querySelector(".dropdown-menu");
                if (other) other.classList.remove("open");
            }
        });

        // Alterna o atual
        parentLi.classList.toggle("active-dropdown", !isOpen);
        if (submenu) submenu.classList.toggle("open", !isOpen);
    });
});

// Clique fora fecha o dropdown
document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
        document.querySelectorAll(".has-dropdown").forEach((item) => {
            item.classList.remove("active-dropdown");
            const sub = item.querySelector(".dropdown-menu");
            if (sub) sub.classList.remove("open");
        });
    }
});
