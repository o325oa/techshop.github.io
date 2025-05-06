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
    
    const smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
    
    const featuredSlider = document.getElementById('featuredSlider');
    
    const featuredProducts = [
        {
            id: 1,
            name: 'iPhone 14 Pro',
            brand: 'Apple',
            price: '99 990 ₽',
            image: 'https://m.media-amazon.com/images/I/51CJE8vrvIL.jpg',
            category: 'phones'
        },
        {
            id: 2,
            name: 'Galaxy S23 Ultra',
            brand: 'Samsung',
            price: '89 990 ₽',
            image: 'https://m.media-amazon.com/images/I/71Sa3dqTqzL.jpg',
            category: 'phones'
        },
        {
            id: 3,
            name: 'MacBook Air M2',
            brand: 'Apple',
            price: '119 990 ₽',
            image: 'https://i5.walmartimages.com/seo/2022-Apple-MacBook-Air-with-M2-chip-13-6-inch-8GB-RAM-256GB-SSD-Starlight_198166aa-141d-40ee-ada6-0def7def1ff8.51c464292221fe05aef0776831faf085.jpeg',
            category: 'laptops'
        },
        {
            id: 4,
            name: 'AirPods Pro 2',
            brand: 'Apple',
            price: '24 990 ₽',
            image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-202409-gallery-1?wid=2824&hei=2400&fmt=jpeg&qlt=90&.v=V3lwSGNUa3E5M1VnNVZBT1RDR3Y2NS9rS3dwK1hySWg2QW9tQ1lqaSsxQXFlellpcE56OWNsOHBzVkJLWjdrYWJGcXNRQnFCV0w3WVRjTExvdm1ic1EvTVdVZ0JiQWtXQjFVOE5MY25KUnVIaWV5SG1KWWRSb1RMSkNqUDJYZHY',
            category: 'headphones'
        },
        {
            id: 5,
            name: 'Dyson Supersonic',
            brand: 'Dyson',
            price: '39 990 ₽',
            image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary-locale/en_US/412522-01.png',
            category: 'haircare'
        },
        {
            id: 6,
            name: 'Watch Series 8',
            brand: 'Apple',
            price: '34 990 ₽',
            image: 'https://m.media-amazon.com/images/I/71ulah9iIwL._AC_UF894,1000_QL80_.jpg',
            category: 'watches'
        }
    ];
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-card__img">
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__brand">${product.brand}</p>
                <p class="product-card__price">${product.price}</p>
                <button class="product-card__btn" data-id="${product.id}">В корзину</button>
            </div>
        `;
        featuredSlider.appendChild(productCard);
    });
    

    const addToCartButtons = document.querySelectorAll('.product-card__btn');
    let cartCount = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            cartCount++;
            document.querySelector('.cart-count').textContent = cartCount;
            
            this.textContent = 'Добавлено!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'В корзину';
                this.style.backgroundColor = 'var(--primary)';
            }, 2000);
            
            console.log(`Товар ${productId} добавлен в корзину`);
        });
    });

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .advantage-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 

    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1 + 0.3}s`;
    });

    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            window.location.href = `catalog.html?category=${category}`;
        });
    });

    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollValue = window.scrollY;
        hero.style.backgroundPositionY = scrollValue * 0.5 + 'px';
    });

    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});
