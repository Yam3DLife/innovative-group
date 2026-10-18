// ===== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ОБЩАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ (для карточек, фич, value) =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.preview-card, .feature, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== КОМПАНИИ: ВЫЕЗД СПРАВА В ЦЕНТР =====
const companiesGrid = document.querySelector('.companies-grid');

if (companiesGrid) {
    const companies = companiesGrid.querySelectorAll('.company-item');

    // Стартовое состояние — справа за экраном
    companies.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(120vw)';
        item.style.transition = 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    const companyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.company-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 120);
                });
                companyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    companyObserver.observe(companiesGrid);
}