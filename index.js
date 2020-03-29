function init() {
    let slides = document.querySelectorAll('.slide');
    let pages = document.querySelectorAll('.page');
    let gradients = [
        `radial-gradient(50% 50% at 50% 50%, #2B3760 0%, rgba(255, 255, 255, 0.24) 100%)`,
        `radial-gradient(50% 50% at 50% 50%, #9A3506 0%, rgba(255, 255, 255, 0.24) 100%)`,
        `radial-gradient(50% 50% at 50% 50%, #4E4342 0%, rgba(255, 255, 255, 0.24) 100%)`
    ];

    let current = 0;

    pages.forEach((page, ind) => {
        if (ind != current) {
            //page.style.position = 'absolute';
            //page.style.bottom = '927.6875';
            //page.style.left = '0%';
            page.style.width = '100%';
            page.style.opacity = '0';
            page.style.pointerEvents = 'none';
            page.querySelector('.hero .model-left').style.transform = 'translate(0-100%)';
            page.querySelector('.hero .model-right').style.transform = 'translate(0,-100%)';
            page.querySelector('.details').style.opacity = '0';
        }
    });

    slides.forEach((slide, ind) => {
        slide.addEventListener('click', function () {
            console.log('click');
            slides.forEach(slide => slide.classList.remove('active'));
            this.classList.add('active');
            //document.querySelector('.portfolio').style.background = gradients[ind];
            nextSlide(ind);
        });
    });

    function nextSlide(ind) {
        const nxt = pages[ind];
        const curr = pages[current];
        const nextLeft = nxt.querySelector('.hero .model-left');
        const nextRight = nxt.querySelector('.hero .model-right');
        const currLeft = curr.querySelector('.hero .model-left');
        const currRight = curr.querySelector('.hero .model-right');
        const currDetails = curr.querySelector('.details');
        const nextTxt = nxt.querySelector(".details");
        const portfolio = document.querySelector('.portfolio');
        const tl = gsap.timeline();
        tl.fromTo(
            currLeft,
            0.3,
            { y: '-10%' },
            { y: '-100%' }
        )
            .fromTo(
                currRight,
                0.3,
                { y: '10%' },
                { y: '-100%' },
                "-=0.2"
            ).fromTo(
                currDetails,
                0.3,
                { opacity: 1 , y : 30},
                { opacity: 0 , y : 0},
            ).to(
                portfolio,
                0.3,
                {
                    backgroundImage: gradients[ind]
                },
                //'-=0.7'
            ).fromTo(
                curr,
                0.3,
                { opacity: 1, pointerEvents: "all" },
                { opacity: 0, pointerEvents: "none" }
            ).fromTo(
                nxt,
                0.3,
                { opacity: 0, pointerEvents: "none" },
                { opacity: 1, pointerEvents: "all" },
                "-=0.6"
            ).fromTo(
                nextLeft,
                0.3,
                { y: '-100%' },
                { y: '-10%' },
                '-=0.6'
            ).fromTo(
                nextRight,
                0.3,
                { y: '-100%' },
                { y: '10%' },
                "-=0.8"
            ).fromTo(
                nextTxt,
                0.3,
                { opacity: 0 , y:0 },
                { opacity: 1 , y : 30},
                '-=0.8'
            ).set(
                nextLeft,
                { clearProps: 'all' }
            ).set(
                nextRight,
                { clearProps: 'all' }
            );
        current = ind;
    }
    let scrollSlide = 0;
    document.addEventListener("wheel", throttle(scrollChange, 1500));
    document.addEventListener("touchmove", throttle(scrollChange, 1500));
    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll(".slide")[dotNumber];
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        activeDot.classList.add("active");
    }

    function scrollChange(e) {
        if (e.deltaY > 0) {
            scrollSlide += 1;
        } else {
            scrollSlide -= 1;
        }

        if (scrollSlide > 2) {
            scrollSlide = 0;
        }
        if (scrollSlide < 0) {
            scrollSlide = 2;
        }
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
        console.log(scrollSlide);
    }

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

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

init();
