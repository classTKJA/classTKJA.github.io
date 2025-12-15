// Menggunakan sintaks DOMContentLoaded untuk memastikan semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // ===========================================
    // 1. Logika Toggle Menu & Form Feedback 
    // ===========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const emailInput = this.querySelector('input[type="email"]').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(emailInput)) {
                formMessage.textContent = '❌ Error: Format email tidak valid.';
                formMessage.style.color = '#dc3545';
                return;
            }

            formMessage.textContent = '✅ Pesan Anda telah diterima! Terima kasih.';
            formMessage.style.color = 'var(--color-primary)'; 

            setTimeout(() => {
                contactForm.reset();
                formMessage.textContent = '';
            }, 4000); 
        });
    }


    // ===========================================
    // 2. Toggle Dark Mode 
    // ===========================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
             darkModeToggle.textContent = '🌙'; 
        }
    } else {
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️'; 
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.textContent = '🌙';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.textContent = '☀️';
            }
            
            setupBackgroundChanger(true); 
        });
    }


   
    // ===========================================
    // 3. Greeting Message Dinamis (FIXED)
    // ===========================================
    const heroTitle = document.querySelector('.hero__title');
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 10) {
        greeting = "Selamat Pagi! Kelas Inspiratif Angkatan 2025";
    } else if (currentHour < 15) {
        greeting = "Selamat Siang! Bersama Meraih Prestasi";
    } else if (currentHour < 18) {
        greeting = "Selamat Sore! Energi Positif Kelas Kita";
    } else {
        greeting = "Selamat Malam! Mari Bersiap untuk Esok Hari";
    }

    if (heroTitle) {
        // FIX: Langsung terapkan pesan sambutan dinamis
        heroTitle.textContent = greeting;
    }

    // ===========================================
    // 4. Typing Effect pada Subtitle
    // ===========================================
    const typedTextElement = document.getElementById('typed-text');
    const textToType = ["Kreatif.", "Kolaboratif.", "Berani Berdampak.", "Inilah Kami."];
    let textIndex = 0;
    let charIndex = 0;
    const typingSpeed = 70; 
    const delayBetweenWords = 1500; 

    function startTypingEffect() {
        if (!typedTextElement) return;
        
        if (textIndex < textToType.length) {
            if (charIndex < textToType[textIndex].length) {
                typedTextElement.textContent += textToType[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(startTypingEffect, typingSpeed);
            } else {
                setTimeout(eraseText, delayBetweenWords);
            }
        } else {
            textIndex = 0;
            setTimeout(startTypingEffect, delayBetweenWords);
        }
    }

    function eraseText() {
        if (!typedTextElement) return;
        
        if (charIndex > 0) {
            typedTextElement.textContent = textToType[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, typingSpeed / 2);
        } else {
            textIndex++;
            setTimeout(startTypingEffect, typingSpeed);
        }
    }
    
    if (typedTextElement) {
        setTimeout(startTypingEffect, 700);
    }


    // ===========================================
    // 5. Lightbox Gallery Interaktif
    // ===========================================
    function setupLightboxGallery() {
        const galleryTriggers = document.querySelectorAll('.gallery-trigger');
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-image');
        const modalCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!modal) return; 

        galleryTriggers.forEach(item => {
            item.addEventListener('click', () => {
                modal.style.display = "block";
                modalImg.src = item.getAttribute('data-src'); 
                modalCaption.textContent = item.alt; 
                document.body.style.overflow = 'hidden'; 
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
                document.body.style.overflow = 'auto'; 
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        });
    }

    setupLightboxGallery();
    
    // ===========================================
    // 6. Interactive Card 3D Tilt Effect 
    // ===========================================
    function setupCardTiltEffect() {
        // Tambahkan .member-photo-card di sini untuk tilt effect pada foto siswa
        const tiltableElements = document.querySelectorAll('.gallery__item, .member-card, .member-photo-card'); 
        
        tiltableElements.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                const maxRotation = 5; 
                const rotateX = ((centerY - mouseY) / rect.height) * maxRotation; 
                const rotateY = ((mouseX - centerX) / rect.width) * maxRotation;   
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    setupCardTiltEffect();


    // ===========================================
    // 7. Filter Anggota Kelas (FINAL FIX)
    // ===========================================
    function setupMemberFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        // Selektor yang benar: tangkap semua jenis kartu
        const memberCards = document.querySelectorAll('.member-card, .member-photo-card'); 
        
        if (filterButtons.length === 0 || memberCards.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                filterButtons.forEach(btn => btn.classList.remove('active-filter'));
                this.classList.add('active-filter');

                const filterValue = this.getAttribute('data-filter'); // Ambil nilai dari tombol
                
                memberCards.forEach(card => {
                    const cardGender = card.getAttribute('data-gender'); // Ambil gender dari kartu
                    const cardRole = card.getAttribute('data-role');     // Ambil role dari kartu
                    
                    let shouldShow = false;

                    if (filterValue === 'all') {
                        shouldShow = true;
                    } 
                    
                    // Filter Inti & Wali (data-filter="inti")
                    else if (filterValue === 'inti') {
                        // Tampilkan kartu yang memiliki role 'core' ATAU 'teacher'
                        if (cardRole === 'core' || cardRole === 'teacher') {
                            shouldShow = true;
                        }
                    } 
                    
                    // Filter Wali Kelas Saja (data-filter="wali")
                    else if (filterValue === 'wali') {
                         if (cardRole === 'teacher') {
                             shouldShow = true;
                         }
                    }
                    
                    // Filter Gender (data-filter="pria" atau "wanita")
                    else if (filterValue === 'pria' || filterValue === 'wanita') {
                        // Tampilkan semua kartu yang gender-nya cocok
                        if (cardGender === filterValue) {
                            shouldShow = true;
                        }
                    }
                    
                    // Penerapan Tampil/Sembunyi dengan Transisi Opacity
                    if (shouldShow) {
                         // Pastikan display diatur sebelum opacity untuk transisi fade-in
                        card.style.display = card.classList.contains('member-card') ? 'flex' : 'block'; // Gunakan flex/block sesuai jenis kartu
                        setTimeout(() => {
                            card.style.opacity = 1;
                        }, 10); 
                    } else {
                        // Sembunyikan dengan fade-out, lalu display:none
                        card.style.opacity = 0;
                        setTimeout(() => {
                           card.style.display = 'none';
                        }, 300); // Harus sama dengan durasi transisi CSS
                    }
                });
            });
        });
        
        // Panggil filter 'Semua' saat halaman dimuat
        const initialFilter = document.querySelector('.filter-btn[data-filter="all"]');
        if (initialFilter) {
            initialFilter.click();
        }
    }

    setupMemberFilter();
    
    // ===========================================
    // 8. Advanced Parallax for Text Elements 
    // ===========================================
    function setupTextParallax() {
        const parallaxElements = document.querySelectorAll(
            '.section__title, .section__text' 
        );
        
        if (parallaxElements.length === 0) return;

        function updateParallax() {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const viewportCenter = window.innerHeight / 2;
                    
                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        
                        const offsetFromCenter = rect.top - viewportCenter;
                        let speed = 0.15; 
                        
                        const transformY = offsetFromCenter * speed; 

                        el.style.transform = `translateY(${transformY}px)`;
                    } else {
                        el.style.transform = 'translateY(0)';
                    }
                });
            });
        }
        
        window.addEventListener('scroll', updateParallax);
        updateParallax(); 
    }

    setupTextParallax();

    // ===========================================
    // 9. Dynamic Background Changer (Slideshow Cross-Fade)
    // ===========================================
    let layer1, layer2, activeLayer, inactiveLayer;
    let currentImageIndex = 0;
    
    const images = [
        'banner1.jpg',
        'benner2.jpg',
        'benner3.jpg'
    ];

    const getGradient = () => {
        const opacity = document.body.classList.contains('dark-mode') ? 0.8 : 0.6;
        return `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity}))`;
    };

    function setupBackgroundChanger(isManualChange = false) {
        const heroSection = document.getElementById('hero');
        if (!heroSection || images.length === 0) return;

        if (!layer1) {
            layer1 = document.createElement('div');
            layer2 = document.createElement('div');
            
            layer1.classList.add('hero__background-layer');
            layer2.classList.add('hero__background-layer');
            
            heroSection.insertBefore(layer1, heroSection.querySelector('.hero__background-overlay'));
            heroSection.insertBefore(layer2, heroSection.querySelector('.hero__background-overlay'));
            
            activeLayer = layer1;
            inactiveLayer = layer2;
            
            activeLayer.style.backgroundImage = `${getGradient()}, url('${images[currentImageIndex]}')`;
            activeLayer.style.opacity = 1;
            inactiveLayer.style.opacity = 0;

            if (!isManualChange) {
                setInterval(crossFadeBackground, 5000); 
            }
        }
        
        if (isManualChange) {
            activeLayer.style.backgroundImage = `${getGradient()}, url('${images[currentImageIndex]}')`;
            const nextIndex = (currentImageIndex + 1) % images.length;
            inactiveLayer.style.backgroundImage = `${getGradient()}, url('${images[nextIndex]}')`;
        }
    }

    function crossFadeBackground() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const nextImageUrl = images[currentImageIndex];

        inactiveLayer.style.backgroundImage = `${getGradient()}, url('${nextImageUrl}')`;
        
        activeLayer.style.opacity = 0; 
        inactiveLayer.style.opacity = 1; 

        [activeLayer, inactiveLayer] = [inactiveLayer, activeLayer];
    }
    
    setupBackgroundChanger();


    // ===========================================
    // 10. Dynamic Particle Effect Setup 
    // ===========================================
    function setupParticleEffect() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const particleCount = 20; 
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const size = Math.random() * 2 + 2; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            const duration = Math.random() * 20 + 20; 
            particle.style.animationDuration = `${duration}s`;
            
            const delay = Math.random() * 10;
            particle.style.animationDelay = `${delay}s`;

            heroSection.appendChild(particle);
        }
    }
    
    setupParticleEffect();


    // ===========================================
    // 11. Highlight Navigasi Aktif saat Scroll
    // ===========================================
    const sections = document.querySelectorAll('section');
    const headerHeight = 70; 

    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - headerHeight - 30) { 
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.href.includes(current)) {
                link.classList.add('active-link');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); 
});


// ===========================================
// 12. Smooth Scroll JQuery 
// ===========================================
$(document).ready(function(){
    $('a[href*="#"]').on('click', function(e) {
        
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70 
                }, 1000); 
                return false;
            }
        }
    });
});


