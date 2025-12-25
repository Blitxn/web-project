document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // GET PRODUCT FROM LOCAL STORAGE
    // ===============================
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    // ===============================
    // FLAVOR → SHOP MAP
    // ===============================
    const flavorStores = {
        chocolate: "Choco Heaven",
        vanilla: "Vanilla Delight",
        strawberry: "Berry Sweet",
        banana: "Sweet Corner",
        "salted-caramel": "Salty Bakery",
        lemon: "Citrus Cake Shop",
    };

    // ===============================
    // FALLBACK FLAVOR EXTRACTOR
    // ===============================
    function extractFallbackFlavor() {
        if (!product) return "";

        const raw = product.flavor || "";
        if (raw) return raw;

        const name = (product.name || "").toLowerCase();

        for (const key in flavorStores) {
            if (name.includes(key.replace(/-/g, " "))) return key;
        }

        const match = name.match(/([a-z]+)\s+(cake|cupcake|tart|slice)/i);
        if (match) return match[1];

        return name.split(" ")[0] || "";
    }

    // ===============================
    // DISPLAY PRODUCT
    // ===============================
    if (product) {
        document.getElementById("productImage").src = product.image;
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productPrice").textContent = product.price;

        let flavor = product.flavor || extractFallbackFlavor() || "Unknown";
        product.flavor = flavor;

        document.getElementById("productFlavor").textContent =
            `Flavor: ${flavor.replace(/-/g, " ")}`;

        const store =
            flavorStores[flavor.toLowerCase().replace(/\s+/g, "-")] || "Default Store";

        document.getElementById("storeName").textContent = store;
        product.shop = store;
    }

    // ===============================
    // QUANTITY
    // ===============================
    let qty = 1;
    const qtyDisplay = document.getElementById("qty");
    const plusBtn = document.getElementById("plus");
    const minusBtn = document.getElementById("minus");
    qtyDisplay.textContent = qty;

    // ===============================
    // PRICE CALCULATION
    // ===============================
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");
    const TAX_RATE = 0.10;

    function updatePrice() {
        if (!product) return;

        const price = parseFloat(product.price);
        const subtotal = price * qty;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        subtotalEl.textContent = subtotal.toFixed(2);
        taxEl.textContent = tax.toFixed(2);
        totalEl.textContent = total.toFixed(2);
    }

    updatePrice();

    plusBtn.addEventListener("click", () => {
        qty++;
        qtyDisplay.textContent = qty;
        updatePrice();
    });

    minusBtn.addEventListener("click", () => {
        if (qty > 1) {
            qty--;
            qtyDisplay.textContent = qty;
            updatePrice();
        }
    });

    // ===============================
    // ADD TO CART
    // ===============================
    document.getElementById("addCartBtn").addEventListener("click", () => {
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Get customization note
        const customNote = document.getElementById("customNote").value.trim() || "No customization";

        cart.push({
            name: product.name,
            price: product.price,
            shop: product.shop,
            flavor: product.flavor,
            image: product.image,
            quantity: qty,
            subtotal: parseFloat(subtotalEl.textContent),
            tax: parseFloat(taxEl.textContent),
            total: parseFloat(totalEl.textContent),
            note: customNote
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        // Redirect to order page
        window.location.href = "add.html";
    });

    // ===============================
    // BACK BUTTON
    // ===============================
    document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href = "sandf.html"; // go to sandf page
    });

    // ===============================
    // FLAVOR TOOLTIP ON IMAGE CLICK
    // ===============================
    const productImage = document.getElementById("productImage");

    function showFlavorTooltip() {
        if (!product) return;

        let tooltip = document.getElementById("flavorTooltip");

        if (!tooltip) {
            tooltip = document.createElement("div");
            tooltip.id = "flavorTooltip";
            tooltip.className = "flavor-tooltip";
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = `Flavor: ${product.flavor.replace(/-/g, " ")}`;

        const rect = productImage.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        tooltip.style.left = `${rect.left + window.pageXOffset + rect.width / 2}px`;
        tooltip.style.top = `${rect.top + scrollTop - 10}px`;

        tooltip.classList.add("visible");

        clearTimeout(tooltip._hideTimeout);
        tooltip._hideTimeout = setTimeout(() => {
            tooltip.classList.remove("visible");
        }, 2500);
    }

    if (productImage) {
        productImage.style.cursor = "pointer";
        productImage.addEventListener("click", showFlavorTooltip);
    }

});


