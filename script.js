document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Şifre Paneli & Müzik Mantığı ---
    const gateOverlay = document.getElementById('password-gate');
    const dateInput = document.getElementById('date-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const errorMsg = document.getElementById('error-msg');

    // Müzik Elemanları
    const bgMusic = document.getElementById('bg-music');
    const musicFab = document.getElementById('music-fab');
    const musicIcon = document.getElementById('music-icon');

    // Şifre: 04.07.2025 (Kabul edilen varyasyonlar)
    const acceptedVariations = [
        "04.07.2025",
        "4.7.2025",
        "04/07/2025",
        "4/7/2025",
        "04-07-2025"
    ];

    function checkDate() {
        const inputVal = dateInput.value.trim();

        if (acceptedVariations.includes(inputVal)) {
            // Şifre Doğru -> Kilidi Aç ve Müziği Başlat
            gateOverlay.classList.add('hidden');
            document.body.classList.add('unlocked');

            // Müzik Başlat (Kullanıcı etkileşimi olduğu için tarayıcı izin verecektir)
            if (bgMusic) {
                bgMusic.volume = 0.5; // Ses seviyesi %50
                bgMusic.play().then(() => {
                    musicFab.style.display = 'flex';
                    musicFab.classList.add('music-playing');
                }).catch(e => console.log("Müzik oynatma hatası:", e));
            }

            // Overlay animasyonu bitince DOM'dan gizle
            setTimeout(() => {
                gateOverlay.style.display = 'none';
            }, 1000);
        } else {
            // Şifre Yanlış -> Titreşim efekti
            errorMsg.textContent = "Maalesef yanlış tarih sevgilim...";
            dateInput.classList.add('shake');
            setTimeout(() => {
                dateInput.classList.remove('shake');
            }, 500);
        }
    }

    // Buton Tıklama
    if (unlockBtn) unlockBtn.addEventListener('click', checkDate);

    // Enter Tuşu Desteği
    if (dateInput) {
        dateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkDate();
        });
    }

    // Müzik Kontrol Butonu (Aç/Kapat)
    if (musicFab) {
        musicFab.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicFab.classList.add('music-playing');
                musicIcon.textContent = '🎵';
            } else {
                bgMusic.pause();
                musicFab.classList.remove('music-playing');
                musicIcon.textContent = '🔇';
            }
        });
    }

    // --- 1. Kaydırma Animasyonları (Intersection Observer) ---
    // Bu bölüm sayfadaki bölümlerin biz aşağı indikçe belirmesini sağlar.
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Ekranın %15'i göründüğünde başlasın
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Tüm bölümleri ve mektubu gözlem altına alıyoruz
    const animatedSections = document.querySelectorAll('.chapter, .finale');
    animatedSections.forEach(section => {
        observer.observe(section);
    });

});
