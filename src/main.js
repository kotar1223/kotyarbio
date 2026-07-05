import './style.css';
const lang = navigator.language.startsWith('ru') ? 'ru' : 'en';
const socials = [
    {
        name: 'Telegram (New)',
        nameRu: 'Телеграм (Новый)',
        desc: 'New channel',
        descRu: 'Новый канал',
        icon: 'fab fa-telegram',
        colorClass: 'tg',
        btnClass: 'btn-tg',
        url: 'https://t.me/kotikitg1223',
    },
    {
        name: 'Telegram (Old)',
        nameRu: 'Телеграм (Старый)',
        desc: 'Old channel',
        descRu: 'Старый канал',
        icon: 'fab fa-telegram',
        colorClass: 'tg',
        btnClass: 'btn-tg',
        url: 'https://t.me/kotyatgk1223',
    },
    {
        name: 'YouTube',
        nameRu: 'Ютуб',
        desc: 'Watch my videos',
        descRu: 'Смотри мои видео',
        icon: 'fab fa-youtube',
        colorClass: 'yt',
        btnClass: 'btn-yt',
        url: 'https://www.youtube.com/@kotar1223',
    },
    {
        name: 'TikTok',
        nameRu: 'Тикток',
        desc: 'Watch my videos',
        descRu: 'Смотри мои видео',
        icon: 'fab fa-tiktok',
        colorClass: 'tt',
        btnClass: 'btn-tt',
        url: 'https://www.tiktok.com/@kotyar12233',
    },
    {
        name: 'Discord',
        nameRu: 'Дискорд',
        desc: 'Join the server',
        descRu: 'Заходи на сервер',
        icon: 'fab fa-discord',
        colorClass: 'dc',
        btnClass: 'btn-dc',
        url: 'https://discord.gg/yfcENEXQM7',
    },
    {
        name: 'Steam',
        nameRu: 'Стим',
        desc: 'My gaming profile',
        descRu: 'Мой игровой профиль',
        icon: 'fab fa-steam',
        colorClass: 'st',
        btnClass: 'btn-st',
        url: 'https://steamcommunity.com/id/kotyarasteam1223/',
    },
    {
        name: 'GitHub',
        nameRu: 'Гитхаб',
        desc: 'Open source projects',
        descRu: 'Опенсорс проекты',
        icon: 'fab fa-github',
        colorClass: 'gh',
        btnClass: 'btn-gh',
        url: 'https://github.com/kotar1223',
    },
];
function t(ru, en) {
    return lang === 'ru' ? ru : en;
}
function render() {
    const app = document.getElementById('app');
    const title = 'KOTЯR';
    const titleLetters = title.split('').map(ch => `<span class="letter">${ch}</span>`).join('');
    const socialsHTML = socials
        .map((s, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        const name = lang === 'ru' ? s.nameRu : s.name;
        const desc = lang === 'ru' ? s.descRu : s.desc;
        return `
      <section class="social-section ${s.colorClass} ${side}">
        <div class="social-content">
          <div class="social-icon"><i class="${s.icon}"></i></div>
          <div class="social-name">${name}</div>
          <div class="social-desc">${desc}</div>
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn ${s.btnClass}">
            ${t('Открыть', 'Open')}
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </section>`;
    })
        .join('');
    app.innerHTML = `
    <section class="hero" id="hero">
      <h1 class="hero-title"><span class="title-letters">${titleLetters}</span></h1>
      <p class="hero-subtitle">${t('Привет, я kotyar, мои ссылки ниже', "Hi, I'm kotyar, my links are below")}</p>
      <div class="scroll-indicator" id="scrollIndicator">
        <div class="scroll-mouse"></div>
        <div class="scroll-text">${t('Листай вниз', 'Scroll down')}</div>
      </div>
    </section>
    ${socialsHTML}
    <div class="footer"><p>nothing</p></div>
  `;
    // Load Font Awesome
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(faLink);
    initAnimations();
}
let currentSection = 0;
let isScrolling = false;
function initAnimations() {
    const sections = document.querySelectorAll('.social-section');
    const allSections = document.querySelectorAll('.hero, .social-section, .footer');
    const scrollIndicator = document.getElementById('scrollIndicator');
    // IntersectionObserver for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
            else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.3 });
    sections.forEach((section) => observer.observe(section));
    // Track current section based on scroll position
    function updateCurrentSection() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        currentSection = Math.round(scrollY / vh);
        currentSection = Math.max(0, Math.min(currentSection, allSections.length - 1));
        if (scrollIndicator) {
            scrollIndicator.style.opacity = currentSection === 0 ? '1' : '0';
        }
    }
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateCurrentSection);
    }, { passive: true });
    // Snap scroll with wheel
    window.addEventListener('wheel', (event) => {
        if (isScrolling)
            return;
        if (event.deltaY > 30) {
            currentSection = Math.min(currentSection + 1, allSections.length - 1);
        }
        else if (event.deltaY < -30) {
            currentSection = Math.max(currentSection - 1, 0);
        }
        else {
            return;
        }
        isScrolling = true;
        allSections[currentSection].scrollIntoView({ behavior: 'smooth' });
        if (scrollIndicator) {
            scrollIndicator.style.opacity = currentSection === 0 ? '1' : '0';
        }
        setTimeout(() => {
            isScrolling = false;
        }, 900);
    });
    // Touch support for mobile
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', (e) => {
        if (isScrolling)
            return;
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        if (Math.abs(diff) > 60) {
            if (diff > 0) {
                currentSection = Math.min(currentSection + 1, allSections.length - 1);
            }
            else {
                currentSection = Math.max(currentSection - 1, 0);
            }
            isScrolling = true;
            allSections[currentSection].scrollIntoView({ behavior: 'smooth' });
            if (scrollIndicator) {
                scrollIndicator.style.opacity = currentSection === 0 ? '1' : '0';
            }
            setTimeout(() => {
                isScrolling = false;
            }, 900);
        }
    }, { passive: true });
    // Keyboard support
    window.addEventListener('keydown', (e) => {
        if (isScrolling)
            return;
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            currentSection = Math.min(currentSection + 1, allSections.length - 1);
            isScrolling = true;
            allSections[currentSection].scrollIntoView({ behavior: 'smooth' });
            if (scrollIndicator)
                scrollIndicator.style.opacity = currentSection === 0 ? '1' : '0';
            setTimeout(() => { isScrolling = false; }, 900);
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentSection = Math.max(currentSection - 1, 0);
            isScrolling = true;
            allSections[currentSection].scrollIntoView({ behavior: 'smooth' });
            if (scrollIndicator)
                scrollIndicator.style.opacity = currentSection === 0 ? '1' : '0';
            setTimeout(() => { isScrolling = false; }, 900);
        }
    });
}
render();
