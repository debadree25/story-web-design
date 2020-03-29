function init() {
    const hamburger = document.querySelector(".menu");
    const hamburgerLines = document.querySelectorAll(".menu line");
    const navOpen = document.querySelector(".nav-open");
    const contact = document.querySelector(".contact");
    const social = document.querySelector(".social");
    const logo = document.querySelector(".logo");
    const tl = gsap.timeline({ paused: true, reversed: true });
    tl.to(navOpen, 0.5, { y: 0 })
        .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
        .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
    hamburger.addEventListener('click', function () {
        console.log('click');
        tl.reversed() ? tl.play() : tl.reverse();
    });
}

init();
