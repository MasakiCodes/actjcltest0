// Search for Upcoming Competitions
document.getElementById('search-upcoming').addEventListener('input', function (e) {
    const searchValue = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.upcomingcompetitionsblog .blog-post');

    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchValue)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

// Search for Completed Competitions
document.getElementById('search-completed').addEventListener('input', function (e) {
    const searchValue = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.completedtournamentsblog .blog-post');

    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchValue)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

