document.addEventListener("DOMContentLoaded", function() {
    const services = [
        {
            title: "Hotel Reservations",
            description: "Find the best hotels at unbeatable prices."
        },
        {
            title: "Flight Bookings",
            description: "Book flights to your favorite destinations."
        },
        {
            title: "Custom Travel Packages",
            description: "Tailored packages for honeymoons, group travel, and corporate retreats."
        },
        {
            title: "Car Hire",
            description: "Self-drive and chauffeur-driven options available."
        },
        {
            title: "City Tours",
            description: "Explore cities with our guided tours and excursions."
        },
        {
            title: "Travel Insurance",
            description: "Stay protected with our comprehensive travel insurance plans."
        },
        {
            title: "Visa Assistance",
            description: "Get help with visa applications and consultations."
        }
    ];

    const serviceList = document.querySelector('.service-list');
    services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('service');
        serviceDiv.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p>`;
        serviceList.appendChild(serviceDiv);
    });
});
