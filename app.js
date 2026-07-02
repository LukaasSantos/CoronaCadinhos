/**
 * Roteamento e Interatividades SPA para o site Corona Cadinhos
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // --- Sistema de Roteamento SPA por Hash ---
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function navigateToSection() {
        const hash = window.location.hash || '#home';
        
        // Ativar/Desativar seções
        sections.forEach(section => {
            if (`#${section.id}` === hash) {
                section.classList.remove('hidden');
                section.classList.add('block');
                // Dispara atualização do AOS para recalcular posições das animações
                setTimeout(() => {
                    AOS.refresh();
                }, 50);
            } else {
                section.classList.remove('block');
                section.classList.add('hidden');
            }
        });

        // Atualizar links ativos na navegação (Desktop e Mobile)
        updateActiveLink(navLinks, hash);
        updateActiveLink(mobileNavLinks, hash);

        // Rola para o topo ao trocar de rota
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function updateActiveLink(links, activeHash) {
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === activeHash) {
                link.classList.add('nav-link-active');
            } else {
                link.classList.remove('nav-link-active');
            }
        });
    }

    // Ouvir alterações na hash
    window.addEventListener('hashchange', navigateToSection);
    // Executar rota inicial
    navigateToSection();

    // --- Menu Mobile Animado ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    function toggleMobileMenu() {
        if (!mobileMenu) return;
        
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
            document.body.classList.add('overflow-hidden');
            // Altera ícone do botão para "X"
            menuBtn.innerHTML = `
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
        } else {
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
            document.body.classList.remove('overflow-hidden');
            // Altera ícone do botão de volta para Hamburguer
            menuBtn.innerHTML = `
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu mobile ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // --- Depoimentos: Controle Simples de Slide ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let activeTestimonialIdx = 0;

    function showTestimonial(idx) {
        testimonialCards.forEach((card, i) => {
            if (i === idx) {
                card.classList.remove('hidden');
                card.classList.add('block');
            } else {
                card.classList.remove('block');
                card.classList.add('hidden');
            }
        });
    }

    if (testimonialCards.length > 0) {
        showTestimonial(activeTestimonialIdx);
        // Troca automática a cada 5 segundos
        setInterval(() => {
            activeTestimonialIdx = (activeTestimonialIdx + 1) % testimonialCards.length;
            showTestimonial(activeTestimonialIdx);
        }, 5000);
    }

    // --- Formulário de Contato ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Enviando...';

            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }, 1500);
        });
    }
});
