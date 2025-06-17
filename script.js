// Toggle mobile menu open/close
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.querySelector('button[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcons = mobileMenuButton.querySelectorAll('svg');

    mobileMenuButton.addEventListener('click', function () {
        const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('hidden');
        // Toggle icons
        menuIcons[0].classList.toggle('hidden');
        menuIcons[1].classList.toggle('hidden');
    });

    // Hide mobile menu by default
    mobileMenu.classList.add('hidden');

    // Toggle profile dropdown
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenuDropdown = userMenuButton?.parentElement?.nextElementSibling;

    if (userMenuButton && userMenuDropdown) {
        userMenuDropdown.classList.add('hidden');
        userMenuButton.addEventListener('click', function () {
            userMenuDropdown.classList.toggle('hidden');
            const expanded = userMenuButton.getAttribute('aria-expanded') === 'true';
            userMenuButton.setAttribute('aria-expanded', !expanded);
        });

        // Optional: close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!userMenuButton.contains(e.target) && !userMenuDropdown.contains(e.target)) {
                userMenuDropdown.classList.add('hidden');
                userMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});