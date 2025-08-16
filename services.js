// This script provides interactive functionality for the services page.
// It ensures the DOM is fully loaded before trying to manipulate it.
document.addEventListener('DOMContentLoaded', () => {

    // Select all elements with the class 'service' to add event listeners.
    const serviceItems = document.querySelectorAll('.service');

    // Check if any service items were found.
    if (serviceItems.length > 0) {
        // Loop through each service item.
        serviceItems.forEach(service => {
            // Add a click event listener to each service div.
            service.addEventListener('click', () => {
                // Get the title of the service from the h3 tag inside it.
                const serviceTitle = service.querySelector('h3').textContent;

                // Create a simple, non-blocking message box to give feedback to the user.
                // Using an element on the page is better than a disruptive alert().
                const messageBox = document.createElement('div');
                messageBox.classList.add('service-message');
                messageBox.textContent = 'You've expressed interest in our ${serviceTitle} service!';

                // Style the message box using inline styles for simplicity.
                messageBox.style.cssText = '
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #003DA5;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    font-family: 'Arial', sans-serif;
                    font-size: 16px;
                    z-index: 1000;
                    transition: opacity 0.5s ease-in-out;
                    opacity: 0;
                ';
                    
                // Append the message box to the body.
                document.body.appendChild(messageBox);
                
                // Make the message box visible with a fade-in effect.
                setTimeout(() => {
                    messageBox.style.opacity = '1';
                }, 10);

                // Remove the message box after 3 seconds.
                setTimeout(() => {
                    messageBox.style.opacity = '0';
                    setTiemout(() => messageBox.remove(), 500);
                }, 3000);
            });
        });
    }
});