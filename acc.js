document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const profileContent = document.getElementById("profileContent");
    const passwordContent = document.getElementById("passwordContent");
    const toggleProfile = document.getElementById("toggleProfile");
    const togglePassword = document.getElementById("togglePassword");

    // Load existing data
    document.getElementById("accUsername").value = localStorage.getItem("username") || "";
    document.getElementById("accEmail").value = localStorage.getItem("email") || "";
    document.getElementById("accPhone").value = localStorage.getItem("phone") || "";

    // Accordion toggle
    toggleProfile.addEventListener("click", () => {
        profileContent.classList.toggle("show");
        toggleProfile.textContent = profileContent.classList.contains("show") ? "See Less" : "See More";
    });

    togglePassword.addEventListener("click", () => {
        passwordContent.classList.toggle("show");
        togglePassword.textContent = passwordContent.classList.contains("show") ? "See Less" : "See More";
    });

    // Save profile
    document.getElementById("saveProfile").addEventListener("click", () => {
        localStorage.setItem("username", document.getElementById("accUsername").value);
        localStorage.setItem("email", document.getElementById("accEmail").value);
        localStorage.setItem("phone", document.getElementById("accPhone").value);

        alert("Profile updated successfully!");
        window.location.href = "main.html"; // redirect to homepage
    });

    // Change password
    document.getElementById("updatePassword").addEventListener("click", () => {
        const oldPass = document.getElementById("oldPassword").value;
        const newPass = document.getElementById("newPassword").value;
        const confirmPass = document.getElementById("confirmPassword").value;

        const savedPass = localStorage.getItem("password");

        if (oldPass !== savedPass) {
            alert("Old password is incorrect.");
            return;
        }

        if (newPass !== confirmPass) {
            alert("New passwords do not match.");
            return;
        }

        if (newPass.trim() === "") {
            alert("New password cannot be empty.");
            return;
        }

        localStorage.setItem("password", newPass);
        alert("Password updated successfully!");
        
    });
    const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
    // Log the user out
    localStorage.setItem('isLoggedIn', 'false');

    // Optional: redirect to home or login page
    window.location.href = "main.html"; // or your homepage

    // Update profile text if navbar exists
    const profileText = document.querySelector('#profile-box .signup-text');
    if (profileText) profileText.textContent = "Sign Up";
});

});



