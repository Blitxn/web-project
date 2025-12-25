document.addEventListener('DOMContentLoaded', () => {

    // === SIDEBAR TOGGLE ===
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');

    menuBtn.addEventListener('click', () => sidebar.style.width = '180px');
    closeSidebar.addEventListener('click', () => sidebar.style.width = '0');

    // === ORDER REDIRECT FUNCTION ===
    function goToAddPage() {
        window.location.href = 'add.html';
    }
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', goToAddPage);
    }

    // === SIGN OUT BUTTON ===
    const signOutBtn = document.getElementById('signOutBtn');
    signOutBtn.addEventListener('click', () => alert('Signing out...'));

    // === FILTER PANEL TOGGLE ===
    const filterPanel = document.getElementById('filterPanel');
    const filterBtn = document.querySelector('.filter-button');
    const applyFilterBtn = document.getElementById('applyFilterBtn');

    filterBtn.addEventListener('click', () => {
        filterPanel.style.display =
            filterPanel.style.display === 'block' ? 'none' : 'block';
    });

    // === PRODUCTS & SEARCH ===
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const products = Array.from(document.querySelectorAll('.product-item'));

    // === FLAVOR DETECTION ===
    const knownFlavors = [
        'chocolate', 'vanilla', 'strawberry', 'lemon',
        'salted-caramel', 'salted caramel', 'caramel', 'banana'
    ];

    function detectFlavor(productEl) {
        const ds = productEl.dataset.flavor;
        if (ds && ds.trim()) return ds.trim().toLowerCase();

        const alt = productEl.querySelector('img')?.alt || '';
        const name = productEl.querySelector('.product-name')?.textContent || '';
        const hay = (alt + ' ' + name)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        for (const f of knownFlavors) {
            const fNorm = f.toLowerCase().replace(/-/g, ' ').trim();
            if (hay.includes(f.toLowerCase()) || hay.includes(fNorm))
                return fNorm.replace(/\s+/g, '-');
        }

        const synonyms = {
            choco: 'chocolate',
            choc: 'chocolate',
            caramel: 'salted-caramel',
            salt: 'salted-caramel',
            berry: 'strawberry',
            lemony: 'lemon'
        };

        for (const token of hay.split(' ')) {
            for (const key in synonyms) {
                if (token === key || token.startsWith(key))
                    return synonyms[key];
            }
        }

        const fallbackMatch = hay.match(
            /([a-z-]+)\s+(?:cake|gateau|cupcake|muffin|slice|tart|gateaux|gateau)/i
        );

        if (fallbackMatch) {
            const candidate = fallbackMatch[1];
            if (synonyms[candidate]) return synonyms[candidate];

            for (const f of knownFlavors) {
                const fNorm = f.toLowerCase().replace(/-/g, ' ').trim();
                if (fNorm === candidate || fNorm.includes(candidate) || candidate.includes(fNorm))
                    return fNorm.replace(/\s+/g, '-');
            }
            return candidate.replace(/\s+/g, '-');
        }

        console.debug('detectFlavor: no match', { ds, alt, name, hay });
        return '';
    }

    // === CLICK PRODUCT → STORE INFO + REDIRECT ===
    products.forEach(product => {
        product.addEventListener('click', () => {
            const flavor = detectFlavor(product);
            product.dataset.flavor = flavor;

            const productData = {
                image: product.querySelector('img').src,
                name: product.querySelector('.product-name').textContent,
                price: product.querySelector('.product-price').textContent.replace('$', ''),
                flavor
            };

            localStorage.setItem('selectedProduct', JSON.stringify(productData));
            window.location.href = 'cart.html';
        });
    });

    // === FILTER & SEARCH FUNCTION ===
    function filterProducts() {
        const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked'))
            .map(i => i.value.toLowerCase().trim());

        const selectedFlavors = Array.from(document.querySelectorAll('input[name="flavor"]:checked'))
            .map(i => i.value.toLowerCase().trim());

        const searchText = searchInput.value.toLowerCase().trim();

        products.forEach(product => {
            const productSize = (product.dataset.size || '').toLowerCase().trim();
            const productFlavor = (product.dataset.flavor || '').toLowerCase().trim();
            const productName = product.querySelector('.product-name')?.textContent.toLowerCase() || '';

            const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(productSize);
            const flavorMatch = selectedFlavors.length === 0 || selectedFlavors.includes(productFlavor);
            const searchMatch = searchText === '' || productName.includes(searchText);

            product.style.display = (sizeMatch && flavorMatch && searchMatch) ? '' : 'none';
        });
    }

    // === APPLY FILTER BUTTON ===
    applyFilterBtn.addEventListener('click', () => {
        filterProducts();                // Apply the filter
        filterPanel.style.display = 'none'; // Hide the filter panel after applying
    });

    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('input', filterProducts);

});












