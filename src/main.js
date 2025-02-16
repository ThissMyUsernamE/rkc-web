document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const items = carousel.querySelectorAll('.events__carousel-item');
    const itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(items[0]).marginRight);
    let currentPosition = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(${currentPosition}px)`;
        prevBtn.classList.toggle('hidden', currentPosition === 0);
        const maxPosition = -(itemWidth * (items.length - 3));
        nextBtn.classList.toggle('hidden', currentPosition <= maxPosition);
    }

    function moveCarousel(direction) {
        if (direction === 'next') {
            currentPosition -= itemWidth;
            const maxPosition = -(itemWidth * (items.length - 3));
            
            if (currentPosition < maxPosition) {
                currentPosition = maxPosition;
            }
        } else {
            currentPosition += itemWidth;
            if (currentPosition > 0) {
                currentPosition = 0;
            }
        }
        updateCarousel();
    }

    nextBtn.addEventListener('click', () => moveCarousel('next'));
    prevBtn.addEventListener('click', () => moveCarousel('prev'));

    // Initial update
    updateCarousel();

    // Recalculate on window resize
    window.addEventListener('resize', () => {
        currentPosition = 0;
        updateCarousel();
    });
});
