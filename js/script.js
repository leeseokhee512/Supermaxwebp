// SUPER MAX - 자동 수익 가이드 플랫폼 (화이트 모드 고정)

document.addEventListener('DOMContentLoaded', function() {
    
    // DOM 요소 선택
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const header = document.querySelector('.header');
    const searchButton = document.querySelector('.btn-search');
    
    // 모바일 햄버거 메뉴
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // 스무스 스크롤 네비게이션
    initializeSmoothScroll();
    
    // 스크롤 이벤트
    window.addEventListener('scroll', handleScroll);
    
    // 스크롤 애니메이션
    initializeScrollAnimations();
    
    // 인터랙션 이벤트
    initializeInteractions();
    
    // 검색 기능
    if (searchButton) {
        searchButton.addEventListener('click', openSearch);
    }
    
    // 키보드 이벤트
    document.addEventListener('keydown', handleKeyboardEvents);
    
    // 리사이즈 이벤트
    window.addEventListener('resize', handleResize);
    
    // 페이지 로드 완료
    window.addEventListener('load', handlePageLoad);
    
    // 애니메이션 초기화
    setTimeout(() => {
        initializeAnimations();
    }, 100);
    
    // 함수 정의들
    
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navActions.classList.toggle('mobile-active');
        document.body.classList.toggle('menu-open');
    }
    
    function initializeSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                if (targetId === 'notice' || targetId === 'program-guide' || targetId === 'adsense-guide') {
                    showNotification(`${this.textContent} 페이지로 이동합니다`, 'info');
                    return;
                }
                
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 모바일에서 메뉴 닫기
                    if (window.innerWidth <= 768) {
                        closeMobileMenu();
                    }
                    
                    // 네비게이션 활성 상태 업데이트
                    updateActiveNavLink(this);
                }
            });
        });
    }
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // 헤더 스타일 변경
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 현재 섹션 하이라이트
        updateActiveSection();
    }
    
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        const headerHeight = header.offsetHeight;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    function updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navActions.classList.remove('mobile-active');
        document.body.classList.remove('menu-open');
    }
    
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        // 애니메이션 대상 요소들
        const animateElements = document.querySelectorAll(
            '.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up, .bounce-in'
        );
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    function initializeAnimations() {
        // 페이지 로드 시 애니메이션 순차 실행
        const animatedElements = document.querySelectorAll('[data-delay]');
        
        animatedElements.forEach(element => {
            const delay = parseInt(element.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                element.classList.add('animate');
            }, delay);
        });
    }
    
    function initializeInteractions() {
        // 기능 하이라이트 아이템 클릭
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('click', function() {
                const itemText = this.querySelector('h4').textContent;
                if (itemText.includes('설정')) {
                    showNotification('SUPER MAX 프로그램 설정 가이드를 확인합니다', 'info');
                } else if (itemText.includes('최적화')) {
                    showNotification('애드센스 수익 최적화 도구를 엽니다', 'info');
                } else if (itemText.includes('교육')) {
                    showNotification('전문 교육 자료를 확인합니다', 'info');
                } else if (itemText.includes('도구')) {
                    showNotification('도구 & 템플릿 라이브러리를 확인합니다', 'info');
                }
            });
        });
        
        // 공지 카드 클릭
        const noticeCards = document.querySelectorAll('.notice-card');
        noticeCards.forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                if (title.includes('v2.0')) {
                    showNotification('SUPER MAX v2.0 업데이트 상세 내용을 확인합니다', 'success');
                } else if (title.includes('정책')) {
                    showNotification('애드센스 정책 변경사항을 확인합니다', 'info');
                } else if (title.includes('가이드')) {
                    showNotification('새로운 가이드 문서를 확인합니다', 'info');
                }
            });
        });
        
        // 공지 링크 클릭
        const noticeLinks = document.querySelectorAll('.notice-link');
        noticeLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const title = this.closest('.notice-card').querySelector('h3').textContent;
                showNotification(`"${title}" 상세 페이지로 이동합니다`, 'info');
            });
        });
        
        // 사이트 길라잡이 단계 클릭
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach(item => {
            item.addEventListener('click', function() {
                const stepTitle = this.querySelector('h3').textContent;
                if (stepTitle.includes('접속 완료')) {
                    showNotification('플랫폼 접속이 완료되었습니다', 'success');
                } else if (stepTitle.includes('프로그램')) {
                    showNotification('프로그램 가이드 페이지로 이동합니다', 'info');
                } else if (stepTitle.includes('애드센스')) {
                    showNotification('애드센스 가이드 페이지로 이동합니다', 'info');
                } else if (stepTitle.includes('실전')) {
                    showNotification('실전 운영 가이드를 확인합니다', 'info');
                }
            });
        });
        
        // 사이트 길라잡이 링크 클릭
        const stepLinks = document.querySelectorAll('.step-link');
        stepLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const linkText = this.textContent.trim();
                if (linkText.includes('확인 완료')) {
                    showNotification('접속이 성공적으로 완료되었습니다', 'success');
                } else if (linkText.includes('가이드 보기')) {
                    showNotification('프로그램 가이드 페이지로 이동합니다', 'info');
                } else if (linkText.includes('학습하기')) {
                    showNotification('애드센스 가이드 페이지로 이동합니다', 'info');
                } else if (linkText.includes('운영하기')) {
                    showNotification('실전 운영 가이드를 확인합니다', 'info');
                }
            });
        });
        
        // 대형 문의 카드 클릭
        const contactCardLarge = document.querySelector('.contact-card-large');
        if (contactCardLarge) {
            contactCardLarge.addEventListener('click', function() {
                showNotification('실시간 1대1 채팅 상담을 시작합니다', 'success');
            });
        }
        
        // 대형 문의 버튼 클릭
        const contactBtnLarge = document.querySelector('.contact-btn-large');
        if (contactBtnLarge) {
            contactBtnLarge.addEventListener('click', function(e) {
                e.stopPropagation();
                showNotification('실시간 채팅 상담창이 열립니다', 'success');
            });
        }
        
        // 공지 더보기 버튼
        const noticeMoreBtn = document.querySelector('.notice-more .btn-outline');
        if (noticeMoreBtn) {
            noticeMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('전체 공지사항 페이지로 이동합니다', 'info');
            });
        }
        
        // 버튼 이벤트들
        initializeButtonEvents();
    }
    
    function initializeButtonEvents() {
        // 메인 액션 버튼들
        const primaryButtons = document.querySelectorAll('.btn-primary-large');
        primaryButtons.forEach(button => {
            button.addEventListener('click', function() {
                showNotification('해당 기능을 실행합니다', 'success');
            });
        });
        
        // 보조 버튼들
        const outlineButtons = document.querySelectorAll('.btn-outline:not(.notice-more .btn-outline)');
        outlineButtons.forEach(button => {
            button.addEventListener('click', function() {
                showNotification('해당 페이지로 이동합니다', 'info');
            });
        });
    }
    
    function openSearch() {
        showNotification('SUPER MAX 통합 검색 기능을 준비 중입니다', 'info');
    }
    
    function showNotification(message, type = 'info') {
        // 기존 알림 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        // 아이콘 선택
        let icon = 'fas fa-info-circle';
        if (type === 'success') icon = 'fas fa-check-circle';
        if (type === 'error') icon = 'fas fa-exclamation-circle';
        if (type === 'warning') icon = 'fas fa-exclamation-triangle';
        
        notification.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // 스타일 적용
        const styles = getNotificationStyles(type);
        Object.assign(notification.style, styles);
        
        document.body.appendChild(notification);
        
        // 닫기 버튼 이벤트
        const closeButton = notification.querySelector('.notification__close');
        closeButton.addEventListener('click', () => hideNotification(notification));
        
        // 애니메이션으로 표시
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });
        
        // 자동 제거
        setTimeout(() => hideNotification(notification), 3500);
    }
    
    function getNotificationStyles(type) {
        const baseStyles = {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            zIndex: '10000',
            fontSize: '14px',
            fontWeight: '500',
            transform: 'translateX(100%)',
            opacity: '0',
            transition: 'all 0.3s ease',
            maxWidth: '350px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'white',
            fontFamily: "'Inter', sans-serif"
        };
        
        const typeStyles = {
            info: { background: 'linear-gradient(135deg, #000000, #404040)' },
            success: { background: 'linear-gradient(135deg, #000000, #262626)' },
            error: { background: 'linear-gradient(135deg, #dc2626, #991b1b)' },
            warning: { background: 'linear-gradient(135deg, #f59e0b, #d97706)' }
        };
        
        return { ...baseStyles, ...typeStyles[type] };
    }
    
    function hideNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }
    
    function handleKeyboardEvents(e) {
        // ESC 키로 모바일 메뉴 닫기
        if (e.key === 'Escape') {
            closeMobileMenu();
            
            // 알림 닫기
            const notification = document.querySelector('.notification');
            if (notification) {
                hideNotification(notification);
            }
        }
        
        // 검색 단축키 (Ctrl/Cmd + K)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    }
    
    function handleResize() {
        // 데스크톱으로 전환 시 모바일 메뉴 닫기
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }
    
    function handlePageLoad() {
        // 이미지 로드 완료 처리
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                img.addEventListener('error', function() {
                    this.style.display = 'none';
                });
            }
        });
        
        // 초기 스크롤 위치 확인
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
        
        // 로딩 완료 알림
        console.log('🚀 SUPER MAX 플랫폼이 로드되었습니다!');
        console.log('💰 자동 수익 가이드와 애드센스 최적화 자료를 확인하세요.');
        console.log('🎨 화이트 모드로 고정되었습니다.');
    }
    
    // 포커스 관리 (접근성)
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #000000';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // 성능 최적화: 스크롤 이벤트 throttle
    let scrollTimer = null;
    const originalScrollHandler = handleScroll;
    
    function throttledScrollHandler() {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            originalScrollHandler();
            scrollTimer = null;
        }, 16);
    }
    
    // 원래 스크롤 핸들러를 throttled 버전으로 교체
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Easter Egg: SUPER MAX 로고 클릭
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                showNotification('🎉 SUPER MAX 개발자 모드가 활성화되었습니다!', 'success');
                clickCount = 0;
            }
        });
    }
});

