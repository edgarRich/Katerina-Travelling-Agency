document.addEventListener("DOMContentLoaded", function() {
    const contactSection = document.getElementById("contact");
    const contactInfo = document.createElement("p");
    contactInfo.innerHTML = 'For inquiries, please reach out to us at <a href="mailto:info@katerinatravelling.com">info@katerinatravelling.com</a>.';
    contactSection.appendChild(contactInfo);
});
