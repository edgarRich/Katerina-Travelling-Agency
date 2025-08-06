document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.textDecoration = 'underline';
        });
        
        link.addEventListener('mouseout', function() {
            this.style.textDecoration = 'none';
        });
    });
});
