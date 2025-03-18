document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slides = document.querySelectorAll('.slider-col');
    const indicatorContainer = document.querySelector('.slider-indicators');

    let currentIndex = 0;

    // Create bullet points dynamically
    function createIndicators() {
        indicatorContainer.innerHTML = ""; // Clear existing
        slides.forEach((_, index) => {
            const bullet = document.createElement('span');
            if (index === 0) bullet.classList.add('active'); // First bullet is active
            indicatorContainer.appendChild(bullet);
        });
    }

    function updateIndicators() {
        const bullets = document.querySelectorAll('.slider-indicators span');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === currentIndex);
        });
    }

    function getSlideWidth() {
        if (window.innerWidth <= 700) {
            return 100; // Mobile view: full width
        } else if (window.innerWidth <= 1024) {
            return 50; // Tablet view: half width
        } else {
            return 33.333; // Desktop view: one-third width
        }
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * getSlideWidth()}%)`;
        updateIndicators();
    }


    function showNext() {
        const maxSlides = window.innerWidth <= 700 ? slides.length : 
                          window.innerWidth <= 1024 ? slides.length - 1 : 
                          slides.length - 2;
        currentIndex = (currentIndex + 1) % maxSlides;
        updateSlider();
    }

    function showPrev() {
        const maxSlides = window.innerWidth <= 700 ? slides.length : 
                          window.innerWidth <= 1024 ? slides.length - 1 : 
                          slides.length - 2;
        currentIndex = (currentIndex - 1 + maxSlides) % maxSlides;
        updateSlider();
    }

    // Initialize
    createIndicators();
    updateIndicators();

    window.addEventListener('resize', updateSlider);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);




    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) showNext(); // Swipe left
    if (touchEndX - touchStartX > 50) showPrev(); // Swipe right
    
    });



});



document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector(".slider-container");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    sliderContainer.classList.add("visible");
                } else {
                    sliderContainer.classList.remove("visible"); // Remove class when out of view
                }
            });
        },
        { threshold: 0.3 } // Triggers when 30% of the section is visible
    );

    observer.observe(document.querySelector(".rating"));
});

