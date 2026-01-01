// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // ===== Loading Screen =====
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    
    // ===== Theme Toggle =====
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update background animation colors
        updateBackgroundAnimation(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(180deg) scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
        
        // Add sound effect (optional)
        playClickSound();
    });
    
    // ===== Mobile Navigation =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Toggle body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        playClickSound();
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !menuToggle.contains(e.target) && 
            !navLinks.contains(e.target) && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // ===== Scroll to Top =====
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        // Animate elements on scroll
        animateOnScroll();
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        playClickSound();
    });
    
    // ===== Update Active Navigation Link =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                playClickSound();
            }
        });
    });
    
    // ===== Animate Elements on Scroll =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Initialize scroll animation
    animateOnScroll();
    
    // ===== Animated Counter for Stats =====
    function animateCounter() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-count');
                const data = +counter.innerText.replace('+', '');
                
                const time = value / speed;
                if (data < value) {
                    counter.innerText = Math.ceil(data + time) + '+';
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value + '+';
                }
            };
            
            if (isElementInViewport(counter)) {
                animate();
            }
        });
    }
    
    // Initialize counter animation
    window.addEventListener('scroll', animateCounter);
    window.addEventListener('load', animateCounter);
    
    // ===== Animate Skill Bars =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        skillBars.forEach(bar => {
            if (isElementInViewport(bar)) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }
    
    // Initialize skill bars animation
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
    
    // ===== Skills Tabs =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            playClickSound();
        });
    });
    
    // ===== Projects Filter =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            playClickSound();
        });
    });
    
    // ===== Testimonials Slider =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialCards.length) nextIndex = 0;
        showSlide(nextIndex);
        playClickSound();
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) prevIndex = testimonialCards.length - 1;
        showSlide(prevIndex);
        playClickSound();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            playClickSound();
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialCards.length) nextIndex = 0;
        showSlide(nextIndex);
    }, 5000);
    
    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    
                    // Remove error style after 2 seconds
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                const originalWidth = submitBtn.offsetWidth;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.style.width = originalWidth + 'px';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.width = '';
                    submitBtn.disabled = false;
                    
                    playSuccessSound();
                }, 2000);
            } else {
                showNotification('Please fill in all required fields.', 'error');
                playErrorSound();
            }
        });
    }
    
    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalHtml = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                // Simulate subscription (replace with actual API call)
                setTimeout(() => {
                    showNotification('Thanks for subscribing! You\'ll hear from me soon.', 'success');
                    emailInput.value = '';
                    submitBtn.innerHTML = originalHtml;
                    submitBtn.disabled = false;
                    playSuccessSound();
                }, 1500);
            } else {
                showNotification('Please enter a valid email address.', 'error');
                playErrorSound();
                emailInput.style.borderColor = '#e74c3c';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }
    
    // ===== Notification System =====
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // ===== Email Validation =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== Background Animation =====
    function createBackgroundAnimation() {
        const bgAnimation = document.createElement('div');
        bgAnimation.className = 'floating-shapes';
        
        // Create floating shapes
        const shapesCount = window.innerWidth < 768 ? 8 : 15;
        
        for (let i = 0; i < shapesCount; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            // Random size between 50px and 200px
            const size = Math.random() * 150 + 50;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            
            // Random position
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            
            // Random opacity
            shape.style.opacity = Math.random() * 0.1 + 0.03;
            
            // Random animation
            const duration = Math.random() * 30 + 20;
            const delay = Math.random() * 5;
            shape.style.animation = `floatShape ${duration}s infinite linear ${delay}s`;
            
            // Random blur effect
            shape.style.filter = `blur(${Math.random() * 20 + 5}px)`;
            
            bgAnimation.appendChild(shape);
        }
        
        document.body.appendChild(bgAnimation);
    }
    
    function updateBackgroundAnimation(theme) {
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach(shape => {
            if (theme === 'dark') {
                shape.style.background = 'linear-gradient(45deg, var(--secondary), transparent)';
            } else {
                shape.style.background = 'linear-gradient(45deg, rgba(52, 152, 219, 0.1), transparent)';
            }
        });
    }
    
    // Create initial background animation
    createBackgroundAnimation();
    
    // ===== Floating Elements Animation =====
    function createFloatingElements() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Create floating code snippets
        const codeSnippets = ['{ }', '</>', 'console.log();', 'function()', 'const =', '=>'];
        
        codeSnippets.forEach((code, index) => {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = code;
            element.style.position = 'absolute';
            element.style.color = 'rgba(255, 255, 255, 0.1)';
            element.style.fontSize = `${Math.random() * 20 + 10}px`;
            element.style.fontFamily = 'monospace';
            element.style.fontWeight = 'bold';
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.zIndex = '0';
            element.style.pointerEvents = 'none';
            element.style.userSelect = 'none';
            element.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out ${index * 0.5}s`;
            
            heroSection.appendChild(element);
        });
    }
    
    // Create floating elements
    createFloatingElements();
    
    // ===== Sound Effects =====
    function playClickSound() {
        // Create a simple click sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    function playSuccessSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    function playErrorSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
            oscillator.frequency.setValueAtTime(293.66, audioContext.currentTime + 0.1); // D4
            oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime + 0.2); // C4
            
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    // ===== Typing Effect =====
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const text = "John Doe";
        const speed = 100;
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML = text.substring(0, i + 1) + '<span class="highlight">' + text.substring(i + 1) + '</span>';
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing effect when hero section is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(heroTitle);
    }
    
    // Initialize typing effect
    initTypingEffect();
    
    // ===== Particle System =====
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        const particleCount = window.innerWidth < 768 ? 30 : 60;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random color
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.6 + 0.2;
            
            // Random animation
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `floatParticle ${duration}s infinite linear ${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) translateX(0) rotate(0deg);
                }
                100% {
                    transform: translateY(-100px) translateX(100px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create particles
    createParticles();
    
    // ===== Parallax Effect =====
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
    
    // Initialize parallax
    initParallax();
    
    // ===== Form Input Animation =====
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // ===== Download CV Button =====
    const downloadBtn = document.querySelector('a[download]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // Simulate download
            showNotification('CV download started!', 'success');
            playSuccessSound();
        });
    }
    
    // ===== Social Links Hover Effect =====
    const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
    
    // ===== Add CSS for Notifications =====
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            background: var(--card-bg);
            color: var(--text-color);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 15px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 9999;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #2ecc71;
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-warning {
            border-left: 4px solid #f39c12;
        }
        
        .notification-info {
            border-left: 4px solid #3498db;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i {
            color: #2ecc71;
        }
        
        .notification-error i {
            color: #e74c3c;
        }
        
        .notification-warning i {
            color: #f39c12;
        }
        
        .notification-info i {
            color: #3498db;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            margin-left: auto;
            font-size: 1rem;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: var(--text-color);
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // ===== Add CSS for Floating Elements =====
    const floatingStyles = document.createElement('style');
    floatingStyles.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(5deg);
            }
        }
        
        .floating-element {
            animation: float 10s infinite ease-in-out;
        }
    `;
    document.head.appendChild(floatingStyles);
    
    // ===== Add Animation Classes to Elements =====
    function addAnimationClasses() {
        const sections = document.querySelectorAll('section:not(#home)');
        const cards = document.querySelectorAll('.skill-card, .project-card, .experience-item, .contact-card');
        
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
        });
        
        cards.forEach(card => {
            card.classList.add('animate-on-scroll');
        });
    }
    
    // Add animation classes
    addAnimationClasses();
    
    // ===== Window Resize Handling =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Update particles count on resize
            const particlesContainer = document.querySelector('.particles-container');
            if (particlesContainer) {
                particlesContainer.remove();
                createParticles();
            }
            
            // Update floating shapes count
            const floatingShapes = document.querySelector('.floating-shapes');
            if (floatingShapes) {
                floatingShapes.remove();
                createBackgroundAnimation();
            }
            
            // Close mobile menu if screen size changes
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    // ===== Keyboard Shortcuts =====
    document.addEventListener('keydown', (e) => {
        // Toggle theme with Ctrl/Cmd + T
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Scroll to top with Ctrl/Cmd + Home
        if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
            e.preventDefault();
            scrollTopBtn.click();
        }
        
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // ===== Initialize All Features =====
    console.log('Portfolio website initialized successfully!');
});