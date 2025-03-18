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
        return window.innerWidth < 768 ? 100 : 33.333;
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * getSlideWidth()}%)`;
        updateIndicators();
    }

    function showNext() {
        const maxSlides = window.innerWidth < 768 ? slides.length : slides.length - 2;
        currentIndex = (currentIndex + 1) % maxSlides;
        updateSlider();
    }

    function showPrev() {
        const maxSlides = window.innerWidth < 768 ? slides.length : slides.length - 2;
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
