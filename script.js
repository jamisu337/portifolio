document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfólio carregado com sucesso!");

    // -------------------------------------------------------
    // MENU MOBILE
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link
        document.querySelectorAll('.nav-item a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // -------------------------------------------------------
    // GERAR GRID EFFECT (600 TILES para cobrir toda a tela)
    const gridEffectContainer = document.getElementById('grid-effect-container');
    if (gridEffectContainer) {
        for (let i = 0; i < 600; i++) {
            const tile = document.createElement('a');
            tile.className = 'card__grid-effect-tile';
            tile.href = '#';
            // Previne scroll quando clicado
            tile.addEventListener('click', (e) => e.preventDefault());
            gridEffectContainer.appendChild(tile);
        }
    }

    // -------------------------------------------------------
    // EFEITO NOS CARDS

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#a855f7';
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#1a2530';
        });
    });

    // -----------------------------------------------------------------------
    // SCROLL REVEAL

    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();

});

// dark mode ---------------------------------------------------------------
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se o usuário já tem uma preferência salva ao carregar
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true; // Força o switch a ficar ligado
}

// Função de mudança
themeToggle.addEventListener('change', () => {

    if (themeToggle.checked) {
        //Dark Mode
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        //Light Mode
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

});
// dark mode ---------------------------------------------------------------

//------------------------------------------- MAGNETIC / PARALLAX EFFECT ---
const bannerContainer = document.getElementById('magnetic-container');

if (bannerContainer) {
    bannerContainer.addEventListener('mousemove', (e) => {
        const shapes = bannerContainer.querySelectorAll('.shape, .center-anchor');

        // Pega as dimensões do container
        const rect = bannerContainer.getBoundingClientRect();

        // Calcula a posição do mouse relativa ao centro do container
        // (0,0 será o centro exato)
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        shapes.forEach(shape => {
            // Pega a velocidade definida no HTML
            const speed = shape.getAttribute('data-speed');

            // Calcula o deslocamento
            const xOffset = x * speed;
            const yOffset = y * speed;
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Quando o mouse sai, as formas voltam ao centro suavemente
    bannerContainer.addEventListener('mouseleave', () => {
        const shapes = bannerContainer.querySelectorAll('.shape, .center-anchor');
        shapes.forEach(shape => {
            shape.style.transform = `translate(0px, 0px)`;
        });
    });
}
