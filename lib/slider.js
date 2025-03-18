document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slides = document.querySelectorAll('.slider-col');
    let currentIndex = 0;

    // Add function to determine slide width based on screen size
    function getSlideWidth() {
        return window.innerWidth < 768 ? 100 : 33.333;
    }

    function updateSlider() {
        // Use dynamic slide width instead of fixed 33.333%
        slider.style.transform = `translateX(-${currentIndex * getSlideWidth()}%)`;
    }

    function showNext() {
        // Adjust the modulo based on screen size
        const maxSlides = window.innerWidth < 768 ? slides.length : slides.length - 2;
        currentIndex = (currentIndex + 1) % maxSlides;
        updateSlider();
    }

    function showPrev() {
        // Adjust the modulo based on screen size
        const maxSlides = window.innerWidth < 768 ? slides.length : slides.length - 2;
        currentIndex = (currentIndex - 1 + maxSlides) % maxSlides;
        updateSlider();
    }

    // Add resize listener to handle screen size changes
    window.addEventListener('resize', updateSlider);

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);


});
