// ===== Typing Effect =====
function initTypingEffect() {
    const typingElement = document.getElementById('typing-effect');
    let typingIndex = 0;

    function typeEffect() {
        if (typingIndex < typingText.length) {
            typingElement.textContent += typingText.charAt(typingIndex);
            typingIndex++;
            setTimeout(typeEffect, 50);
        }
    }

    return typeEffect;
}

// ===== Generate Contribution Graph =====
function generateContributionGraph() {
    const graphContainer = document.getElementById('contribution-graph');
    const { cellCount, monthNames } = contributionConfig;

    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'contribution-cell';
        
        // Random contribution level (0-4)
        const level = Math.floor(Math.random() * 5);
        cell.classList.add(`level-${level}`);

        // Create tooltip
        const date = new Date();
        date.setDate(date.getDate() - (cellCount - i));
        const dateStr = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        const contributions = level === 0 ? 'No' : level;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `${contributions} contributions on ${dateStr}`;
        
        cell.appendChild(tooltip);
        graphContainer.appendChild(cell);
    }
}

// ===== Render Profile Data =====
function renderProfileData() {
    // Update profile name
    const profileName = document.querySelector('.profile-name');
    if (profileName) profileName.textContent = profileData.name;

    // Update profile position
    const profilePosition = document.querySelector('.profile-position');
    if (profilePosition) profilePosition.textContent = profileData.position;

    // Update profile bio
    const profileBio = document.querySelector('.profile-bio');
    if (profileBio) profileBio.textContent = profileData.bio;
}

// ===== Render Tech Stack =====
function renderTechStack() {
    const techStackContainer = document.querySelector('.tech-stack');
    if (!techStackContainer) return;

    const techCategories = [
        { label: '🎯 Languages', items: techStack.languages },
        { label: '🎨 Frontend', items: techStack.frontend },
        { label: '⚙️ Backend', items: techStack.backend }
    ];

    techStackContainer.innerHTML = techCategories.map(category => `
        <div>
            <div class="tech-label">${category.label}</div>
            <div class="tech-tags">
                ${category.items.map(item => `<span class="tech-tag">${item}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// ===== Render Interests =====
function renderInterests() {
    const interestsList = document.querySelector('.interests-list');
    if (!interestsList) return;

    interestsList.innerHTML = interests.map(interest => `
        <div class="interest-item">
            <span class="interest-icon">${interest.icon}</span>
            <span>${interest.text}</span>
        </div>
    `).join('');
}

// ===== Render Education Data =====
function renderEducationData() {
    const educationTimeline = document.querySelector('.education-timeline');
    if (!educationTimeline) return;

    educationTimeline.innerHTML = educationData.map((edu, index) => `
        <div class="education-card">
            <div class="education-header">
                <span class="education-icon">${edu.icon}</span>
                <div class="education-info">
                    <div class="education-school">${edu.school}</div>
                    <div class="education-degree">${edu.degree}</div>
                </div>
            </div>
            <p class="education-description">
                ${edu.description}
            </p>
            <div class="education-period">
                <span class="period-icon">📅</span>
                <span>${edu.period}</span>
            </div>
        </div>
        ${index < educationData.length - 1 ? '<div class="education-connector"></div>' : ''}
    `).join('');
}

// ===== Smooth Scroll Behavior =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Interest Items Click Effect =====
function initInterestClickEffect() {
    document.querySelectorAll('.interest-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ===== Parallax effect for background blobs =====
function initParallaxEffect() {
    window.addEventListener('mousemove', (e) => {
        const body = document.body;
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        
        // Subtle parallax for blobs
        body.style.backgroundPosition = `${x}px ${y}px`;
    });
}

// ===== Tech Tag Animation =====
function initTechTagAnimation() {
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.setProperty('--rotate', '360deg');
        });
    });
}

// ===== Card Fade-In Animation =====
function initCardAnimation() {
    const cards = document.querySelectorAll('.card, .profile-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
    });
}

// ===== Initialize All Functions =====
document.addEventListener('DOMContentLoaded', () => {
    // Render all data
    renderProfileData();
    renderTechStack();
    renderInterests();
    renderEducationData();
    
    // Initialize effects
    initCardAnimation();
    initSmoothScroll();
    initInterestClickEffect();
    initParallaxEffect();
    initTechTagAnimation();
});

// Start typing effect when page loads
window.addEventListener('load', () => {
    const typeEffect = initTypingEffect();
    typeEffect();
    generateContributionGraph();
});
