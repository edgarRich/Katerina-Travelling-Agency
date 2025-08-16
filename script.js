// This script provides all the dynamic functionality for the single-page application
// It uses a single-page app (SPA) approach, where navigation is handled by showind and hiding sections

document.addEventListener('DOMContentLoaded', () => {
    // -- Navigation and Smooth Scrolling ---
    // The HTML uses href="#section-id" for navigation. The 'scroll-behavior: smooth'
    // in the CSS handles the animation. The fixed header is accounted for with
    // 'scroll-padding-top' to prevent content from being hidden.

    // -- Service Card Interactions ---
    // Add a click event listener to each service card to provide user feedback.
    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceTitle = card.querySelector('h3').textContent;
                // Display a proffessional, non-disruptive message box instead of an 'alert'.
                showMessage(`You clicked on "${serviceTitle}". We are here to help you!`);
            });
        });


// --- Registration Form Handling --- 
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission and page reload.

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Simple client-side validation
        if (name && email) {
            // Display a success message
            showMessage(`Thank you for registering, ${name}! We will contact you at ${email}.`);
            // Clear the form fields after successful submission.
            registrationForm.reset();
        } else {
            // Display an error message if fields are empty
            showMessage("Please fill out both name and email fields.", "error");
        }
    });
}      

/**
* Creates and displays a temporary message box for user feedback.
* @param {string} message The message to display.
* @param {string} type The type of message ("success" or "error").
*/        
function showMessage(message, type = "success") {
    // Remove any existing message box to prevent multiple from appearing.
    const existingMessage = document.querySelector('.feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.classList.add('feedback-message', 'fixed', 'bottom-8', 'left-1/2', 'transform', '-translate-x-1/2', 'p-4', 'rounded-lg', 'shadow-xl', 'text-white', 'font-medium', 'z-50', 'transition-all', 'duration-500', 'opacity-0', 'scale-95');

        // Apply colors based on message type
        if (type === "success") {
            messageBox.classList.add('bg-blue-600');
        } else if (type === "error") {
            messageBox.classList.add('bg-red-600');
        }

        document.body.appendChild(messageBox);

        // Fade in the message box
        setTimeout(() => {
            messageBox.classList.remove('opacity-0', 'scale-95');
            messageBox.classList.add('opacity-100', 'scale-100');
        }, 50);

        // Fade out and remove the message box after 4 seconds
        setTimeout(() => {
            messageBox.classList.remove('opacity-100', 'scale-100');
            messageBox.classList.add('opacity-0', 'scale-95');
            setTimeout(() => messageBox.remove(), 500); // Remove after transition
        }, 4000);
    }
});
