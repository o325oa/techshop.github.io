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

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const brandParam = urlParams.get('brand');

    if (categoryParam) {
        document.getElementById('category').value = categoryParam;
    }
    if (brandParam) {
        document.getElementById('brand').value = brandParam;
    }

    const allProducts = [
        {
            id: 1,
            name: 'iPhone 14 Pro',
            brand: 'apple',
            price: 99990,
            oldPrice: 109990,
            image: '../images/14pro.jpg',
            category: 'phones',
            isNew: true
        },
        {
            id: 2,
            name: 'Galaxy S23 Ultra',
            brand: 'samsung',
            price: 89990,
            image: '../images/s23ult.jpg',
            category: 'phones'
        },
        {
            id: 3,
            name: 'Xiaomi 13 Pro',
            brand: 'xiaomi',
            price: 79990,
            image: '../images/xi13pro.jpg',
            category: 'phones',
            isNew: true
        },
        {
            id: 4,
            name: 'MacBook Air M2',
            brand: 'apple',
            price: 119990,
            image: '../images/airm2.webp',
            category: 'laptops'
        },
        {
            id: 5,
            name: 'AirPods Pro 2',
            brand: 'apple',
            price: 24990,
            oldPrice: 29990,
            image: '../images/airpods2pro.jpg',
            category: 'headphones',
            isNew: true
        },
        {
            id: 6,
            name: 'Galaxy Buds 2 Pro',
            brand: 'samsung',
            price: 14990,
            image: '../images/buds2pro.webp',
            category: 'headphones'
        },
        {
            id: 7,
            name: 'Watch Series 8',
            brand: 'apple',
            price: 34990,
            image: '../images/watch8.avif',
            category: 'watches'
        },
        {
            id: 8,
            name: 'Galaxy Watch 5 Pro',
            brand: 'samsung',
            price: 29990,
            image: '../images/watch5pro.webp',
            category: 'watches'
        },
        {
            id: 9,
            name: 'Dyson Supersonic',
            brand: 'dyson',
            price: 39990,
            image: '../images/dyson_super.jpeg',
            category: 'haircare'
        },
        {
            id: 10,
            name: 'MacBook Pro 16" M2',
            brand: 'apple',
            price: 219990,
            image: '../images/macpro16.jpg',
            category: 'laptops'
        },
        {
            id: 11,
            name: 'Redmi Note 12 Pro',
            brand: 'xiaomi',
            price: 29990,
            image: '../images/redmi12pro.jpg',
            category: 'phones'
        },
        {
            id: 12,
            name: 'Dyson Airwrap',
            brand: 'dyson',
            price: 49990,
            oldPrice: 54990,
            image: '../images/dyson_air.webp',
            category: 'haircare',
            isNew: true
        }
    ];

    const catalogGrid = document.getElementById('catalogGrid');
    const categoryFilter = document.getElementById('category');
    const brandFilter = document.getElementById('brand');
    const priceFilter = document.getElementById('price');

    function displayProducts(products) {
        catalogGrid.innerHTML = '';
        
        if (products.length === 0) {
            catalogGrid.innerHTML = '<p class="no-products">Товары не найдены. Попробуйте изменить параметры фильтрации.</p>';
            return;
        }
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'catalog-product-card';
            
            let saleBadge = '';
            if (product.oldPrice) {
                const discount = Math.round((1 - product.price / product.oldPrice) * 100);
                saleBadge = `<span class="catalog-product-card__sale">-${discount}%</span>`;
            }
            
            let newBadge = '';
            if (product.isNew) {
                newBadge = '<span class="catalog-product-card__new">NEW</span>';
            }
            
            const formattedPrice = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            let oldPriceHtml = '';
            if (product.oldPrice) {
                const formattedOldPrice = product.oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                oldPriceHtml = `<span class="catalog-product-card__old-price">${formattedOldPrice} ₽</span>`;
            }
            
            productCard.innerHTML = `
                ${saleBadge}
                ${newBadge}
                <img src="${product.image}" alt="${product.name}" class="catalog-product-card__img">
                <div class="catalog-product-card__content">
                    <h3 class="catalog-product-card__title">${product.name}</h3>
                    <p class="catalog-product-card__brand">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</p>
                    <span class="catalog-product-card__category">${getCategoryName(product.category)}</span>
                    <div class="catalog-product-card__price-container">
                        ${oldPriceHtml}
                        <p class="catalog-product-card__price">${formattedPrice} ₽</p>
                    </div>
                    <button class="catalog-product-card__btn" data-id="${product.id}">В корзину</button>
                </div>
            `;
            
            catalogGrid.appendChild(productCard);
        });

        document.querySelectorAll('.catalog-product-card__btn').forEach(button => {
            button.addEventListener('click', function() {
                addToCart(this.getAttribute('data-id'));
            });
        });
    }

    function addToCart(productId) {
        let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        cartCount++;
        localStorage.setItem('cartCount', cartCount);

        document.querySelector('.cart-count').textContent = cartCount;

        const button = document.querySelector(`.catalog-product-card__btn[data-id="${productId}"]`);
        button.textContent = 'Добавлено!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = 'В корзину';
            button.style.backgroundColor = 'var(--primary)';
        }, 2000);

        console.log(`Товар ${productId} добавлен в корзину`);
    }

    function getCategoryName(category) {
        const categories = {
            'phones': 'Смартфоны',
            'laptops': 'Ноутбуки',
            'watches': 'Часы',
            'headphones': 'Наушники',
            'haircare': 'Фены'
        };
        return categories[category] || category;
    }

    function filterProducts() {
        const categoryValue = categoryFilter.value;
        const brandValue = brandFilter.value;
        const priceValue = priceFilter.value;
        
        let filteredProducts = [...allProducts];

        if (categoryValue !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
        }

        if (brandValue !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.brand === brandValue);
        }

        if (priceValue !== 'all') {
            const [min, max] = priceValue.split('-').map(Number);
            
            filteredProducts = filteredProducts.filter(product => {
                if (priceValue === '100000') {
                    return product.price >= 100000;
                } else {
                    return product.price >= min && product.price <= max;
                }
            });
        }
        
        displayProducts(filteredProducts);
    }

    function init() {
        const cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        document.querySelector('.cart-count').textContent = cartCount;

        categoryFilter.addEventListener('change', filterProducts);
        brandFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);

        filterProducts();

        setTimeout(() => {
            document.querySelectorAll('.catalog-product-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);
    }

    init();
});