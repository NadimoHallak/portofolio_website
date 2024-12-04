// Hide loading screen when page is fully loaded
window.onload = function() {
    document.querySelector('.loading-screen').style.display = 'none';
};

// Particles Animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5}px;
            height: ${Math.random() * 5}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Typing Animation
function typeText() {
    const text = document.querySelector('.typing-text');
    const words = ['مطور تطبيقات موبايل', 'مطور مواقع ويب', 'مطور تطبيقات كمبيوتر'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            text.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 150);
        }
    }

    type();
}

// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Number Animation
function animateNumbers() {
    const experienceSection = document.querySelector('.experience-grid');
    let hasAnimated = false;

    function startNumberAnimation() {
        const numbers = document.querySelectorAll('.number');
        
        numbers.forEach((numberElement, index) => {
            const finalValue = parseInt(numberElement.getAttribute('data-value'));
            const duration = 3000; // 3 seconds
            const frameDuration = 1000/60; // 60fps
            const totalFrames = Math.round(duration/frameDuration);
            
            // إنشاء عنصر للتأثير المرئي
            const effectElement = document.createElement('span');
            effectElement.className = 'number-effect';
            numberElement.appendChild(effectElement);

            let frame = 0;
            const easeOutQuint = t => 1 + (--t) * t * t * t * t;
            
            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const currentValue = Math.round(easeOutQuint(progress) * finalValue);
                
                // إنشاء عناصر الأرقام المتحركة
                const currentValueStr = currentValue.toString();
                const previousValueStr = (frame > 1) ? Math.round(easeOutQuint((frame - 1) / totalFrames) * finalValue).toString() : '0';
                
                let html = '';
                for(let i = 0; i < currentValueStr.length; i++) {
                    const currentDigit = currentValueStr[i];
                    const previousDigit = (i < previousValueStr.length) ? previousValueStr[i] : '0';
                    
                    if(currentDigit !== previousDigit) {
                        html += `<span class="number-digit-wrapper">
                                    <span class="number-digit leaving">${previousDigit}</span>
                                    <span class="number-digit entering">${currentDigit}</span>
                                </span>`;
                    } else {
                        html += `<span class="number-digit-wrapper">
                                    <span class="number-digit">${currentDigit}</span>
                                </span>`;
                    }
                }
                
                numberElement.innerHTML = html;
                
                if (frame === totalFrames) {
                    clearInterval(counter);
                    // إضافة تأثير النهاية
                    numberElement.classList.add('animation-completed');
                }
            }, frameDuration);

            // أنيميشن تأثير الوهج
            anime({
                targets: effectElement,
                scale: [1, 1.5],
                opacity: [0.5, 0],
                easing: 'easeOutCirc',
                duration: 800,
                delay: index * 300,
                loop: true
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                startNumberAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (experienceSection) {
        observer.observe(experienceSection);
    }
}

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Send email using mailto
    const mailtoLink = `mailto:moh.nadim.hallak@gmail.com?subject=رسالة من ${data.name}&body=من: ${data.name}%0D%0Aالبريد الإلكتروني: ${data.email}%0D%0A%0D%0Aالرسالة:%0D%0A${data.message}`;
    window.location.href = mailtoLink;
    
    // Create and show thank you message with animation
    const thankYouDiv = document.createElement('div');
    thankYouDiv.className = 'thank-you-message';
    thankYouDiv.innerHTML = `
        <div class="thank-you-content">
            <i class="fas fa-check-circle"></i>
            <h3>شكراً لتواصلك معنا!</h3>
            <p>سيتم الرد عليك في أقرب وقت ممكن</p>
        </div>
    `;
    document.body.appendChild(thankYouDiv);
    
    // Clear form fields
    this.reset();
    
    // Remove thank you message after 3 seconds
    setTimeout(() => {
        thankYouDiv.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(thankYouDiv);
        }, 500);
    }, 3000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    typeText();
    animateOnScroll();
    animateProgressBars();
    animateNumbers();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content')) {
        navLinks.classList.remove('active');
    }
});
