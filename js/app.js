const scrollBtn = document.getElementsByClassName("backToTop")[0];
const navBarList = document.getElementById("navbar__list");
const [...sections] = document.getElementsByTagName("section");
const navItems = document.getElementsByClassName("navbar__item");
const sectionsIDs = sections.map(sec => sec.id);
const navItemsData = sections.map(sec => sec.getAttribute("data-nav"));
const scroll = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-scroll-to");
    const element = document.querySelector(target);
    element.scrollIntoView({ behavior: "smooth" });
};
const isInViewport = (elem) => {
    const { top, bottom } = elem.getBoundingClientRect();
    const winHeight = window.innerHeight || document.documentElement.clientHeight;
    return bottom >= 0 && top <= winHeight
};
const showBackTop = () => window.addEventListener("scroll", () => scrollBtn.classList.toggle("backToTop--active", window.scrollY > 500));
const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
// Main
const buildNav = (nav, items, secIDs) => {
    const fragment = document.createDocumentFragment();
    items.map((item, i) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        listItem.classList.add("navbar__item");
        listItem.addEventListener("click", scrollTo);
        listItem.setAttribute("data-scroll-to", `#${secIDs[i]}`);
        fragment.appendChild(listItem);
    });
    nav.appendChild(fragment);
};
// class section--active
const activateSec = () => {
    sections.map((sec) => {
        window.addEventListener("scroll", (event) => {
            isInViewport(sec)
                ? sec.classList.add("section--active")
                : sec.classList.remove("section--active");
        });
    });
};
buildNav(navBarList, navItemsData, sectionsIDs);
activateSec()
showBackTop()
scrollTop()