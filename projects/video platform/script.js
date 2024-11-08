// Sidebar toggle example (optional - if you'd like to implement a collapsible sidebar)
const sidebarToggle = document.querySelector('.sidebar');
document.querySelector('.logo').addEventListener('click', () => {
    sidebarToggle.classList.toggle('collapsed');
});

// Get the search bar and build cards
const searchBar = document.querySelector('.search-bar');
const buildCards = document.querySelectorAll('.build-card');

// Function to filter the builds
searchBar.addEventListener('input', function() {
    const query = searchBar.value.toLowerCase();  // Get the search input and convert to lowercase
    buildCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();  // Get the title from the data-title attribute
        if (title.includes(query)) {
            card.style.display = 'block';  // Show the build card if it matches
        } else {
            card.style.display = 'none';  // Hide the build card if it doesn't match
        }
    });
});
