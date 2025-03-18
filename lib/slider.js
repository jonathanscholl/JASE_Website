document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slides = document.querySelectorAll('.slider-col');
    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 33.333}%)`;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % (slides.length - 2);
        updateSlider();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + slides.length - 2) % (slides.length - 2);
        updateSlider();
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);


});
