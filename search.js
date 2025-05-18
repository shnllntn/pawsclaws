
// Assume `Products` is the global array of all products (as defined in Products.html):contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}.

// 1. Filter out any dummy products (keep IDs 1–120 only)
const allProducts = (window.Products || []);
const products = allProducts.filter(p => p.id >= 1 && p.id <= 120);

// 2. Cache references to DOM elements
const searchContainer = document.querySelector('.search-container');
const searchToggle = document.getElementById('search-toggle');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');

// 3. Toggle the search box on magnifier click
searchToggle.addEventListener('click', () => {
  searchContainer.classList.toggle('open');
  if (searchContainer.classList.contains('open')) {
    // Focus the input when opened
    searchInput.focus();
  } else {
    // Clear input and results when closed
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  }
});

// 4. Perform live search on each keystroke
searchInput.addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  // If query is empty, clear results and return
  if (query === '') {
    resultsContainer.innerHTML = '';
    return;
  }
  // Filter products by name match (case-insensitive)
  const matches = products.filter(p => 
    p.name.toLowerCase().includes(query)
  );
  // Build the HTML for results
  if (matches.length > 0) {
    resultsContainer.innerHTML = matches.map(p => {
      // Create an anchor element with thumbnail and name
      return `
        <a href="Products.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}">
          <span>${p.name}</span>
        </a>`;
    }).join('');
  } else {
    // Optionally show a "no results" message
    resultsContainer.innerHTML = '<div class="no-result">No products found</div>';
  }
});



