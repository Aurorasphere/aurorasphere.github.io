// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Typing animation for hero section
    const heroTitle = document.querySelector('.name');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section - Disabled to prevent overlapping issues
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const hero = document.querySelector('.hero');
    //     if (hero) {
    //         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    //     }
    // });

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 50);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // Dynamic background particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(203, 166, 247, 0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '0';

        document.body.appendChild(particle);

        const animationDuration = Math.random() * 10000 + 5000;
        const drift = (Math.random() - 0.5) * 200;

        particle.animate([
            {
                transform: 'translateY(0px) translateX(0px)',
                opacity: 0
            },
            {
                transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px)`,
                opacity: 0.5
            },
            {
                transform: `translateY(-${window.innerHeight + 200}px) translateX(${drift * 2}px)`,
                opacity: 0
            }
        ], {
            duration: animationDuration,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Theme toggle functionality (for future enhancement)
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
            }
        }
    }

    initThemeToggle();

    // Navbar background opacity on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(17, 17, 27, 0.98)';
        } else {
            nav.style.backgroundColor = 'rgba(17, 17, 27, 0.95)';
        }
    });

    // Loading animation
    function hideLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }

    // Hide loader when page is fully loaded
    window.addEventListener('load', hideLoader);

    // Copy email to clipboard functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'Email copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--green);
                    color: var(--base);
                    padding: 1rem 2rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    z-index: 10000;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.opacity = '1';
                    notification.style.transform = 'translateY(0)';
                }, 100);
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateY(-20px)';
                    setTimeout(() => notification.remove(), 300);
                }, 3000);
            });
        });
    }
});
