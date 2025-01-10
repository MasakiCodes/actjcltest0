document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const currentYearGroup = document.getElementById(`year-${currentYear}`);
    
    if (currentYearGroup) {
        currentYearGroup.querySelector('.months').style.display = 'block';
    }

    document.querySelectorAll('.year-header').forEach(header => {
        header.addEventListener('click', () => {
            const months = header.nextElementSibling;
            if (months) {
                months.style.display = months.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    document.querySelectorAll('.month-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content) {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});