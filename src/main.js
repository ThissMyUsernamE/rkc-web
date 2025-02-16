document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(items[0]).marginRight);
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    let currentPosition = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(${currentPosition}px)`;
        prevBtn.classList.toggle('hidden', currentPosition === 0);
        nextBtn.classList.toggle('hidden', currentPosition <= -(itemWidth * (items.length - Math.ceil(containerWidth / itemWidth))));
    }

    function moveCarousel(direction) {
        if (direction === 'next') {
            currentPosition -= itemWidth;
            const lastVisibleItem = Math.ceil(containerWidth / itemWidth);
            const maxPosition = -(itemWidth * (items.length - lastVisibleItem));
            
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
        const newContainerWidth = document.querySelector('.carousel-container').offsetWidth;
        if (newContainerWidth !== containerWidth) {
            currentPosition = 0;
            updateCarousel();
        }
    });
});