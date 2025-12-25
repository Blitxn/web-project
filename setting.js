document.addEventListener("DOMContentLoaded", () => {

    // Load saved settings
    document.getElementById("languageSelect").value =
        localStorage.getItem("language") || "en";

    document.getElementById("themeSelect").value =
        localStorage.getItem("theme") || "light";

    document.getElementById("notifToggle").checked =
        localStorage.getItem("notifications") === "true";

    // Save button
    document.getElementById("saveSettings").addEventListener("click", () => {
        localStorage.setItem("language", document.getElementById("languageSelect").value);
        localStorage.setItem("theme", document.getElementById("themeSelect").value);
        localStorage.setItem("notifications", document.getElementById("notifToggle").checked);

        alert("Settings saved!");
    });

});
