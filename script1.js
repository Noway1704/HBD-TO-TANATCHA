// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add the "visible" class to elements in the viewport
function checkVisibility() {
    const stories = document.querySelectorAll('.story');
    stories.forEach(story => {
        if (isInViewport(story)) {
            story.classList.add('visible');
        }
    });
}

// Check visibility on scroll and on page load
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
