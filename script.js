
js_content = '''/* ============================================
   CROCHET MISHA — JAVASCRIPT
   ============================================ */

// Product Data
const products = [
    { id: 1, name: "Cozy Bunny Amigurumi", emoji: "🐰", price: 35, original: 45, badge: "bestseller", category: "Amigurumi", desc: "Soft, huggable bunny in pastel colors" },
    { id: 2, name: "Chunky Knit Beanie", emoji: "🧢", price: 28, original: null, badge: "new", category: "Wearables", desc: "Warm winter beanie in lavender" },
    { id: 3, name: "Mini Cactus Plant", emoji: "🌵", price: 18, original: null, badge: null, category: "Home Decor", desc: "No-water needed desk companion" },
    { id: 4, name: "Crochet Flower Bouquet", emoji: "💐", price: 42, original: 55, badge: "bestseller", category: "Home Decor", desc: "Everlasting floral arrangement" },
    { id: 5, name: "Sleepy Bear Plush", emoji: "🧸", price: 38, original: null, badge: null, category: "Amigurumi", desc: "The perfect bedtime companion" },
    { id: 6, name: "Boho Wall Hanging", emoji: "🪞", price: 55, original: null, badge: "custom", category: "Home Decor", desc: "Handmade macrame-style decor" },
    { id: 7, name: "Cozy Scarf", emoji: "🧣", price: 32, original: 40, badge: null, category: "Wearables", desc: "Extra long and super soft" },
    { id: 8, name: "Tiny Turtle Keychain", emoji: "🐢", price: 12, original: null, badge: "new", category: "Accessories", desc: "Cute pocket-sized friend" }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('crochetCart')) || [];

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const featuredProducts = document.getElementById('featuredProducts');
const cartToggle = document.getElementById('cartToggle');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    renderFeaturedProducts();
    updateCartUI();
    initCartDrawer();
});

// ============================================
// NAVBAR
// ============================================

function initNavbar() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    if (!mobileToggle) return;
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// PRODUCTS
// ============================================

function renderFeaturedProducts() {
    if (!featuredProducts) return;
    
    const featured = products.slice(0, 4);
    featuredProducts.innerHTML = featured.map(product => createProductCard(product)).join('');
    
    // Re-attach cart listeners
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            addToCart(id);
        });
    });
}

function createProductCard(product) {
    const badgeHTML = product.badge 
        ? `<span class="product-badge ${product.badge}">${product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New' : 'Custom'}</span>` 
        : '';
    
    const originalPrice = product.original 
        ? `<span class="original">$${product.original}</span>` 
        : '';
    
    return `
        <div class="product-card fade-in">
            <div class="product-image">
                ${badgeHTML}
                <span class="emoji">${product.emoji}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-meta">
                    <span class="product-price">$${product.price}${originalPrice}</span>
                    <button class="btn-add-cart" data-id="${product.id}" aria-label="Add to cart">
                        🛒
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// CART
// ============================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    updateCartUI();
    openCart();
    
    // Button feedback
    const btn = document.querySelector(`[data-id="${productId}"]`);
    if (btn) {
        btn.classList.add('added');
        btn.innerHTML = '✓';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = '🛒';
        }, 1500);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('crochetCart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <span>🧶</span>
                    <p>Your cart is empty</p>
                    <a href="shop.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            if (cartFooter) cartFooter.style.display = 'none';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-img">${item.emoji}</div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span class="price">$${item.price} × ${item.qty}</span>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove item">×</button>
                </div>
            `).join('');
            if (cartFooter) cartFooter.style.display = 'block';
        }
    }
    
    if (cartTotal) {
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

function initCartDrawer() {
    if (!cartToggle || !cartDrawer || !cartOverlay || !cartClose) return;
    
    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCart();
    });
}

function openCart() {
    if (!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    if (!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// FAQ
// ============================================

function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
'''

with open('/mnt/agents/output/script.js', 'w') as f:
    f.write(js_content)
print("script.js created")