// 추가 CSS 스타일을 동적으로 적용 (화이트 모드 고정)
const additionalStyles = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
    
    .notification__close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
        border-radius: 4px;
    }
    
    .notification__close:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    .nav-logo {
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .nav-logo:hover {
        transform: scale(1.05);
    }
    
    /* 환영 메시지 위치 조정 */
    .welcome-section {
        padding-top: 100px;
        padding-bottom: 30px;
    }
    
    .welcome-content {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
    }
    
    .welcome-content h2 {
        margin-bottom: 10px;
        font-size: 1.8rem;
        font-weight: 600;
    }
    
    .welcome-content p {
        color: #666;
        font-size: 1rem;
    }
    
    /* 반응형 조정 */
    @media (max-width: 768px) {
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-menu.active,
        .nav-actions.mobile-active {
            display: flex;
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: #ffffff;
            flex-direction: column;
            padding: 1.5rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            z-index: 999;
            border-top: 1px solid #e5e5e5;
        }
        
        .nav-menu.active {
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e5e5;
        }
        
        .nav-actions.mobile-active {
            padding-top: 1rem;
            gap: 0.75rem;
        }
        
        .nav-actions.mobile-active button {
            width: 100%;
            justify-content: center;
        }
        
        .welcome-section {
            padding-top: 80px;
            padding-bottom: 20px;
        }
        
        .welcome-content h2 {
            font-size: 1.5rem;
        }
        
        .welcome-content p {
            font-size: 0.9rem;
        }
    }
    
    .fade-in-up,
    .slide-in-left,
    .slide-in-right,
    .slide-in-up,
    .bounce-in {
        will-change: transform, opacity;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .fade-in-up,
        .slide-in-left,
        .slide-in-right,
        .slide-in-up,
        .bounce-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
        
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// 스타일 요소 생성 및 추가
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement); 