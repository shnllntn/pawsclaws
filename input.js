document.addEventListener('DOMContentLoaded', () => {
  // 🔐 Newsletter Signup
  const newsletterForm = document.querySelector('.newsletterF');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (validateEmail(email)) {
        alert('Thank you for subscribing!');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

});