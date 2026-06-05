document.addEventListener("DOMContentLoaded", () => {
    const statsNumbers = document.querySelectorAll('.stats-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const suffix = element.getAttribute('data-suffix') || '';
        const useDot = element.getAttribute('data-format-dot') === 'true';
        const duration = 1500; // Тривалість анімації в мілісекундах (1.5 секунди)
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Формула для плавності плавного сповільнення (Ease Out Quad)
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);

            // Форматування числа (додавання крапки для тисячних)
            let formattedValue = currentValue;
            if (useDot) {
                formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }

            element.textContent = formattedValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Кінцеве точне значення
                let finalValue = target;
                if (useDot) {
                    finalValue = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
                element.textContent = finalValue + suffix;
            }
        };

        requestAnimationFrame(updateNumber);
    };

    const observerOptions = {
        root: null,
        threshold: 0.1 // Спрацьовує, коли хоча б 10% блока з'явилися на екрані
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Вимикаємо спостереження після першого спрацьовування
            }
        });
    }, observerOptions);

    statsNumbers.forEach(num => observer.observe(num));
});