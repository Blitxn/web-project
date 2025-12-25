document.addEventListener("DOMContentLoaded", () => {
  const orders = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("ordersContainer");

  function displayOrders() {
    container.innerHTML = ""; // clear container

    if (orders.length === 0) {
      const noOrders = document.createElement("div");
      noOrders.className = "no-more";
      noOrders.textContent = "No orders yet";
      container.appendChild(noOrders);
      return;
    }

    // Sort by date
    orders.sort((a, b) => new Date(a.date) - new Date(b.date));

    orders.forEach(order => {
      const orderCard = document.createElement("div");
      orderCard.classList.add("product-info");

      const totalPrice = (order.price * order.quantity + 0.36).toFixed(2);

      orderCard.innerHTML = `
        <div class="product-media">
          <img class="product-image" src="${order.image}" alt="${order.name}">
        </div>
        <div class="product-details">
          <h3 class="storename">${order.shop || "Default Store"}</h3>
          <h2>${order.name}</h2>
          <p class="flavor">Flavor: ${order.flavor}</p>
          <p class="note">Note: ${order.note || "None"}</p>
          <p class="tax">Tax: $${(totalPrice * 0.07).toFixed(2)}</p>
          <p class="price">Total: $${totalPrice}</p>
          <p class="status">${order.status || "Pending"}</p>
          <p class="date">Date: ${order.date || new Date().toLocaleDateString()}</p>
          <div class="quantity">
            <p>Total</p>
            <span>${order.quantity}</span>
            <p>items</p>
          </div>
        </div>
      `;

      container.appendChild(orderCard);
    });
  }

  displayOrders();

  // Clear orders
  document.getElementById("clearOrders").addEventListener("click", () => {
    localStorage.removeItem("cart");
    orders.length = 0; // clear local array
    displayOrders();
  });

  // Order Now button
  document.getElementById("orderNow").addEventListener("click", () => {
    window.location.href = "sandf.html";
  });
});
