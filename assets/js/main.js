// Função para abrir/fechar o menu mobile
function toggleMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active'); // Adiciona ou remove a classe 'active'
}

// Fechar o menu ao clicar fora dele (opcional, mas bom para UX)
document.addEventListener('click', (event) => {
    const nav = document.querySelector('.nav');
    const icon = document.querySelector('.mobile-menu-icon');
    
    // Se o clique não foi no menu nem no ícone, e o menu está aberto -> fecha
    if (!nav.contains(event.target) && !icon.contains(event.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

// Scroll Suave para links internos (compatibilidade extra)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});