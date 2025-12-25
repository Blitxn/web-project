document.addEventListener('DOMContentLoaded', () => {

    // SIDEBAR ELEMENTS
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const signOutBtn = document.getElementById('signOutBtn');

    // VIEW ALL CAKES BUTTON
    const viewAllCakesBtn = document.getElementById('viewAllCakesBtn');

    // ORDER BUTTON
    const orderBtn = document.getElementById('orderBtn');

    // SIDEBAR TOGGLE
    menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    closeSidebar.addEventListener('click', () => sidebar.classList.remove('open'));
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // SIGN OUT
    signOutBtn.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = "main.html";
    });

    // REDIRECT TO ALL CAKES
    viewAllCakesBtn.addEventListener('click', () => {
        window.location.href = 'sandf.html';
    });

    // REDIRECT TO ADD (ORDER)
    orderBtn.addEventListener('click', () => {
        window.location.href = 'order.html';
    });

});










