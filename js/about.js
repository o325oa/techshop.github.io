document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    const numberCards = document.querySelectorAll('.number-card__value');
    
    const animateNumbers = function() {
        numberCards.forEach(card => {
            const target = parseInt(card.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                card.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const numbersSection = document.querySelector('.about-numbers');
    if (numbersSection) {
        observer.observe(numbersSection);
    }

    const cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    document.querySelector('.cart-count').textContent = cartCount;
});