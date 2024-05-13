// Smooth scroll function
function smoothScroll(target) {
    const element = document.querySelector(target);
    const offset = 0; // Adjust as needed

    window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - offset,
    });
}

// Smooth scroll on anchor link click
const anchorLinks = document.querySelectorAll('.anchor-link');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
    });
});

// Get the checkbox element
const themeController = document.getElementById('themeController');

// Check if there's a saved state in local storage
const savedState = localStorage.getItem('themeControllerState');

// If there's a saved state, set the checkbox accordingly
if (savedState) {
    themeController.checked = JSON.parse(savedState);
}

// Add event listener to save the state whenever it's changed
themeController.addEventListener('change', function() {
    localStorage.setItem('themeControllerState', JSON.stringify(this.checked));
});