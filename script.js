// URNAVA 웹사이트 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 언어 전환 기능
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('urnava-lang') || 'en';
    
    // 초기 언어 설정
    setActiveLanguage(currentLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setActiveLanguage(selectedLang);
            localStorage.setItem('urnava-lang', selectedLang);
            
            // 실제 언어 콘텐츠 변경 (향후 구현)
            // changeLanguageContent(selectedLang);
        });
    });
    
    function setActiveLanguage(lang) {
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }
    
    // 부드러운 스크롤 (CTA 버튼들)
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 외부 링크가 아닌 내부 앵커인 경우 부드러운 스크롤
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 네비게이션 스크롤 효과
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // 스크롤 방향에 따른 네비게이션 표시/숨김
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 아래로 스크롤
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 위로 스크롤
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 이스터에그 별 클릭 이벤트
    const stars = document.querySelectorAll('.star');
    let clickedStars = [];
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const starId = this.id;
            
            if (!clickedStars.includes(starId)) {
                clickedStars.push(starId);
                this.style.opacity = '1';
                this.style.transform = 'scale(1.5)';
                
                // 특별한 시퀀스로 클릭했을 때의 이스터에그
                if (clickedStars.length === 3) {
                    const sequence = clickedStars.join('-');
                    if (sequence === 'star-418-star-1207-star-211') {
                        showEasterEggMessage();
                    }
                }
            }
        });
    });
    
    function showEasterEggMessage() {
        const message = document.createElement('div');
        message.innerHTML = 'Im Kampf um Gott';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #2C2C2C;
            padding: 2rem;
            border-radius: 12px;
            font-family: 'Libre Baskerville', serif;
            font-size: 0.95rem;
            font-weight: 300;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            border: 1px solid #E8E2DB;
            opacity: 0;
            max-width: 400px;
            line-height: 1.4;
            transition: opacity 0.5s ease-out;
            letter-spacing: 0.5px;
            white-space: nowrap;
        `;
        
        // 모바일에서 폰트 크기 조정
        if (window.innerWidth <= 320) {
            message.style.fontSize = '0.7rem';
            message.style.padding = '1.2rem';
            message.style.letterSpacing = '0.2px';
            message.style.maxWidth = '280px';
        } else if (window.innerWidth <= 480) {
            message.style.fontSize = '0.75rem';
            message.style.padding = '1.4rem';
            message.style.letterSpacing = '0.25px';
            message.style.maxWidth = '320px';
        } else if (window.innerWidth <= 768) {
            message.style.fontSize = '0.85rem';
            message.style.padding = '1.6rem';
            message.style.letterSpacing = '0.35px';
            message.style.maxWidth = '360px';
        }
        
        document.body.appendChild(message);
        
        // 즉시 중앙에 배치하고 페이드인
        requestAnimationFrame(() => {
            message.style.opacity = '1';
        });
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 500);
        }, 5000);
    }
    
    // 섹션 진입 시 애니메이션 효과
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 관찰할 요소들
    const animatedElements = document.querySelectorAll('.question-item, .value-item, .cta-btn');
    animatedElements.forEach(element => {
        sectionObserver.observe(element);
    });
    
    // 로딩 완료 후 초기 애니메이션
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// 추가 CSS 애니메이션 클래스 (동적으로 추가)
const additionalStyles = `
    <style>
        .animate-in {
            animation: slideInUp 0.6s ease-out;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        body.loaded .hero-title,
        body.loaded .hero-subtitle {
            animation-play-state: running;
        }
        
        .navbar {
            transition: transform 0.3s ease;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles); 