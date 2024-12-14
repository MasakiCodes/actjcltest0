document.getElementById('search').addEventListener('input', function(e) {
    const searchValue = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchValue)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
