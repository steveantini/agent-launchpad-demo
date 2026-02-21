// JavaScript for the 'Back to Top' button
window.addEventListener('scroll', function() {
    var backToTopButton = document.querySelector('.back-to-top');

     if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});