// ============================================
// PSICÓLOGA IASMIM BORGES - MAIN.JS
// ============================================

// --- 1. Menu Mobile Toggle ---
function toggleMenu() {
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.nav-overlay');
    const menuIcon = document.querySelector('.mobile-menu-icon');

    nav.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');

    // Atualiza aria-expanded para acessibilidade
    const isExpanded = nav.classList.contains('active');
    menuIcon.setAttribute('aria-expanded', isExpanded);

    // Previne scroll do body quando menu está aberto
    document.body.style.overflow = isExpanded ? 'hidden' : '';
}

// --- 2. Fechar menu ao clicar fora ---
document.addEventListener('click', (event) => {
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.nav-overlay');
    const icon = document.querySelector('.mobile-menu-icon');

    if (nav && icon) {
        if (!nav.contains(event.target) && !icon.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            icon.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
});

// --- 3. Fechar menu com tecla ESC ---
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const nav = document.querySelector('.nav');
        const overlay = document.querySelector('.nav-overlay');
        const icon = document.querySelector('.mobile-menu-icon');

        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            icon.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
});

// --- 4. Scroll Suave para links internos ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            e.preventDefault();
            
            const headerOffset = 80; // Altura do header fixo
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- 5. Highlight do menu ativo baseado no scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-list a:not(.btn)');

function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// --- 6. Animação de elementos ao entrar na viewport ---
function animateOnScroll() {
    const elementsToAnimate = document.querySelectorAll(
        '.card, .para-quem-card, .diferencial-card, .formacao-card, .mito-card, .step'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// --- 7. Ano dinâmico no footer ---
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// --- 8. Header com sombra ao rolar ---
function headerScrollEffect() {
    const header = document.querySelector('.header');
    
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    }
}

window.addEventListener('scroll', headerScrollEffect);

// --- 9. Lazy loading de imagens (fallback) ---
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser suporta lazy loading nativo
        return;
    }
    
    // Fallback para browsers antigos
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// --- 10. FAQ - Fechar outros ao abrir um ---
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Fecha outros items abertos
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
}

// --- 11. Tracking de cliques no WhatsApp (Analytics) ---
function trackWhatsAppClicks() {
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Se tiver Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'Contato via WhatsApp',
                    'value': 1
                });
            }
            
            // Se tiver Facebook Pixel
            if (typeof fbq === 'function') {
                fbq('track', 'Contact');
            }
            
            console.log('WhatsApp click tracked');
        });
    });
}

// --- 12. Prevenir spam de cliques ---
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// --- 13. Smooth reveal do WhatsApp button ---
function revealWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Esconde inicialmente
        whatsappButton.style.opacity = '0';
        whatsappButton.style.transform = 'scale(0.8) translateY(20px)';
        
        // Mostra após 2 segundos
        setTimeout(() => {
            whatsappButton.style.transition = 'all 0.5s ease';
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'scale(1) translateY(0)';
        }, 2000);
    }
}

// --- 14. Verificar se é mobile ---
function isMobile() {
    return window.innerWidth <= 768;
}

// --- 15. Ajustar altura do viewport em mobile (fix para barra de navegação) ---
function setMobileViewportHeight() {
    if (isMobile()) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}

window.addEventListener('resize', debounce(setMobileViewportHeight, 100));

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    animateOnScroll();
    lazyLoadImages();
    setupFAQ();
    trackWhatsAppClicks();
    revealWhatsAppButton();
    setMobileViewportHeight();
    highlightNavOnScroll();
    
    console.log('🧠 Site da Psicóloga Iasmim Borges carregado com sucesso!');
});

// --- Executar quando a página carregar completamente ---
window.addEventListener('load', () => {
    // Remove qualquer loading state
    document.body.classList.add('loaded');
});