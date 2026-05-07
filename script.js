/* 
   =========================================
   JAMI SAI DINESH - PORTFOLIO SCRIPTS
   =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        hamburger.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- Sticky Navbar ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('active');

            // If it's the about section, trigger counters
            if (entry.target.id === 'about') {
                runCounters();
            }

            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Number Counter Animation ---
    let countersRun = false;

    function runCounters() {
        if (countersRun) return;
        countersRun = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const targetText = counter.getAttribute('data-target');
                const isFloat = targetText.includes('.');
                const target = parseFloat(targetText);

                const count = parseFloat(counter.innerText);
                const inc = target / speed;

                if (count < target) {
                    if (isFloat) {
                        counter.innerText = (count + inc).toFixed(2);
                    } else {
                        counter.innerText = Math.ceil(count + inc);
                    }
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = targetText;
                }
            };

            updateCount();
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Submission Handling ---
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                btn.classList.replace('btn-primary', 'btn-secondary');
                btn.style.color = '#10b981'; // Green
                btn.style.borderColor = '#10b981';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-secondary', 'btn-primary');
                    btn.style.color = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // --- Custom Cursor Logic ---
    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category, .social-icon');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // --- Image Modal Logic ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');
    const certThumbnails = document.querySelectorAll('.cert-thumbnail');

    if (modal && modalImg) {
        certThumbnails.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'flex';
                // slight delay to allow display:flex to apply before adding opacity class for transition
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
                // Use the clicked image's src for the modal
                modalImg.src = this.src;
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // matches transition duration
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on background click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});
