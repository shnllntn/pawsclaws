document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.checkbox-filters input');
  const products = document.querySelectorAll('.Product-Aisle .ProductD');

  function filterProducts() {
    const selectedCategories = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    products.forEach(product => {
      const category = product.dataset.category;
      const showProduct = selectedCategories.includes('all') || 
                         selectedCategories.includes(category);
      product.style.display = showProduct ? 'block' : 'none';
    });
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if(this.value === 'all' && this.checked) {
        // Uncheck other boxes when "All" is selected
        checkboxes.forEach(cb => {
          if(cb.value !== 'all') cb.checked = false;
        });
      } else if(this.checked) {
        // Uncheck "All" when other boxes are selected
        const allCheckbox = document.querySelector('input[value="all"]');
        allCheckbox.checked = false;
      }
      filterProducts();
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.checkbox-filters input');
  const products = document.querySelectorAll('.Product-Aisle .ProductC');

  function filterProducts() {
    const selectedCategories = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    products.forEach(product => {
      const category = product.dataset.category;
      const showProduct = selectedCategories.includes('all') || 
                         selectedCategories.includes(category);
      product.style.display = showProduct ? 'block' : 'none';
    });
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if(this.value === 'all' && this.checked) {
        // Uncheck other boxes when "All" is selected
        checkboxes.forEach(cb => {
          if(cb.value !== 'all') cb.checked = false;
        });
      } else if(this.checked) {
        // Uncheck "All" when other boxes are selected
        const allCheckbox = document.querySelector('input[value="all"]');
        allCheckbox.checked = false;
      }
      filterProducts();
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.checkbox-filters input');
  const products = document.querySelectorAll('.Product-Aisle .ProductE');

  function filterProducts() {
    const selectedCategories = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    products.forEach(product => {
      const category = product.dataset.category;
      const showProduct = selectedCategories.includes('all') || 
                         selectedCategories.includes(category);
      product.style.display = showProduct ? 'block' : 'none';
    });
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if(this.value === 'all' && this.checked) {
        // Uncheck other boxes when "All" is selected
        checkboxes.forEach(cb => {
          if(cb.value !== 'all') cb.checked = false;
        });
      } else if(this.checked) {
        // Uncheck "All" when other boxes are selected
        const allCheckbox = document.querySelector('input[value="all"]');
        allCheckbox.checked = false;
      }
      filterProducts();
    });
  });
});