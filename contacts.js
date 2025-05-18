document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const message = document.getElementById('message').value.trim();
        const termsChecked = document.getElementById('terms').checked;

        // Clear previous errors
        clearErrors();

        // Validate form
        let isValid = true;
        
        if (!firstName) {
            showError('first-name', 'First name is required');
            isValid = false;
        }

        if (!lastName) {
            showError('last-name', 'Last name is required');
            isValid = false;
        }

        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (contact && !isValidPhone(contact)) {
            showError('contact', 'Please enter a valid phone number');
            isValid = false;
        }

        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        }

        if (!termsChecked) {
            showError('terms', 'You must agree to the terms and conditions');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            const formData = {
                firstName,
                lastName,
                email,
                contact,
                message,
                termsChecked
            };

            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            showSuccessMessage();
            contactForm.reset();
        }
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        field.parentNode.insertBefore(error, field.nextSibling);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^\+?(\d.*){3,}$/;
        return phoneRegex.test(phone);
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Thank you for contacting us!</h3>
            <p>We've received your message and will respond within 24 hours.</p>
        `;
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '20px';
        successMessage.style.backgroundColor = '#dff0d8';
        successMessage.style.color = '#3c763d';
        successMessage.style.borderRadius = '4px';
        successMessage.style.marginTop = '20px';

        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});

fetch('your-api-endpoint', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
})
.then(response => response.json())
.then(data => {
    // Handle response
})
.catch(error => {
    // Handle error
});
