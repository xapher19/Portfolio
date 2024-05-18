// Smooth scroll function
async function smoothScroll(target) {
  const element = document.querySelector(target);
  const offset = 0; // Adjust as needed

  try {
    await window.scrollTo({
      behavior: "smooth",
      top: element.offsetTop - offset,
    });
  } catch (error) {
    console.error("Error while scrolling:", error);
  }
}

// Smooth scroll on anchor link click
const anchorLinks = document.querySelectorAll(".anchor-link");
anchorLinks.forEach((link) => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    const target = link.getAttribute("href");
    await smoothScroll(target);
  });
});

// Get the checkbox element
const themeController = document.getElementById("themeController");

// Check if there's a saved state in local storage
async function getThemeState() {
  try {
    const savedState = await localStorage.getItem("themeControllerState");
    if (savedState) {
      themeController.checked = JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Error while getting theme state:", error);
  }
}

// Add event listener to save the state whenever it's changed
themeController.addEventListener("change", async function () {
  try {
    await localStorage.setItem("themeControllerState", JSON.stringify(this.checked));
  } catch (error) {
    console.error("Error while setting theme state:", error);
  }
});

// Intersection observer for showing hidden elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show-hero');
    } 
  });
});

const hiddenElements = document.querySelectorAll('.hidden-hero');
hiddenElements.forEach((el) => observer.observe(el));

// Initialize theme state
getThemeState();
