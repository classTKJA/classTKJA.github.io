// Menggunakan sintaks DOMContentLoaded untuk memastikan semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // ===========================================
    // 1. Logika Toggle Menu & Form Feedback 
    // ===========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav__link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

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


    // ===========================================
    // 2. Toggle Dark Mode 
    // ===========================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '🌙'; 
    } else {
        darkModeToggle.textContent = '☀️'; 
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '☀️';
        }
    });

    // ===========================================
    // 3. Greeting Message Dinamis 
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

    heroTitle.textContent = greeting;

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
        if (charIndex > 0) {
            typedTextElement.textContent = textToType[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, typingSpeed / 2);
        } else {
            textIndex++;
            setTimeout(startTypingEffect, typingSpeed);
        }
    }
    
    setTimeout(startTypingEffect, 700);


    // ===========================================
    // 5. Lightbox Gallery Interaktif
    // ===========================================
    function setupLightboxGallery() {
        const galleryTriggers = document.querySelectorAll('.gallery-trigger');
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-image');
        const modalCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');

        galleryTriggers.forEach(item => {
            item.addEventListener('click', () => {
                modal.style.display = "block";
                modalImg.src = item.getAttribute('data-src'); 
                modalCaption.textContent = item.alt; 
                document.body.style.overflow = 'hidden'; 
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; 
        });

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
        const tiltableElements = document.querySelectorAll('.gallery__item, .member-photo-card, .member-card');
        
        tiltableElements.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                const maxRotation = 15;
                const rotateX = ((centerY - mouseY) / rect.height) * maxRotation; 
                const rotateY = ((mouseX - centerX) / rect.width) * maxRotation;   
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    setupCardTiltEffect();


    // ===========================================
    // 7. Filter Anggota Kelas (Smooth Fade)
    // ===========================================
    function setupMemberFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const memberCards = document.querySelectorAll('.member-photo-card, .member-card--core, .member-card--teacher');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                filterButtons.forEach(btn => btn.classList.remove('active-filter'));
                button.classList.add('active-filter');

                const filterValue = button.getAttribute('data-filter');
                
                // Tahap 1: Sembunyikan semua kartu dengan transisi
                memberCards.forEach(card => {
                    card.classList.add('hidden');
                });
                
                // Tambahkan jeda waktu untuk memungkinkan transisi menyembunyikan selesai
                setTimeout(() => {
                    
                    // Tahap 2: Tampilkan kartu yang sesuai
                    memberCards.forEach(card => {
                        const cardRole = card.getAttribute('data-role');
                        const cardGender = card.getAttribute('data-gender');
                        
                        let shouldShow = false;

                        // Logic Filtering
                        if (filterValue === 'all') {
                            shouldShow = true;
                        } else if (cardRole && cardRole === filterValue) {
                            shouldShow = true;
                        } else if (cardGender && (filterValue === 'pria' || filterValue === 'wanita') && cardGender === filterValue) {
                            shouldShow = true;
                        }
                        
                        // Tampilkan kartu
                        if (shouldShow) {
                            card.classList.remove('hidden');
                        }
                    });
                    
                }, 300); // Jeda 300ms untuk efek fade-out yang lembut

            });
        });
        
        // Panggil filter 'all' saat pertama kali dimuat
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
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 2;
                
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    
                    const offsetFromCenter = rect.top - viewportCenter;
                    
                    let speed = 0.15; 
                    
                    // MODIFIKASI: Menghilangkan perkalian -1 agar teks bergerak ke bawah saat scroll ke bawah.
                    const transformY = offsetFromCenter * speed; 

                    el.style.transform = `translateY(${transformY}px)`;
                } else {
                    el.style.transform = 'translateY(0)';
                }
            });
        }
        
        window.addEventListener('scroll', updateParallax);
        updateParallax(); 
    }

    setupTextParallax();

    // ===========================================
    // 9. Dynamic Background Changer (Slideshow Cross-Fade)
    // ===========================================
    function setupBackgroundChanger() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        // GANTI URL DI BAWAH DENGAN URL GAMBAR KELAS ANDA!
        const images = [
            'banner1.jpg',
            'benner2.jpg',
            'benner3.jpg'
        ];
        
        if (images.length === 0) return;

        // 1. Buat Dua Lapisan Latar Belakang secara Dinamis
        const layer1 = document.createElement('div');
        const layer2 = document.createElement('div');
        
        layer1.classList.add('hero__background-layer');
        layer2.classList.add('hero__background-layer');
        
        // Tambahkan sebelum konten utama
        heroSection.insertBefore(layer1, heroSection.firstChild);
        heroSection.insertBefore(layer2, heroSection.firstChild);

        // 2. Inisialisasi State
        let currentImageIndex = 0;
        let activeLayer = layer1;
        let inactiveLayer = layer2;
        
        // Fungsi untuk mendapatkan gradien overlay (untuk Dark Mode)
        const getGradient = () => {
            const opacity = document.body.classList.contains('dark-mode') ? 0.8 : 0.6;
            return `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity}))`;
        };

        // Set gambar awal pada layer pertama dan pastikan layer tersebut terlihat
        layer1.style.backgroundImage = `${getGradient()}, url('${images[currentImageIndex]}')`;
        layer1.style.opacity = 1;
        layer2.style.opacity = 0;
        
        // 3. Fungsi Utama Slideshow Cross-fade
        function crossFadeBackground() {
            // Pindahkan ke gambar berikutnya
            currentImageIndex = (currentImageIndex + 1) % images.length;
            const nextImageUrl = images[currentImageIndex];

            // Setup layer yang akan datang (saat ini inactiveLayer)
            inactiveLayer.style.backgroundImage = `${getGradient()}, url('${nextImageUrl}')`;
            
            // Lakukan Transisi (Cross-fade)
            // Ini akan memicu transisi opacity 2s di CSS
            activeLayer.style.opacity = 0; 
            inactiveLayer.style.opacity = 1; 

            // Ganti peran layer untuk siklus berikutnya
            [activeLayer, inactiveLayer] = [inactiveLayer, activeLayer];
        }

        // Jalankan perubahan setiap 5 detik (5000ms)
        setInterval(crossFadeBackground, 5000); 
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
    const headerHeight = 70; // Sesuaikan dengan tinggi header

    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - headerHeight - 30) { 
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
                    scrollTop: target.offset().top - 70 // Offset untuk header fixed
                }, 1000); 
                return false;
            }
        }
    });
});