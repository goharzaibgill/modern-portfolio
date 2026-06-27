document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initCursorGlow();
    initScrollIndicator();
    initScrollAnimations();
    initFormHandling();
    initMobileMenu();
    initTypedText();
    initCounters();
    initLightbox();
    initBackToTop();
    initNavbarScroll();
    initSmoothAnchors();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navMenu = document.getElementById('navMenu');
                    navMenu.classList.remove('open');
                    document.getElementById('hamburger').classList.remove('active');

                    const navbar = document.querySelector('.navbar');
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navHeight - 10;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    let ticking = false;

    const updateActiveNav = () => {
        let current = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    }, { passive: true });

    updateActiveNav();
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });
}

function initTypedText() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const phrases = [
        'build web applications',
        'solve problems',
        'design interfaces',
        'write clean code',
        'learn new technologies'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isPaused) {
            setTimeout(type, 1500);
            isPaused = false;
            isDeleting = true;
            return;
        }

        if (isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                charIndex = 0;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 35);
        } else {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isPaused = true;
                setTimeout(type, 200);
                return;
            }
            setTimeout(type, 60);
        }
    }

    type();
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observerOptions = { threshold: 0.5 };
    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.closest('.stat-item').getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                observer.disconnect();
            }
        });
    }, observerOptions);

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) observer.observe(statsGrid);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const duration = 1500;
    const stepTime = Math.floor(duration / 60);

    function update() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            return;
        }
        element.textContent = current;
        setTimeout(update, stepTime);
    }

    update();
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    document.querySelectorAll('.certificate-preview').forEach(preview => {
        preview.addEventListener('click', function () {
            const img = this.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === this) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow || window.innerWidth <= 768) return;
    cursorGlow.style.display = 'block';
    document.addEventListener('mouseleave', () => { cursorGlow.style.display = 'none'; });
    document.addEventListener('mouseenter', () => { cursorGlow.style.display = 'block'; });
}

function initScrollIndicator() {
    const scrollBar = document.querySelector('.scroll-bar');
    if (!scrollBar) return;

    let ticking = false;

    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollBar.style.height = scrollPercent + '%';
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    update();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || '0';
                setTimeout(() => {
                    entry.target.style.animation = 'fadeUp 0.7s ease-out forwards';
                    entry.target.style.opacity = '1';
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalHtml = submitButton.innerHTML;

        submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitButton.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            submitButton.innerHTML = 'Try Again <i class="fas fa-envelope"></i>';
        }

        setTimeout(() => {
            submitButton.innerHTML = originalHtml;
            submitButton.disabled = false;
        }, 4000);
    });
}

function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                window.scrollTo({
                    top: target.offsetTop - navHeight - 10,
                    behavior: 'smooth'
                });
            }
        });
    });
}
