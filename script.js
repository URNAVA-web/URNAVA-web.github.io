// URNAVA 웹사이트 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 드롭다운 네비게이션 기능 (hover 전용)
    function initDropdown() {
        const navItems = document.querySelectorAll('.nav-item');
        
        // 드롭다운 외부 클릭 시 닫기 (데스크탑 전용) - 한 번만 등록
        document.addEventListener('click', function(e) {
            if (window.innerWidth > 768) {
                navItems.forEach(navItem => {
                    if (!navItem.contains(e.target)) {
                        navItem.classList.remove('active');
                    }
                });
            }
        });
        
        // 화면 크기 변경 시 상태 초기화 - 한 번만 등록
        window.addEventListener('resize', function() {
            navItems.forEach(navItem => {
                navItem.classList.remove('mobile-open', 'active');
            });
        });
    }
    
    // 드롭다운 초기화
    initDropdown();
    
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
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScrollTop = 0;
        
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
    }
    
    // 이스터에그 별 클릭 이벤트
    const stars = document.querySelectorAll('.star');
    let clickedStars = new Set();
    
    stars.forEach(star => {
        star.addEventListener('click', function(e) {
            e.preventDefault();
            const starId = this.id;
            
            if (!clickedStars.has(starId)) {
                clickedStars.add(starId);
                this.style.opacity = '1';
                this.style.transform = 'scale(1.5)';
                this.style.transition = 'all 0.3s ease';
                
                // 세 별을 모두 클릭했을 때 이스터에그 발동 (순서 무관)
                if (clickedStars.size === 3) {
                    showEasterEggMessage();
                }
            }
        });
        
        // 별에 커서 포인터 스타일 추가
        star.style.cursor = 'pointer';
    });
    
    function showEasterEggMessage() {
        const message = document.createElement('div');
        message.className = 'easter-egg-message';
        message.textContent = 'Im Kampf um Gott';
        
        document.body.appendChild(message);
        
        // 즉시 페이드인
        requestAnimationFrame(() => {
            message.classList.add('show');
        });
        
        // 5초 후 페이드아웃 및 제거
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
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
