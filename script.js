// Cursor Follower
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor following animation
function animateCursor() {
    const speed = 0.2;

    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;

    cursorFollower.style.left = followerX - 10 + 'px';
    cursorFollower.style.top = followerY - 10 + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Click Spark Effect
function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = x - 5 + 'px';
    spark.style.top = y - 5 + 'px';

    document.body.appendChild(spark);

    // Remove spark after animation
    setTimeout(() => {
        if (spark.parentNode) {
            spark.parentNode.removeChild(spark);
        }
    }, 600);
}

// Add click spark effect to all clickable elements
document.addEventListener('click', (e) => {
    createSpark(e.clientX, e.clientY);

    // Add extra sparks for work cards
    if (e.target.closest('.work-card')) {
        setTimeout(() => createSpark(e.clientX + 20, e.clientY - 10), 100);
        setTimeout(() => createSpark(e.clientX - 15, e.clientY + 15), 200);
    }
});

// Enhanced hover effects for work cards
const workCards = document.querySelectorAll('.work-card');

workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add a subtle pulse effect
        card.style.animation = 'pulse 0.6s ease-in-out';
    });

    card.addEventListener('mouseleave', () => {
        card.style.animation = '';
    });
});

// Arrow button interactions
const arrowBtns = document.querySelectorAll('.arrow-btn');

arrowBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Add extra sparks for arrow button clicks
        setTimeout(() => createSpark(e.clientX + 15, e.clientY - 8), 50);
        setTimeout(() => createSpark(e.clientX - 10, e.clientY + 12), 150);
    });
});

// Tool card interactions
const toolCards = document.querySelectorAll('.tool-card');

toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'wobble 0.5s ease-in-out';
    });

    card.addEventListener('mouseleave', () => {
        card.style.animation = '';
    });
});

// Contact button enhancements
const contactBtns = document.querySelectorAll('.contact-btn');

contactBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.animation = 'shake 0.5s ease-in-out';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.animation = '';
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes wobble {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-3deg); }
        75% { transform: rotate(3deg); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Reduced parallax effect for hero section to prevent overlap
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        const speed = scrolled * 0.2; // Reduced from 0.5 to 0.2
        heroContent.style.transform = `rotate(-3deg) translateY(${speed}px)`;
    }
});

// Random color changes for magic text
const magicText = document.querySelector('.magic-text');
const colors = ['#A020F0', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

if (magicText) {
    setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        magicText.style.color = randomColor;
    }, 2000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code for extra effects
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate party mode!
        document.body.style.animation = 'rainbow 2s infinite';

        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);

        // Reset after 10 seconds
        setTimeout(() => {
            document.body.style.animation = '';
            if (rainbowStyle.parentNode) {
                rainbowStyle.parentNode.removeChild(rainbowStyle);
            }
        }, 10000);

        konamiCode = [];
    }
});