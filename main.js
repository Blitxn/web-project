document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------
       ELEMENTS
    --------------------------------------------*/
    const authPopup = document.getElementById('authPopup');
    const overlay = document.getElementById('overlay');
    const closeForm = document.getElementById('closeForm');

    const signupSection = document.getElementById('signupSection');
    const loginSection = document.getElementById('loginSection');
    const tabButtons = document.querySelectorAll('.tab-btn');

    const profileBox = document.getElementById('profile-box');
    const profileText = profileBox.querySelector('.signup-text');

    const ctaBtn = document.querySelector('.cta-btn');
    const browseLink = document.getElementById('browseCakeLink');
    const orderLink = document.getElementById('orderLink');
    const aboutLink = document.getElementById('aboutLink');

    const signupUsername = document.getElementById('signupUsername');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');

    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');

    const submitSignup = document.getElementById('submitSignup');
    const submitLogin = document.getElementById('submitLogin');

    /* -------------------------------------------
       TAB SWITCHING (SIGNUP / LOGIN)
    --------------------------------------------*/
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.dataset.tab === "signup") {
                signupSection.classList.remove("hidden");
                loginSection.classList.add("hidden");
            } else {
                signupSection.classList.add("hidden");
                loginSection.classList.remove("hidden");
            }
        });
    });

    /* -------------------------------------------
       POPUP CONTROL
    --------------------------------------------*/
    function openAuthPopup(redirect = null) {
        authPopup.classList.add('show');
        overlay.style.display = "block";
        if (redirect) authPopup.dataset.redirect = redirect;
    }

    function closeAuthPopup() {
        authPopup.classList.remove('show');
        overlay.style.display = "none";
    }

    /* -------------------------------------------
       REDIRECT HELPER
    --------------------------------------------*/
    function redirect(url) {
        window.location.href = url;
    }

    function protectedRedirect(url) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            redirect(url);
        } else {
            openAuthPopup(url);
        }
    }

    /* -------------------------------------------
       UPDATE PROFILE TEXT
    --------------------------------------------*/
    function updateProfileText() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            profileText.textContent = localStorage.getItem('username') || "Account";
        } else {
            profileText.textContent = "Sign Up";
        }
    }
    updateProfileText();

    /* -------------------------------------------
       NAVBAR & BUTTON CLICKS
    --------------------------------------------*/
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => protectedRedirect("browseC.html"));
    }

    if (browseLink) {
        browseLink.addEventListener('click', e => {
            e.preventDefault();
            protectedRedirect("browseC.html");
        });
    }

    if (orderLink) {
        orderLink.addEventListener('click', e => {
            e.preventDefault();
            protectedRedirect("add.html");
        });
    }

  if (aboutLink) {
    aboutLink.addEventListener('click', e => {
        e.preventDefault();
        // Check if user is logged in
        if (localStorage.getItem('isLoggedIn') === 'true') {
            redirect("aboutus.html"); // already logged in
        } else {
            openAuthPopup("aboutus.html"); // show login/signup first
        }
    });
}


    profileBox.addEventListener('click', () => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            redirect("account.html");
        } else {
            openAuthPopup("account.html");
        }
    });

    /* -------------------------------------------
       SIGN UP FUNCTION
    --------------------------------------------*/
    submitSignup.addEventListener('click', () => {
        const user = signupUsername.value.trim();
        const email = signupEmail.value.trim();
        const pass = signupPassword.value.trim();

        if (!user || !email || !pass) {
            alert("Please fill all fields.");
            return;
        }

        localStorage.setItem('username', user);
        localStorage.setItem('email', email);
        localStorage.setItem('password', pass);
        localStorage.setItem('isLoggedIn', 'true');

        updateProfileText();
        closeAuthPopup();

        redirect(authPopup.dataset.redirect || "browseC.html");
    });

    /* -------------------------------------------
       LOGIN FUNCTION
    --------------------------------------------*/
    submitLogin.addEventListener('click', () => {
        const emailLogin = loginEmail.value.trim();
        const passLogin = loginPassword.value.trim();

        if (
            emailLogin === localStorage.getItem('email') &&
            passLogin === localStorage.getItem('password')
        ) {
            localStorage.setItem('isLoggedIn', 'true');
            updateProfileText();
            closeAuthPopup();
            redirect(authPopup.dataset.redirect || "browseC.html");
        } else {
            alert("Incorrect email or password.");
        }
    });

    /* -------------------------------------------
       CLOSE POPUP
    --------------------------------------------*/
    closeForm.addEventListener('click', closeAuthPopup);
    overlay.addEventListener('click', closeAuthPopup);

});
















