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
            image: 'https://m.media-amazon.com/images/I/51CJE8vrvIL.jpg',
            category: 'phones',
            isNew: true
        },
        {
            id: 2,
            name: 'Galaxy S23 Ultra',
            brand: 'samsung',
            price: 89990,
            image: 'https://m.media-amazon.com/images/I/71Sa3dqTqzL.jpg',
            category: 'phones'
        },
        {
            id: 3,
            name: 'Xiaomi 13 Pro',
            brand: 'xiaomi',
            price: 79990,
            image: 'https://i.ebayimg.com/images/g/o54AAOSw8SljlqKk/s-l1200.png',
            category: 'phones',
            isNew: true
        },
        {
            id: 4,
            name: 'MacBook Air M2',
            brand: 'apple',
            price: 119990,
            image: 'https://i5.walmartimages.com/seo/2022-Apple-MacBook-Air-with-M2-chip-13-6-inch-8GB-RAM-256GB-SSD-Starlight_198166aa-141d-40ee-ada6-0def7def1ff8.51c464292221fe05aef0776831faf085.jpeg',
            category: 'laptops'
        },
        {
            id: 5,
            name: 'AirPods Pro 2',
            brand: 'apple',
            price: 24990,
            oldPrice: 29990,
            image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-202409-gallery-1?wid=2824&hei=2400&fmt=jpeg&qlt=90&.v=V3lwSGNUa3E5M1VnNVZBT1RDR3Y2NS9rS3dwK1hySWg2QW9tQ1lqaSsxQXFlellpcE56OWNsOHBzVkJLWjdrYWJGcXNRQnFCV0w3WVRjTExvdm1ic1EvTVdVZ0JiQWtXQjFVOE5MY25KUnVIaWV5SG1KWWRSb1RMSkNqUDJYZHY',
            category: 'headphones',
            isNew: true
        },
        {
            id: 6,
            name: 'Galaxy Buds 2 Pro',
            brand: 'samsung',
            price: 14990,
            image: 'https://i5.walmartimages.com/seo/Samsung-Galaxy-Buds2-Pro-Bluetooth-Earbuds-True-Wireless-with-Charging-Case-Bora-Purple_0fe507cd-fd5b-423d-964b-11d1f330ff96.9933c02f0ef9ae7d4b17c07038f5ece0.jpeg',
            category: 'headphones'
        },
        {
            id: 7,
            name: 'Watch Series 8',
            brand: 'apple',
            price: 34990,
            image: 'https://m.media-amazon.com/images/I/71ulah9iIwL._AC_UF894,1000_QL80_.jpg',
            category: 'watches'
        },
        {
            id: 8,
            name: 'Galaxy Watch 5 Pro',
            brand: 'samsung',
            price: 29990,
            image: 'https://m.media-amazon.com/images/I/613RLBA2goL.jpg',
            category: 'watches'
        },
        {
            id: 9,
            name: 'Dyson Supersonic',
            brand: 'dyson',
            price: 39990,
            image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary-locale/en_US/561776-01.png',
            category: 'haircare'
        },
        {
            id: 10,
            name: 'MacBook Pro 16" M2',
            brand: 'apple',
            price: 219990,
            image: 'https://as-images.apple.com/is/refurb-mbp16-m2-spacegray-202303?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1680103637521',
            category: 'laptops'
        },
        {
            id: 11,
            name: 'Redmi Note 12 Pro',
            brand: 'xiaomi',
            price: 29990,
            image: 'https://www.tradeinn.com/f/13989/139899811/xiaomi-redmi-note-12-pro-8gb-256gb-6.67-dual-sim.webp',
            category: 'phones'
        },
        {
            id: 12,
            name: 'Dyson Airwrap',
            brand: 'dyson',
            price: 49990,
            oldPrice: 54990,
            image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/599017-01.png',
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
