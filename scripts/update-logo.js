// Script to update all HTML files with logo image
document.addEventListener("DOMContentLoaded", function() {
    // Find all logo elements in the page
    const logoElements = document.querySelectorAll('header .container a.logo');
    
    // Replace each logo with the new format that includes image
    logoElements.forEach(function(logoElement) {
        const currentPath = logoElement.getAttribute('href');
        const isIndex = currentPath.includes('index.html');
        const imagePath = isIndex ? 'assets/images/ayan.jpg' : '../assets/images/ayan.jpg';
        
        // Create new header logo element
        const newLogoHTML = `
            <a href="${currentPath}" class="header-logo">
                <img src="${imagePath}" alt="Ayan Sarkar" class="logo-image">
                <span class="logo">Ayan Sarkar</span>
            </a>
        `;
        
        // Replace the old logo with the new one
        logoElement.outerHTML = newLogoHTML;
    });
}); 