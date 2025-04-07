// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save preference to localStorage
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDark);
    });
}

// Check for saved theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
});

// FAQ Toggle Functionality
const questions = document.querySelectorAll('.question');
questions.forEach(question => {
    question.addEventListener('click', () => {
        question.nextElementSibling.classList.toggle('visible');
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        const response = document.getElementById('response');
        response.textContent = `Thanks, ${name}. We'll get back to you soon!`;
        response.style.display = 'block';
        
        // Reset form
        contactForm.reset();
    });
}

// Email validation helper function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Fetch API Integration
const loadUsersBtn = document.getElementById('loadUsersBtn');
if (loadUsersBtn) {
    loadUsersBtn.addEventListener('click', async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!res.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await res.json();
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                userList.appendChild(li);
            });
        } catch (err) {
            console.error('Failed to load users:', err);
            alert('Failed to load users. Please try again later.');
        }
    });
}
// Real-time Clock (Bonus Feature)
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    // Create clock element if it doesn't exist
    let clock = document.getElementById('headerClock');
    if (!clock) {
        clock = document.createElement('div');
        clock.id = 'headerClock';
        document.querySelector('header').appendChild(clock);
    }
    
    clock.textContent = timeString;
}

// Update clock every second
setInterval(updateClock, 1000);
// Initial call
updateClock();