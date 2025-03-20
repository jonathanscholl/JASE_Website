document.addEventListener("DOMContentLoaded", function () {

    
    const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    }
    });
    };
    
    const options = { threshold: 0.1 };
    
    const ratingsObserver = new IntersectionObserver(observerCallback, options);
    const benefitsObserver = new IntersectionObserver(observerCallback, options);
    
    ratingsObserver.observe(document.querySelector(".slider-container"));
    benefitsObserver.observe(document.querySelector(".benefits-container"));
    });