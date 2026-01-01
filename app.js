/**
 * Sweet Postcard App - Main Application Logic
 */

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const postcardScreen = document.getElementById('postcardScreen');
const envelopeScreen = document.getElementById('envelopeScreen');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Current user data
let currentUser = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    setupEventListeners();
});

// Create subtle ambient particles background
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('span');
        particle.className = 'floating-heart';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${20 + Math.random() * 15}s`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.width = `${4 + Math.random() * 6}px`;
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    loginForm.addEventListener('submit', handleLogin);

    // Postcard click handler
    const clickPrompt = document.getElementById('clickPrompt');
    clickPrompt.addEventListener('click', showEnvelope);

    // Envelope click handler
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', openEnvelope);
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const password = document.getElementById('password').value;

    // Find matching friend in config (supports individuals and families with different last names)
    const friend = FRIENDS_CONFIG.friends.find(f => {
        const passwordMatch = f.password === password;

        // Check if this is the first person
        const isPerson1 =
            f.firstName.toLowerCase() === firstName.toLowerCase() &&
            f.lastName.toLowerCase() === lastName.toLowerCase();

        // Check if this is the second person (for families/couples)
        const isPerson2 = f.firstName2 &&
            f.firstName2.toLowerCase() === firstName.toLowerCase() &&
            (f.lastName2
                ? f.lastName2.toLowerCase() === lastName.toLowerCase()
                : f.lastName.toLowerCase() === lastName.toLowerCase());

        return passwordMatch && (isPerson1 || isPerson2);
    });

    if (friend) {
        currentUser = friend;
        showPostcard();
    } else {
        showError('Invalid credentials. Please check your name and password.');
    }
}

// Get display name (handles individuals and families with different last names)
function getDisplayName(user) {
    if (user.firstName2) {
        if (user.lastName2 && user.lastName2 !== user.lastName) {
            // Different last names: "Mike Johnson & Sarah Smith"
            return `${user.firstName} ${user.lastName} & ${user.firstName2} ${user.lastName2}`;
        }
        // Same last name: "Mike & Sarah Johnson"
        return `${user.firstName} & ${user.firstName2} ${user.lastName}`;
    }
    // Individual: "John Doe"
    return `${user.firstName} ${user.lastName}`;
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');

    // Shake animation
    const loginCard = document.querySelector('.login-card');
    loginCard.style.animation = 'none';
    loginCard.offsetHeight; // Trigger reflow
    loginCard.style.animation = 'shake 0.5s ease-out';

    setTimeout(() => {
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';
    }, 3000);
}

// Add shake animation dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// Switch screens
function switchScreen(from, to) {
    from.classList.remove('active');
    setTimeout(() => {
        to.classList.add('active');
    }, 300);
}

// Show postcard screen
function showPostcard() {
    // Populate postcard data with full name (handles families)
    document.getElementById('recipientName').textContent = getDisplayName(currentUser);
    document.getElementById('senderName').textContent = FRIENDS_CONFIG.senderName;

    switchScreen(loginScreen, postcardScreen);
}

// Show envelope screen
function showEnvelope() {
    // Populate envelope data (handles families)
    const greeting = currentUser.firstName2
        ? `${currentUser.firstName} & ${currentUser.firstName2}`
        : currentUser.firstName;

    document.getElementById('letterRecipient').textContent = greeting;
    document.getElementById('letterMessage').textContent = currentUser.finalMessage;
    document.getElementById('letterSender').textContent = FRIENDS_CONFIG.senderName;

    // Setup memories section if available
    const memoriesButton = document.getElementById('memoriesButton');
    const memoriesList = document.getElementById('memoriesList');
    const memoriesContent = document.getElementById('memoriesContent');

    if (currentUser.memories && currentUser.memories.length > 0) {
        // Show memories button
        memoriesButton.style.display = 'flex';

        // Populate memories list
        memoriesContent.innerHTML = '';
        currentUser.memories.forEach(memory => {
            const li = document.createElement('li');
            li.textContent = memory;
            memoriesContent.appendChild(li);
        });

        // Add click handler for toggle
        memoriesButton.onclick = toggleMemories;
    } else {
        // Hide memories button if no memories
        memoriesButton.style.display = 'none';
        memoriesList.style.display = 'none';
    }

    // Create confetti background
    createConfettiBackground();

    switchScreen(postcardScreen, envelopeScreen);
}

// Toggle memories visibility
function toggleMemories() {
    const memoriesButton = document.getElementById('memoriesButton');
    const memoriesList = document.getElementById('memoriesList');

    if (memoriesList.style.display === 'none') {
        memoriesList.style.display = 'block';
        memoriesButton.classList.add('expanded');
    } else {
        memoriesList.style.display = 'none';
        memoriesButton.classList.remove('expanded');
    }
}

// Create floating confetti background
function createConfettiBackground() {
    const container = document.getElementById('confettiBg');
    if (!container) return;

    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#1dd1a1', '#fdcb6e', '#e17055'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < 40; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';

        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 100}%`;
        piece.style.backgroundColor = color;
        piece.style.borderRadius = shape === 'circle' ? '50%' : '2px';
        piece.style.width = `${4 + Math.random() * 8}px`;
        piece.style.height = piece.style.width;
        piece.style.animationDuration = `${5 + Math.random() * 5}s`;
        piece.style.animationDelay = `${Math.random() * 3}s`;

        container.appendChild(piece);
    }
}

// Open envelope and reveal message
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const tapHint = document.getElementById('tapHint');

    if (!envelope.classList.contains('opened')) {
        envelope.classList.add('opened');
        tapHint.classList.add('hidden');

        // Trigger confetti after envelope opens
        setTimeout(createConfetti, 1000);
    }
}

// Create confetti celebration
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#1dd1a1'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = shape === 'circle' ? '50%' : '0';
        confetti.style.width = `${5 + Math.random() * 10}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;

        container.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 4500);
    }
}
